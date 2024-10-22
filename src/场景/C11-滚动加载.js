/**
 * 滚动加载更多 scrollLoadMore
 * 
 * 1. 传统 scroll 事件
 * 2. scroll 事件 + requestAnimationFrame 优化
 * 3. IntersectionObserver
 * 
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

/**
 * 版本一
 */
window.addEventListener('scroll', function () {
    // 获取视口的高度。window.innerHeight || Math.min(document.documentElement.clientHeight, document.body.clientHeight);
    const clientHeight = document.documentElement.clientHeight;
    // 获取滚动条的垂直位置。window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
    const scrollTop = document.documentElement.scrollTop;
    // 获取文档的总高度。Math.max(document.documentElement.scrollHeight, document.body.scrollHeight);
    const scrollHeight = document.documentElement.scrollHeight;
    // 检查是否滚动到底部
    if (clientHeight + scrollTop >= scrollHeight) {
        // 监测到滚动到底部，进行后续操作
    }
}, false);

/**
 * 版本二 
 * 
 * 优化
 * 防抖节流、requestAnimationFrame
 */
let isScrolling = false;

window.addEventListener('scroll', () => {
    if (!isScrolling) {
        isScrolling = true;
        requestAnimationFrame(function () {
            const clientHeight = document.documentElement.clientHeight;
            const scrollTop = document.documentElement.scrollTop;
            const scrollHeight = document.documentElement.scrollHeight;
            if (clientHeight + scrollTop >= scrollHeight) {
                console.log('滚动到底部了，可以加载更多内容');
                // 在这里调用加载更多内容的函数
            }
            isScrolling = false;
        });
    }
});

/**
 * 版本三 （推荐）
 */
function handleIntersection(entries, observer) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            loadMoreData().then((newData) => {
                console.log("loadMoreData:", newData)
                // 重新观察加载提示
                observer.observe(document.getElementById('loader'));
            });
        }
    });
}

const observer = new IntersectionObserver(handleIntersection, {
    threshold: 0.1 // 当加载提示进入视口 10% 时触发
});

// 开始观察加载提示
observer.observe(document.getElementById('loader'));