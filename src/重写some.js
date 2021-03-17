/**
 * 重写 some
 *
 * some(callback(element,index,array),thisArg): Boolean
 *
 * 数组中有至少一个元素通过回调函数的测试就会返回true；
 * 所有元素都没有通过回调函数的测试返回值才会为false。
 * 如果用一个空数组进行测试，在任何情况下它返回的都是false。
 *
 * 不会改变原数组。
 */

Array.prototype.some = function (callback, thisArg) {
  if (this == null) {
    throw new TypeError("Array.prototype.some called on null or undefined");
  }

  if (typeof callback !== "function") {
    throw new TypeError();
  }
  let obj = Object(this);
  let len = obj.length >>> 0;
  thisArg = arguments.length >= 2 ? arguments[1] : void 0;
  for (let i = 0; i < len; i++) {
    if (i in obj && callback.call(thisArg, obj[i], i, obj)) {
      return true;
    }
  }
  return false;
};

/**
 * 方法二
 */

Array.prototype.some = function (callback, thisArg) {
  const arr = Array.prototype.slice.call(this);
  if (!arr.length) return false;
  for (let i = 0; i < arr.length; i++) {
    if (i in arr && callback.call(thisArg, arr[i], i, this)) {
      return true;
    }
  }
  return false;
};
