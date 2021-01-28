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
 * currying 场景
 *
 * （1）降低适用范围，提高适用性。
 * 有时候应用中，同一种规则可能会反复使用，这就可能会造成代码的重复性
 * eg:
 * map(square, [1, 2, 3, 4, 5]); map(square, [6, 7, 8, 9, 10]); map(square, [10, 20, 30, 40, 50]);
 * 传入了相同的处理函数：square 重复。
 * 改造为函数柯里化：var mapSQ = currying(map, square);
 * mapSQ([1, 2, 3, 4, 5]); mapSQ([6, 7, 8, 9, 10]); mapSQ([10, 20, 30, 40, 50]);
 * （2）延迟执行。
 * 柯里化的另一个应用场景是延迟执行。不断的柯里化，累积传入的参数，最后执行。
 * （3）固定易变因素
 * 柯里化特性决定了它这应用场景。提前把易变因素，传参固定下来，生成一个更明确的应用函数。
 * 最典型的代表应用，是bind函数用以固定this这个易变对象。
 *
 * javascript 中的柯里化函数和 bind 函数提供了强大的动态函数创建功能，但是两者都不应该滥用，因为每个函数都带来额外的开销
 * 柯里化通常也称部分求值，其含义是给函数分步传递参数，每次传递参数后部分应用参数，
 * 并返回一个更具体的函数接受剩下的参数，这中间可嵌套多层这样的接受部分参数函数，直至返回最后结果。
 */

/**
 * 函数柯里化实现
 */
function curry(fn) {
  if(typeof fn !== 'function'){
    throw new TypeError(fn + ' is not a function');
  }
  let args = [].slice.call(arguments, 1);
  let _curry = function () {
    // 里面使用了 arguments 不能用箭头函数
    if (arguments.length === 0) {
      return fn.apply(this, args);
    } else {
      args.push(...arguments);
      return _curry;
    }
  };
  return _curry;
}

/**
 * 方法二
 */
function curry(fn) {
  if(fn.length <= 1) return fn;
  const _curry = (...args) => {
    if(fn.length === arg.length){
      return fn(...args)
    }else{
      return (...args2) => {
        return _curry(...args,args2)
      }
    }
  }
  return _curry
}

/**
 * 实现add(1)(2)(3)(4)=10; 、 add(1)(1,2,3)(2)=9;
 *
 * 柯里化思想求和
 */
function add() {
  return [].reduce.call(arguments, (a, b) => a + b);
}
function curryAdd() {
  return curry(function () {
    // 里面使用了 arguments 不能用箭头函数
    return [].reduce.call(arguments, (a, b) => a + b);
  });
}
const sum1 = curry(add)(1)(2)(3)(4)();
const sum2 = curry(add)(1)(1, 2, 3)(2)();
const sum3 = curry(add, 2)(1, 3, 4)(2, 3)(3)(4, 6)(7, 98)();
const sum4 = curryAdd(1)(2)(3)(4);
console.log("函数柯里化 ->", sum1, sum2, sum3, sum4());

/**
 * 取一个数组对象的属性组成一个数组
 */
const obj = [
    {name: '小明',age: 10},
    {name: '小花',age: 12},
    {name: '小军',age: 18},
    {name: '小白',age: 22},
]
// 使用reduce + concat 实现
function reduceProps(obj,props){
    return obj.reduce((acc,value)=>{
        return acc.concat(value[props])
    },[])
}
console.log('reduce实现根据key取value组成数组 ->', reduceProps(obj,'name'))

/**
 * 缓存记忆memoize函数
 * 
 * 用于优化比较耗时的计算，通过将计算结果缓存到内存中，这样对于同样的输入值，下次只需要中内存中读取结果。
 */
function memoizeFunction(func) {
    const cache = {};
    return function() {
        let key = arguments[0];
        if (cache[key]) {
            return cache[key];
        } else {
            const val = func.apply(null, arguments);
            cache[key] = val;
            return val;
        }
    };
}

const fibonacci = memoizeFunction(function(n) {
    return (n === 0 || n === 1) ? n : fibonacci(n - 1) + fibonacci(n - 2);
});

console.log(fibonacci(100));
console.log(fibonacci(100)); // 第2次计算 fibonacci(100) 则只需要在内存中直接读取结果。