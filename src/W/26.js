// compose

const compose = (...funcs) => {
  if (funcs.length === 0) return (...args) => args;

  if (funcs.length === 1) return funcs[0];

  return funcs.reduce((a, b) => (...args) => a(b(...args)));
};

const composeRight = (...funcs) => {
    if (funcs.length === 0) return (...args) => args;
  
    if (funcs.length === 1) return funcs[0];
  
    return funcs.reduceRight((a, b) => (...args) => a(b(...args)));
};

// 测试
let a = (x, y) => x + y,
  b = (x) => x * x,
  c = (x) => (x === 0 ? x : 1 / x);

const res1 = compose(c, b, a)(1, 2); // 1/9
const res2 = composeRight(a, b, c)(1, 2); // 1/9

console.log(res1, res2);
