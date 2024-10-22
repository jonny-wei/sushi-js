/**
 * 函数组合 compose 
 * 
 * 在 UNix/Linux 中称管道 pipe; 在 webpack 中称函数组合 compose，都是一个概念
 *
 * compose函数的作用就是组合函数，依次组合传入的函数：
 * 1. 后一个函数作为前一个函数的参数
 * 2. 最后一个函数可以接受多个参数，前面的函数只能接受单个参数；后一个的返回值传给前一个
 * 类似于 fn3(fn2(fn1(fn0(x))))
 * 
 * 应用场景：
 * （1）webpack 的 loader 机制
 * （2）在 Redux 中，applyMiddleware 函数使用 compose 来组合多个中间件。这些中间件可以拦截 action 的派发，执行异步操作，或在 state 更新前后执行额外的逻辑。
 * （3）Koa 使用 koa-compose 库来组合中间件，这样可以将多个中间件组合成一个大的中间件，简化中间件的管理
 * （4）在前端应用中，经常需要对数据进行一系列的处理和转换。通过函数组合，可以将多个数据处理函数链接在一起，形成一个数据处理流程。
 * 
 * 
 * https://github.com/mqyqingfeng/Blog/issues/45
 */

// 函数式编程之组合与管道
function compose() {
  let args = arguments;
  let start = args.length - 1;
  let result;
  return function () {
    result = args[start].apply(this, arguments);
    while (start--) {
      result = args[start].call(this, result);
    }
    return result;
  }
}

/**
 * 方法一  (推荐)
 *
 * compose(f4,f3,f2,f1)(c,d,e)
 * compose(f4,f3,f2,f1)返回的是一个函数
 * 
 * 核心 fn1(fn2(fn3(1,2))) 转化为 compose(fn1,fn2,fn3)(1,2)
 *
 * reduce回调函数第一次执行时，返回值为 函数 (...args) => f4(f3(...args))，作为下一次执行的a参数
 * 回调函数第二次执行时，返回值为 函数(...args) => f4(f3(f2(...args))),作为下一次执行的a参数
 * 回调函数第三次执行时，返回值为 函数(...args) => f4(f3(f2(f1(...args))))
 * 最右边的参数f1可以接受多个参数，然后返回结果传给下一个函数f2,返回结果再传入f3··· f3最先被调用，会等待f2的结果，再等待f1的结果。
 *
 * 那么如果想从左到右返回结果呢?
 * 1. 使用reduceRight
 * 2. 将funcs倒序
 * webpack - loader 执行原理
 * redux compose 原理
 * lodash flow、flowRight
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

function composeRight(...funcs) {
  //没有传入函数参数，就返回一个默认函数（直接返回参数）
  if (funcs.length === 0) {
    return (arg) => arg;
  }

  if (funcs.length === 1) {
    // 单元素数组时调用reduce，会直接返回该元素，不会执行callback;所以这里手动执行
    return funcs[0];
  }
  // 依次拼凑执行函数
  return funcs.reduceRight((a, b) => (...args) => a(b(...args)));
}

// 测试
const action1 = x => x + 1;
const action2 = x => x * 3;
const action3 = x => x + 2;

const f1 = compose(action3, action2, action1);
const f2 = composeRight(action1, action2, action3);

console.log(f1(2)); // 输出 ((2 + 1) * 3) + 2 = 11

console.log(f2(2)); // 输出 ((2 + 1) * 3) + 2 = 11

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

/**
 * 方法三 underscore源码 的 compose 函数的实现
 * 和上面迭代实现一样
 */
function compose() {
  var args = arguments;
  var start = args.length - 1;
  return function () {
    var i = start;
    var result = args[start].apply(this, arguments);
    while (i--) result = args[i].call(this, result);
    return result;
  };
}