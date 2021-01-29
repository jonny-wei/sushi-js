/**
 * 图片懒加载
 *
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
    if (offsetHeight < viewHeigh + scrollHeigh) {  // 和滚动加载同理 clientHeight + scrollTop >= scrollHeight
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
  */
 let imgList = [...document.querySelectorAll('img')]

 let lazyLoad = function(){
   let observer = new IntersectionObserver(entries => {
     entries.forEach(entry =>{
       if(entry.intersectionRatio > 0){
         entry.target.src = entry.target.dataset.src
         observer.unobserve(entry.target)
       }
     })
   })
   imgList.forEach(img => {
    observer.observe(img)
  })
 }