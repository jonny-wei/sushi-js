/**
 * 函数柯里化
 * add(1) (2) (3) (4) = 10;
 */
// 函数参数个数不定长的柯里化解决方案
// function curry1(fn) {
//   if (typeof fn !== "function") {
//     throw new TypeError(fn + " is not a function");
//   }
//   let args = [].slice.call(arguments, 1);
//   let _curry = function () {
//     // 里面使用了 arguments 不能用箭头函数
//     if (arguments.length === 0) {
//       return fn.apply(this, args);
//     } else {
//       // 收集参数，返回一个函数
//       args.push(...arguments);
//       return _curry;
//     }
//   };
//   return _curry;
// }

// 函数参数个数不定长的柯里化解决方案
const curry1 = (fn) => {
  let args = []; // 闭包存参数
  const _curry = (...rest) => {
    if (rest.length) {
      args = [...args, ...rest];
      return _curry;
    } else {
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
      return fn(...args);
    } else {
      return (...rest) => {
        return _curry(...args, ...rest);
      };
    }
  };
  return _curry;
};

// 注意，注意，注意，rest 与 实参的 fn.length 为 0。不定长调用方式 add
const _add1 = (...args) => {
  return args.reduce((a, b) => a + b);
};
const _add2 = (a, b, c, d) => {
  return [a, b, c, d].reduce((a, b) => a + b);
};
const add1 = curry1(_add1);
const add2 = curry2(_add2);
console.log(add1(1)(3, 4)(2)()); // 不定长调用方式
console.log(add2(1)(3)(4)(2));

// 粗暴 - 不优雅 - 闭包 - 内存
// const add = (...a) => {
//   return (...b) => {
//     return (...c) => {
//       return (...d) => {
//         return Array.prototype.reduce.call(
//           [...a, ...b, ...c, ...d],
//           (a, b) => a + b
//         );
//       };
//     };
//   };
// };
