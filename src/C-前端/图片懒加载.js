/**
 * 图片懒加载
 * 
 * 判断元素是否进入视口方法：
 * 1. el.offsetTop(scrollHeight) - document.documentElement.scrollTop <= viewPortHeight(clientHeight)
 * 2. el.getBoundingClientRect().top <= viewPortHeight(clientHeight)
 * 3. intersectionRatio > 0 && intersectionRatio <= 1
 * 根据元素与视口是否相交，可以进行吸顶、吸底、曝光上报、列表加载更多、图片懒加载等操作。
 * 
 * 性能问题
 * 在主线程上运行，因此频繁触发、调用会造成性能问题
 * 无论是否触发相交，滚动结束后都会进行判断
 * 获取srollTop的值和getBoundingClientRect方法都会导致回流
 * 滚动事件会绑定多个事件处理函数，阻塞UI渲染
 * 
 * IntersectionObserver Api：
 * 
 * let observer = new IntersectionObserver(callback, options);
 * options：
 *  1. root 根元素，不指定默认为视窗
 *  2. rootMargin 根元素的外边距
 *  3. threshold 目标元素与根元素相交比例达到该值触发回调
 * 
 * callback(entries, observer)
 * entries:{
 *  boundingClientRect 目标元素的区域信息，getBoundingClientRect()的返回值
 *  intersectionRatio  目标元素与根元素交叉的区域信息
 *  isIntersecting 目标元素是否进入根元素区域
 *  rootBounds 根元素的矩形区域信息
 *  target 被观察dom节点
 *  time 相交发生时距离页面打开时的毫秒数
 * }
 * 
 * 实例方法：
 * observe 开始监听一个目标元素(target)，target必须是root的后代
 * unobserve 停止监听一个目标元素
 * takeRecords 返回所有监听的目标元素集合
 * disconnect 停止所有监听
 */

/**
 * 方法一 
 * 可以给img标签统一自定义属性data-src='default.png'，
 * 当检测到图片出现在窗口之后再补充src属性，此时才会进行图片资源加载。
 */
function lazyload() {
  const imgs = document.getElementByTagName("img");
  const len = imgs.length;
  // 视口高度
  const viewHeight = document.documentElement.clientHeight;
  // 滚动条高度
  const scrollHeigh =
    document.documentElement.scrollTop || document.body.scrollTop;
  for (let i = 0; i < len; i++) {
    const offsetHeight = imgs[i].offsetTop;
    if (offsetHeight < viewHeight + scrollHeigh) {  // 和滚动加载同理 clientHeight + scrollTop >= scrollHeight
      const src = imgs[i].dataset.src;
      imgs[i].src = src;
    }
  }
}

throttle(window.addEventListener("scroll", lazyload), 500);

/**
 * 方法2
 * 
 * getBoundClientRect 的实现方式
 * 
 * 监听 scroll 事件（建议给监听事件添加节流），
 * 图片加载完会从 img 标签组成的 DOM 列表中删除，最后所有的图片加载完毕后需要解绑监听事件
 */

 let imgList = [...document.querySelectorAll('img')]
 let num = imgList.length

 let lazyload = function(){
   let count = 0
   return function(){
     let deleteIndexList = []
     imgList.forEach((img,index) =>{
       let rect = img.getBoundingClientRect()
       if(rect.top < window.innerHeight){
         img.src = img.dataset.src
         deleteIndexList.push(index)
         count++
         if(count === num){
           document.removeEventListener('scroll',lazyload)
         }
       }
     })
     imgList = imgList.filter((_,index)=> !deleteIndexList.includes(index))
   }
 }

 throttle(window.addEventListener("scroll", lazyload), 500);

 /**
  * 方法3
  * 
  * intersectionObserver 的实现方式
  * 
  * 实例化一个 IntersectionObserver ，并使其观察所有 img 标签
  * 当 img 标签进入可视区域时会执行实例化时的回调，同时给回调传入一个 entries 参数，
  * 保存着实例观察的所有元素的一些状态，比如每个元素的边界信息，当前元素对应的 DOM 节点，当前元素进入可视区域的比率。
  * 每当一个元素进入可视区域，将真正的图片赋值给当前 img 标签，同时解除对其的观察
  * 
  * 参考 使用IntersectionObserver优化图片加载 https://juejin.cn/post/6923022184961359879
  * 
  */
 let imgList = [...document.querySelectorAll('img')]

 let lazyLoad = function(){
   let observer = new IntersectionObserver(entries => {
     entries.forEach(entry =>{
       // intersectionRatio  目标元素与根元素交叉的区域信息
       if(entry.intersectionRatio > 0){
         // target 被观察dom节点
         entry.target.src = entry.target.dataset.src
         // unobserve 停止监听一个目标元素
         observer.unobserve(entry.target)
       }
     })
   })
   imgList.forEach(img => {
     //  observe 开始监听一个目标元素(target)，target必须是root的后代
    observer.observe(img)
  })
 }