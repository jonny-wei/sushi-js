/**
 * 实现 setTimeout
 * 
 * 利用 requestAnimationFrame
 * 
 * 第一个参数为函数或可执行的字符串(比如 alert('test') ，此法不建议使用)
 * 第二个参数 为延迟毫秒数 ，可选的，默认值为 0
 * 第三个及后面的参数为函数的入参
 * setTimeout 的返回值是一个数字，这个成为 timeoutID ，可以用于取消该定时器
 * 
 * JavaScript 定时器函数像 setTimeout 和 setInterval 都不是 ECMAScript 规范或者任何 JavaScript 实现的一部分。
 * 定时器功能由浏览器实现，它们的实现在不同浏览器之间会有所不同。 定时器也可以由 Node.js 运行时本身实现。
 */

let setTimeout = (fn, timeout, ...args) => {
  // 初始当前时间
  const start = +new Date();
  let timer, now;
  const loop = () => {
    timer = window.requestAnimationFrame(loop);
    // 再次运行时获取当前时间
    now = +new Date();
    // 当前运行时间 - 初始当前时间 >= 等待时间 ===>> 跳出
    if (now - start >= timeout) {
      fn.apply(this, args);
      window.cancelAnimationFrame(timer);
    }
  };
  window.requestAnimationFrame(loop);
};

function showName() {
  console.log("Hello");
}
let timerID = setTimeout(showName, 1000);
