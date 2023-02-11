// some(callback(element, index, array), thisArg) : boolean;

Array.prototype.some = function (callback, thisArg) {
  if (this == null) {
    throw new TypeError();
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