/**
 * 手撕防抖 debounce
 *
 * debounce(func,wait): function
 *
 * 防抖是闭包，高阶函数的应用之一，返回值是一个函数。
 * 推荐 debounce2
 *
 * 定义：
 * 在事件被触发 n 秒后再执行回调，如果在这 n 秒内事件又被触发，则重新计时。
 * 事件触发经过 n 秒后才执行，如果在这 n 秒中又触发了该事件，则以该新事件触发时的时间为准，经 n 秒后，才执行。
 * 某个函数在某段时间内，无论触发了多少次回调，都只执行最后一次。
 *
 * 你尽管触发事件，但是我一定在事件触发 n 秒后才执行，如果你在一个事件触发的 n 秒内又触发了这个事件，
 * 那我就以新的事件的时间为准，n 秒后才执行，总之，就是要等你触发完事件 n 秒内不再触发事件，我才执行
 *
 * 原理：
 * 实现原理就是利用定时器，函数第一次执行时设定一个定时器，之后调用时发现已经设定过定时器就清空之前的定时器，
 * 并重新设定一个新的定时器，如果存在没有被清空的定时器，当定时器计时结束后触发函数执行。
 *
 * 函数防抖的应用场景(连续的事件，只需触发一次回调的场景)：
 * 1. 搜索框搜索输入，搜索框联想场景。防止联想发送请求，只发送最后一次输入。
 * 2. 手机号、邮箱验证输入检测(change、input、blur、keyup等事件触发，每次键入都会触发)
 * 3. 窗口大小 resize 事件的触发。只需窗口调整完成后，计算窗口大小。防止重复渲染。调整浏览器窗口大小时，
 * 4. resize 次数过于频繁，造成计算过多，此时需要一次到位，就用到了防抖
 * 5. 鼠标的 mousemove、mouseover 事件的触发。
 * 6. 导航条上，用户不停的在导航区域滑动
 * 7. 登录、发短信等按钮提交场景，防止多次提交按钮，以致于发送了多次请求，只执行最后提交的一次，需要防抖
 * 8. 文本编辑器实时保存，当无任何更改操作一秒后进行保存
 *
 * 函数节流的应用场景(间隔一段时间执行一次回调的场景)
 * 1. 滚动加载 scroll 场景，加载更多或滚到底部监听，window.onscroll 和滑到底部自动加载更多
 * 2. 谷歌搜索框，搜索联想功能
 * 3. 高频点击提交，表单重复提交
 * 4. 浏览器播放事件，每个一秒计算一次进度信息等
 * 5. input 框实时搜索并发送请求展示下拉列表，没隔一秒发送一次请求 (也可做防抖)
 * 6. 拖拽场景：固定时间内只执行一次，防止超高频次触发位置变动
 * 7. 缩放场景：监控浏览器resize
 *
 * 为什么使用防抖与节流？
 *
 * 防抖和节流是针对响应跟不上触发频率这类问题的两种解决方案。
 *
 * 在给 DOM 绑定事件时，有些事件我们是无法控制触发频率的。
 * 如鼠标移动事件 onmousemove, 滚动滚动条事件 onscroll，窗口大小改变事件 onresize，
 * 瞬间的操作都会导致这些事件会被高频触发。
 *
 * 如果事件的回调函数较为复杂，就会导致响应跟不上触发，出现页面卡顿，假死现象。
 * 在实时检查输入时，如果我们绑定 onkeyup 事件发请求去服务端检查，用户输入过程中，
 * 事件的触发频率也会很高，会导致大量的请求发出，响应速度会大大跟不上触发。
 *
 * 针对此类快速连续触发和不可控的高频触发问题，debounce 和 throttling 给出了两种解决策略；
 * 节流会稀释函数的执行频率
 * 除此之外可以用 requestAnimationFrame
 * 目的：当多次执行某一动作，进行函数调用次数的限制，节省资源
 *
 * 防抖：在事件触发 n 秒后执行函数，如果在 n 秒内再次触发，重新计时
 * 节流：当多次执行某一动作，每个一段时间，只执行一次函数。
 *
 * 防抖：高频率触发的事件，在指定的单位时间内，只响应最后一次，如果在指定时间再次触发，则重新计算时间。
 * 代码实现重在清零 clearTimeout
 * 节流：控制流量，单位时间内事件只能触发一次，如果服务器端的限流即 Rate Limit。
 * 代码实现重在开锁关锁 timer=timeout; timer=null
 */

/**
 * 第一版 debounce
 *
 * setTimeout
 */
function debounce1(callback, wait) {
  let timer = null;
  return function () {
    clearTimeout(timer);
    timer = setTimeout(callback, wait);
  };
}

/**
 * 第二版 debounce
 *
 * 解决 this 指向与事件对象 event 参数问题
 *
 * setTimeout + apply
 */
function debounce2(callback, wait) {
  let timer = null;
  return function () {
    clearTimeout(timer);
    timer = setTimeout(() => {
      callback.apply(this, arguments); // args: 是类数组 用apply()
    }, wait);
  };
}

/**
 * 第三版 debounce
 *
 * 首次触发 立刻执行
 *
 * 不希望非要等到事件停止触发后才执行，我希望立刻执行函数，然后等到停止触发 n 秒后，再重新触发执行
 * 多 immediate 参数
 */
function debounce3(callback, wait, immediate) {
  let timer = null;
  return function () {
    clearTimeout(timer);
    if (immediate) {
      const callNow = !timer; // 如果已经执行过，不再执行
      timer = setTimeout(function () {
        timer = null;
      }, wait);
      if (callNow) callback.apply(this, arguments); // 第一次首次触发 立刻执行
    } else {
      timer = setTimeout(() => {
        callback.apply(this, arguments); // arguments: 是类数组 用apply()
      }, wait);
    }
  };
}

/**
 * 第四版 debounce
 *
 * callback 可能有返回值。
 *
 * 要返回函数执行的结果，但是当 immediate 为 false 的时候，因为使用了 setTimeout ，
 * 我们将 callback.apply(context, args) 的返回值赋给变量，最后再 return 的时候，
 * 值将会一直是 undefined，
 * 所以我们只在 immediate 为 true 的时候返回函数的执行结果。
 */
function debounce4(callback, wait, immediate) {
  let timer = null;
  let result = null;
  return function () {
    clearTimeout(timer);
    if (immediate) {
      const callNow = !timer; // 如果已经执行过，不再执行
      timer = setTimeout(function () {
        timer = null;
      }, wait);
      if (callNow) result = callback.apply(this, arguments); // 第一次首次触发 立刻执行
    } else {
      timer = setTimeout(() => {
        callback.apply(this, arguments); // args: 是类数组 用apply()
      }, wait);
    }
    return result;
  };
}

// 测试
function test(count) {
  console.log("手撕 debounce", count);
  return 1;
}
console.log(debounce4(test, 3000, true)());

/**
 * 第五版 debounce
 *
 * 取消
 *
 * debounce.cancel()
 * 可以取消防抖 立即执行
 */
function debounce5(callback, wait, immediate) {
  let timer = null;
  let result = null;
  let debounced = function () {
    clearTimeout(timer);
    if (immediate) {
      const callNow = !timer; // 如果已经执行过，不再执行
      timer = setTimeout(function () {
        timer = null;
      }, wait);
      if (callNow) result = callback.apply(this, arguments); // 第一次首次触发 立刻执行
    } else {
      timer = setTimeout(() => {
        callback.apply(this, arguments); // arguments: 是类数组 用apply()
      }, wait);
    }
    return result;
  };
  debounced.cancel = function () {
    clearTimeout(timer);
    timer = null;
    console.log("取消防抖");
  };
  return debounced;
}

// 测试
function test(count) {
  console.log("手撕 debounce", count);
  return 1;
}
console.log(debounce5(test, 4000, true)());
let cancelAction = debounce5(test, 4000, true);
cancelAction.cancel();

/**
 * 其他写法 （推荐）
 * leading 为是否在进入时立即执行一次，原理是利用定时器，
 * 如果在规定时间内再次触发事件会将上次的定时器清除，
 * 即不会执行函数并重新设置一个新的定时器，直到超过规定时间自动触发定时器中的函数
 * 同时通过闭包向外暴露了一个 cancel 函数，使得外部能直接清除内部的计数器
 */
const debounce = (
  func,
  time,
  options = {
    leading: true,
    context: null,
  }
) => {
  let timer = null;
  const _debounce = function (...args) {
    if (timer) {
      clearTimeout(timer);
    }
    if (options.leading && !timer) {
      timer = setTimeout(null, time);
      func.apply(options.context, args);
    } else {
      timer = setTimeout(() => {
        func.apply(options.context, args);
        timer = null;
      }, time);
    }
  };
  _debounce.cancel = function () {
    clearTimeout(timer);
    timer = null;
  };
  return _debounce;
};

// 测试用例
let log = debounce(
  (i) => {
    console.log("防抖", i);
  },
  1000,
  { leading: true, context: this }
);
// 用例1
window.addEventListener("resize", log);
// 用例2
for (let i = 0; i < 1000; i++) {
  log(i);
}
