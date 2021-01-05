/**
 * 图片懒加载
 *
 * 可以给img标签统一自定义属性data-src='default.png'，当检测到图片出现在窗口之后再补充src属性，此时才会进行图片资源加载。
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
    if (offsetHeight < viewHeigh + scrollHeigh) {
      const src = imgs[i].dataset.src;
      imgs[i].src = src;
    }
  }
}

debounce(window.addEventListener("scroll", lazyload), 500);
