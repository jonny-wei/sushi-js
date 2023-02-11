/**
 * 重写 Object.assign()
 *
 * 对象浅拷贝
 *
 * 只会拷贝源对象自身的并且可枚举的属性到目标对象。String类型和 Symbol 类型的属性都会被拷贝。
 * Object.assign(target, ...sources)
 * Object.assign() 方法用于将所有可枚举属性的值从一个或多个源对象分配到目标对象。它将返回目标对象。
 * 源对象source覆盖目标对象target的相同属性；后面的源对象覆盖前面的源对象
 * 
 * 继承属性和不可枚举属性是不能拷贝的
 *
 * 该方法使用源对象的[[Get]]和目标对象的[[Set]]，所以它会调用相关 getter 和 setter。
 * 因此，它分配属性，而不仅仅是复制或定义新的属性。如果合并源包含getter，这可能使其不适合将新属性合并到原型中
 *
 * 为了将属性定义（包括其可枚举性）复制到原型，
 * 应使用Object.getOwnPropertyDescriptor()和Object.defineProperty() 。
 * 
 * 针对深拷贝，需要使用其他办法，因为 Object.assign()拷贝的是（可枚举）属性值。
 *
 * Object.assign 不会在那些source对象值为 null 或 undefined 的时候抛出错误。
 */
Object.defineProperty(Object, "assign", {
  value: function assign(target, varArgs) {
    if (target === null || target === undefined) {
      throw new TypeError("Cannot convert undefined or null to object");
    }
    var to = Object(target);
    for (var index = 1; index < arguments.length; index++) {
      var nextSource = arguments[index];
      if (nextSource !== null && nextSource !== undefined) {
        for (var nextKey in nextSource) {  // for...in - key
          // for...in 和 hasOwnProperty判断，确保只拿到本身的属性、方法（不包含继承的）
          if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
            to[nextKey] = nextSource[nextKey];
          }
        }
      }
    }
    return to;
  },
  writable: true,
  configurable: true,
});

// 方法二
Object.assign2 = function(target, ...source) {
  if (target == null) {
      throw new TypeError('Cannot convert undefined or null to object')
  }
  let ret = Object(target) 
  source.forEach(function(obj) {
      if (obj != null) {
          for (let key in obj) {
              if (obj.hasOwnProperty(key)) {
                  ret[key] = obj[key]
              }
          }
      }
  })
  return ret
}

