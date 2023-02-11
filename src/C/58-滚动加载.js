/**
 * 滚动加载
 * 
 * 原理：监听页面滚动事件，分析clientHeight,scrollTop,scrollHeight关系
 * 1. scrollTop  --  滚动条距离顶部的高度
 * 2. scrollHeight -- 当前页面的总高度(body总高度)
 * 3. clientHeight --  当前可视的页面高度(设备窗口的高度)
 * 
 * 获取当前可视的页面高度(设备窗口的高度)的原生方法：
 * window.innerHeight 标准浏览器及IE9+
 * document.documentElement.clientHeight 标准浏览器及低版本IE标准模式 
 * document.body.clientHeight 低版本混杂模式
 * 
 * 获取元素的尺寸的方法：
 * 1. 如果有内敛的元素尺寸，可以通过 dom.style.xxx 获取，比如 dom.style.width
 * 2. 其他情况必须：dom.currentStyle[xxx] || document.defaultView.getComputedStyle(0)[xxx] 来获取样式值
 * 
 * 
 */
window.addEventListener('scroll',function(){
    // window.innerHeight || Math.min(document.documentElement.clientHeight, document.body.clientHeight);
    const clientHeight = document.documentElement.clientHeight;
    // window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
    const scrollTop = document.documentElement.scrollTop;
    // Math.max(document.documentElement.scrollHeight, document.body.scrollHeight);
    const scrollHeight = document.documentElement.scrollHeight;
    if(clientHeight + scrollTop >= scrollHeight){
        // 监测到滚动到底部，进行后续操作
    }
},false); 