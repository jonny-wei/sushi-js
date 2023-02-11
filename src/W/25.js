// 柯里化

// 定长
const curry1 = (fn) => {
  let argsLen = fn.length;

  if (argsLen <= 1) return fn;

  const curry = (...args) => {
    if (args.length === argsLen) {
      return fn(...args);
    } else {
      return (...rest) => {
        return curry(...args, ...rest);
      };
    }
  };
  return curry;
};

const baseAdd = (a1, a2, a3, a4) => {
  return [a1, a2, a3, a4].reduce((a, b) => a + b, 0);
};
const add = curry1(baseAdd);
const res1 = add(1)(2)(3)(4);
console.log(res1); // 10

// 不定长
const curry2 = (fn) => {
  let args = [];

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

const baseAdd2 = (...args) => {
  return args.reduce((a, b) => a + b, 0);
};
const add2 = curry2(baseAdd2);
const res2 = add2(1)(2, 3)(4)();
console.log(res2); // 10
