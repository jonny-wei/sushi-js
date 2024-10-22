/**
 * 函数柯里化 currying
 *
 * 指的是将一个接受多个参数的函数 变为 接受一个参数返回一个函数的固定形式，这样便于再次调用，例如f(1)(2)
 *
 * currying(fn):function
 *
 * currying 性能
 * 存取arguments对象通常要比存取命名参数要慢一点
 * 一些老版本的浏览器在arguments.length的实现上是相当慢的
 * 使用fn.apply( … ) 和 fn.call( … )通常比直接调用fn( … ) 稍微慢点
 * 创建大量嵌套作用域和闭包函数会带来花销，无论是在内存还是速度上
 *
 * currying 使用场景：
 * 
 * (1) 降低适用范围，提高适用性。
 * 有时候应用中，同一种规则可能会反复使用，这就可能会造成代码的重复性
 * 
 * map(square, [1, 2, 3, 4, 5]); 
 * map(square, [6, 7, 8, 9, 10]); 
 * map(square, [10, 20, 30, 40, 50]);
 * 
 * 传入了相同的处理函数：square 重复。改造为函数柯里化：
 * const mapSQ = currying(map, square);
 * mapSQ([1, 2, 3, 4, 5]); 
 * mapSQ([6, 7, 8, 9, 10]); 
 * mapSQ([10, 20, 30, 40, 50]);
 * 
 * (2) 延迟执行。
 * 柯里化的另一个应用场景是延迟执行。不断的柯里化，累积传入的参数，最后执行。
 * 
 * (3) 固定易变因素
 * 柯里化特性决定了它这应用场景。提前把易变因素，传参固定下来，生成一个更明确的应用函数。
 * 最典型的代表应用，是 bind 函数用以固定 this 这个易变对象。
 *
 * javascript 中的柯里化函数和 bind 函数提供了强大的动态函数创建功能，
 * 但是两者都不应该滥用，因为每个函数都带来额外的开销
 * 柯里化通常也称部分求值，其含义是给函数分步传递参数，每次传递参数后部分应用参数，
 * 并返回一个更具体的函数接受剩下的参数，这中间可嵌套多层这样的接受部分参数函数，直至返回最后结果。
 *
 * https://www.jianshu.com/p/2975c25e4d71
 */

/**
 * 函数柯里化实现
 *
 * 核心 fn(1,2,3,4) 转化为 fn(1)(2)(3)(4)
 *
 * 核心就是收集参数，收集完了就执行
 */
function curry(fn) {
  if (typeof fn !== "function") {
    throw new TypeError(fn + " is not a function");
  }
  let args = [].slice.call(arguments, 1);

  let _curry = function () {
    // 里面使用了 arguments 不能用箭头函数
    if (arguments.length === 0) {
      return fn.apply(this, args);
    } else {
      // 收集参数，返回一个函数
      args.push(...arguments);
      return _curry;
    }
  };
  return _curry;
}

/**************** 推荐 *****************/
// 函数参数个数不定长的柯里化解决方案
const curry1 = (fn) => {
  let args = [];
  const _curry = (...rest) => {
    if (rest.length) {
      // 还有参数就收集起来，返回函数等待调用
      args = [...args, ...rest];
      return _curry;
    } else {
      // 参数收集完了，返回结果
      return fn.apply(this, args);
    }
  };
  return _curry;
};

// 函数参数个数定长的柯里化解决方案
const curry2 = (fn) => {
  let argsLen = fn.length;
  
  if (argsLen <= 1) return fn;

  let _curry = (...args) => {
    if (args.length === argsLen) {
      return fn.apply(this, args);
    } else {
      return (...rest) => {
        return _curry(...args, ...rest);
      };
    }
  };
  return _curry;
};

// 测试用例
const _add1 = (...args) => {
  return args.reduce((a, b) => a + b);
};
const _add2 = (a, b, c, d) => {
  return [a, b, c, d].reduce((a, b) => a + b);
};
const add1 = curry1(_add1);
console.log(add1(1)(3, 4)(2)()); // 参数不定长调用方式 最后要()触发

const add2 = curry2(_add2);
console.log(add2(1)(3)(4)(2)); // 参数定长调用方式