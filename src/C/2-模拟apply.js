/**
 * 手撕 apply
 *
 * function.apply(thisArg, [argsArray])
 *
 * argsArray 一个数组或者类数组对象(类数组存在兼容性)。如果该参数的值为 null 或  undefined，则表示不需要传入任何参数
 * call() 方法的作用和 apply() 方法类似，区别就是 call() 方法接受的是参数列表，而 apply() 方法接受的是一个参数数组。
 */

/**
 * 方法1
 */
Function.prototype.myapply1 = function () {
  if (typeof this !== "function") {
    throw new TypeError(this + " is not a function");
  }
  // 获取调用 apply 的函数，将其设为目标对象的属性，改变其作用域，但最后要删除这个临时属性
  var context = Object(arguments[0]) || globalThis;
  context.fn = this;

  // 函数执行结果
  var result = null;

  // 参数处理，apply 的参数是 数组或类数组
  const arr = arguments[1];
  if (!arr) {
    // 参数为空的情况
    result = context.fn();
  } else {
    // 参数不为空的情况
    var args = [];
    for (var i = 0; i < arr.length; i++) {
      args.push("arr[" + i + "]");
    }
    result = eval("context.fn(" + args + ")");
  }
  // 删除临时属性
  delete context.fn;

  return result;
};

/**
 * 方法2 (推荐)
 */
Function.prototype.myapply2 = function () {
  if (typeof this !== "function") {
    throw new TypeError(this + " is not a function");
  }
  let context = arguments[0] || globalThis;
  const fn = Symbol("fn");
  context[fn] = this;
  let result = null;
  if (arguments[1]) {
    result = context[fn](...arguments[1]);
  } else {
    result = context[fn]();
  }
  delete context[fn];
  return result;
};

/**
 * 测试用例1
 *
 * 用 apply 将数组各项添加到另一个数组
 * 直接使用 push 需要数组扁平化
 */
const array1 = ["a", "b"];
const array2 = ["c", "d"];
const elements = [0, 1, 2];
array1.push.myapply1(array1, elements);
array2.push.myapply2(array2, elements);
console.log("手撕 apply ->", array1);
console.log("手撕 apply ->", array2);
