/**
 * 重写map
 * MDN map polyfill垫片
 * map(callback(currentValue, index, array), thisArg)
 * 创建一个新数组，其结果是该数组中的每个元素是调用一次提供的函数后的返回值。
 * 不改变原数组，返回新数组
 * callback 函数只会在有值的索引上被调用；那些从来没被赋过值或者使用 delete 删除的索引则不会被调用。
 * 当你不打算使用返回的新数组却使用map是违背设计初衷的，请用forEach或者for-of替代
 */
Array.prototype.map = function (callback, thisArg) {
  const result = [];
  if (this == undefined) {
    throw new TypeError("this is null or not undefined");
  }
  if (typeof callback !== "function") {
    throw new TypeError(callback + "is not a function");
  }
  // 让 obj 成为回调函数的对象传递（强制转换对象）
  const obj = Object(this);
  // >>> 0 无符号右移位运算。保证len为number，且为正整数
  const len = obj.length >>> 0;
  for (let index = 0; index < len; index++) {
    if (index in obj) {
      result[index] = callback.call(thisArg, obj[index], index, obj);
    }
  }
  return result;
};

var numbers = [1, 4, 9];
var roots = numbers.map(Math.sqrt);
var a = Array.prototype.map.call("Hello World", function (x) {
  return x.charCodeAt(0);
});
console.log("重写map ->", roots, a);

/**
 * 方法二
 * for 循环
 * 也可以用 for...in-key不需要判断 直接过滤了稀疏数组的情况
 */
Array.prototype.map = function (callback, thisArg) {
  const arr = Array.prototype.slice.call(this);
  let res = [];
  for (let i = 0; i < arr.length; i++) {
    if (i in arr) {
      // 判断稀疏数组的情况
      res[i] = callback(thisArg, arr[i], i, this);
    }
  }
  return res;
};

/**
 * 方法三
 * 利用 reduce
 */
Array.prototype.map = function (callback, thisArg) {
  const arr = Array.prototype.slice.call(this);
  return arr.reduce((acc, value, index) => {
    return [...acc, callback.call(thisArg, value, index, this)];
  }, []);
};
