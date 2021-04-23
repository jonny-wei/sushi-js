/**
 * 手撕防抖debounce
 *
 * debounce(func,wait): function
 *
 * 闭包，高阶函数的应用 推荐 debounce2
 *
 * 定义：在事件触发完后n秒内不再触发，才执行。
 * 事件触发经过n秒后才执行，如果在这n秒中又触发了该事件，则以该新事件触发时的时间为准，经n秒后，才执行。
 * 某个函数在某段时间内，无论触发了多少次回调，都只执行最后一次。
 *
 * 原理：实现原理就是利用定时器，函数第一次执行时设定一个定时器，之后调用时发现已经设定过定时器就清空之前的定时器，
 * 并重新设定一个新的定时器，如果存在没有被清空的定时器，当定时器计时结束后触发函数执行。
 *
 * 应用：input 输入回调事件添加防抖函数后，只会在停止输入后触发一次；window触发resize事件
 *
 * 返回值是一个函数
 * 
 * 为什么使用防抖与节流
 * 防抖和节流是针对响应跟不上触发频率这类问题的两种解决方案。 
 * 在给DOM绑定事件时，有些事件我们是无法控制触发频率的。 
 * 如鼠标移动事件 onmousemove, 滚动滚动条事件 onscroll，窗口大小改变事件 onresize，瞬间的操作都会导致这些事件会被高频触发。
 * 如果事件的回调函数较为复杂，就会导致响应跟不上触发，出现页面卡顿，假死现象。 
 * 在实时检查输入时，如果我们绑定 onkeyup 事件发请求去服务端检查，用户输入过程中，
 * 事件的触发频率也会很高，会导致大量的请求发出，响应速度会大大跟不上触发。
 * 针对此类快速连续触发和不可控的高频触发问题，debounce 和 throttling 给出了两种解决策略；
 * 节流会稀释函数的执行频率
 * 除此之外可以用 requestAnimationFrame
 * 目的：当多次执行某一动作，进行函数调用次数的限制，节省资源
 * 防抖：在事件触发n秒后执行函数，如果在n秒内再次出发，重新计时
 * 节流：当多次执行某一动作，每个一段时间，只执行一次函数。
 * 
 * 函数防抖的应用场景(连续的事件，只需触发一次回调的场景)
 * 搜索框搜索输入。只需用户最后一次输入完，再发送请求
 * 手机号、邮箱验证输入检测(change、input、blur、keyup等事件触发，每次键入都会触发)
 * 窗口大小Resize。只需窗口调整完成后，计算窗口大小。防止重复渲染。
 * 鼠标的mousemove、mouseover
 * 导航条上，用户不停的在导航区域滑动相当于
 * 
 * 函数节流的应用场景(间隔一段时间执行一次回调的场景)
 * 
 * 滚动加载，加载更多或滚到底部监听，window.onscroll和滑到底部自动加载更多
 * 谷歌搜索框，搜索联想功能
 * 高频点击提交，表单重复提交
 * 
 */
function test(count) {
  console.log("手撕 debounce", count);
  return 1;
}

/**
 * 第一版debounce
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
 * 第二版debounce
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
 * callback可能有返回值。
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

console.log(debounce5(test, 4000, true)());
let cancelAction = debounce5(test, 4000, true);
cancelAction.cancel();

/**
 * 其他写法
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
