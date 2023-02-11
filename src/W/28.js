// 深拷贝
const deepClone = (source, cache = new WeakMap()) => {
  if (
    (typeof source !== "object" && typeof source !== "function") ||
    source === null
  ) {
    return source;
  }

  if (cache.has(source)) {
    return cache.get(source);
  }

  let target;
  if (source instanceof Array) {
    target = [];
  } else if (source instanceof Function) {
    target = function () {
      return source.apply(this, arguments);
    };
  } else if (source instanceof RegExp) {
    target = source;
  } else if (source instanceof Date) {
    target = new Date(source);
  } else {
    target = {};
  }

  cache.set(source, target);
  for (let key in source) {
    if (source.hasOwnProperty(key)) {
      target[key] = deepClone(source[key], cache);
    } else {
      target[key] = source[key];
    }
  }

  return target;
};

let obj = {
  a: [1, 2, 3],
  b: { bb: 123 },
  c: true,
  d: { dd: /a/ },
  e: { ee: null },
  f: { ff: undefined, fff: ["1", /a/, 3] },
  g: function () {},
  h: Symbol("h"),
  i: { ii: new Date() },
};

let newObj = deepClone(obj);
obj.a = [1, 2];
console.log(newObj);
