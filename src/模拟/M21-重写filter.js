/**
 * 重写filter
 * MDN filter polyfill垫片
 * filter(callback(element,index,array),thisArg)
 * 不改变原数组，返回新数组
 */
Array.prototype.filter = function (callback, thisArg) {
  const result = [];
  if (this == undefined) {
    throw new TypeError("this is null or not undefined");
  }
  if (!(callback instanceof Function)) {
    throw new TypeError(callback + "is not a function");
  }
  // 让 obj 成为回调函数的对象传递（强制转换对象）
  const obj = Object(this);
  // >>> 0 无符号右移位运算。保证len为number，且为正整数
  const len = obj.length >>> 0;
  for (let i = 0; i < len; i++) {
    // 检查i是否在 obj 的属性（会检查原型链）
    if (i in obj) {
      // 回调函数调用传参
      if (callback.call(thisArg, obj[i], i, obj)) {
        result.push(obj[i]);
      }
    }
  }
  return result;
};

console.log(
  "重写filter ->",
  [1, 2, "3"].filter((item) => {
    return item > 1;
  })
);

/**
 * 方法二
 */
Array.prototype.filter = function (callback, thisArg) {
  const arr = Array.prototype.slice.call(this);
  let res = [];
  for (let i = 0; i < arr.length; i++) {
    if (i in arr) {
      if (callback.call(thisArg, arr[i], index, this)) {
        res.push(arr[i]);
      }
    }
  }
  return res;
};

/**
 * 方法三
 */
Array.prototype.filter = function (callback, thisArg) {
  const arr = Array.prototype.slice.call(this);
  return arr.reduce((acc, value, index) => {
    if (callback.call(thisArg, value, index, this)) {
      return [...acc, value];
    } else {
      return [...acc];
    }
  }, []);
};
