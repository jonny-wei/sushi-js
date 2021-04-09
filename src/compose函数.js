/**
 * compose函数
 *
 * compose函数的作用就是组合函数，依次组合传入的函数：
 * 1. 后一个函数作为前一个函数的参数
 * 2. 最后一个函数可以接受多个参数，前面的函数只能接受单个参数；后一个的返回值传给前一个
 */

/**
 * 方法一 reduce 实现
 * 
 * compose(f4,f3,f2,f1)(c,d,e)
 * compose(f4,f3,f2,f1)返回的是一个函数
 *
 * reduce回调函数第一次执行时，返回值为 函数 (...args) => f4(f3(...args))，作为下一次执行的a参数
 * 回调函数第二次执行时，返回值为 函数(...args) => f4(f3(f2(...args))),作为下一次执行的a参数
 * 回调函数第三次执行时，返回值为 函数(...args) => f4(f3(f2(f1(...args))))
 * 最右边的参数f1可以接受多个参数，然后返回结果传给下一个函数f2,返回结果再传入f3··· f3最先被调用，会等待f2的结果，再等待f1的结果。
 *
 * 那么如果想从左到右返回结果呢?
 * 1. 使用reduceRight
 * 2. 将funcs倒序
 */
function compose(...funcs) {
  //没有传入函数参数，就返回一个默认函数（直接返回参数）
  if (funcs.length === 0) {
    return (arg) => arg;
  }

  if (funcs.length === 1) {
    // 单元素数组时调用reduce，会直接返回该元素，不会执行callback;所以这里手动执行
    return funcs[0];
  }
  // 依次拼凑执行函数
  return funcs.reduce((a, b) => (...args) => a(b(...args)));
}

// 测试
let a = (x, y) => x + y,
  b = (x) => x * x,
  c = (x) => (x === 0 ? x : 1 / x);

compose(c, b, a)(1, 2); // 1/9

/**
 * 方法二 迭代
 * 用迭代的方式实现从右到左依次执行的组合函数。
 * 
 * 通过index来标记应该执行哪个函数，这里是从最右边（length - 1）开始执行的，
 * 每执行一个index就减1，直到index为0（最左边）为止。
 * 用result来记录每次函数执行的返回值，每次都会更新，直到所有函数都执行完。才会返回最终结果
 * 如果传递的函数列表为空，则返回传入参数。
 * 
 * 同样的如果需要从左到右依次执行，则将funcs倒序即可。
 */
function compose(...funcs) {
  let length = funcs.length;

  return function (...arg) {
    let index = length - 1,
      result = length > 0 ? funcs[index].apply(this, arg) : arg; //注意arg为数组，要用apply
    while (--index >= 0) {
      result = funcs[index].call(this, result);
    }
    return result;
  };
}
