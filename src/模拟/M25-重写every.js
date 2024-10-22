/**
 * 重写 every
 * every(callback(element,index,array),thisArg): Boolean
 *
 * 如果回调函数的每一次返回都为 truthy 值，返回 true ，否则返回 false
 *
 * 注意：若收到一个空数组，此方法在一切情况下都会返回 true。
 *
 * every 不会改变原数组。
 */
Array.prototype.every = function (callback, thisArg) {
  if (this == null) {
    throw new TypeError("this is null or not defined");
  }
  if (typeof callback !== "function") {
    throw new TypeError();
  }
  let obj = Object(this);
  let len = obj.length >>> 0;
  let k = 0;
  thisArg = arguments.length >= 2 ? arguments[1] : void 0;
  while (k < len) {
    if (k in obj) {
      if (!callback.call(thisArg, obj[k], k, obj)) {
        return false;
      }
    }
    k++;
  }
  return true;
};

// 方法二
Array.prototype.every = function(callback, thisArg){
  if (this == null) {
    throw new TypeError("this is null or not defined");
  }
  if (typeof callback !== "function") {
    throw new TypeError();
  }
  let obj = Object(this)
  let len = obj.length >>> 0;
  thisArg = arguments.length >= 2 ? arguments[1] : void 0;
  for (let i = 0; i < len; i++) {
    if (i in obj && !callback.call(thisArg, obj[i], i, obj)) {
      return false
    }
  }
  return true
}