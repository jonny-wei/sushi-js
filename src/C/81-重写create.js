/**
 * Object.prototype.create()
 *
 * Object.create()方法创建一个新对象，使用现有的对象来提供新创建的对象的__proto__。
 */
Object.create2 = function (proto, propertyObject = undefined) {
  if (typeof proto !== "object" && typeof proto !== "function") {
    throw new TypeError("Object prototype may only be an Object or null.");
  }
  if (propertyObject == null) {
    new TypeError("Cannot convert undefined or null to object");
  }
  function F() {}
  F.prototype = proto;
  const obj = new F();
  if (propertyObject != undefined) {
    Object.defineProperties(obj, propertyObject);
  }
  if (proto === null) {
    // 创建一个没有原型对象的对象，Object.create(null)
    obj.__proto__ = null;
  }
  return obj;
};