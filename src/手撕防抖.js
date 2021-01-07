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
      if (callNow) callback.apply(context, arguments); // 第一次首次触发 立刻执行
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
