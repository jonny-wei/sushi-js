/**
 * 手撕 instanceof
 * 
 * 判断一个实例是否属于某种类型
 * instanceof 用于检测一个对象在其原型链中是否存在一个构造函数的 prototype 属性
 * 
 * 而 o instanceOf O 的实现原理是，检测o的原型链上有没有 O.prototype 
 * 即 o.proto == O.prototype || o.proto.proto == O.prototype
 * 
 * isPrototypeOf() 与 instanceof 的区别：
 * instanceof 用于检测一个对象在其原型链中是否存在一个构造函数的 prototype 属性
 * instanceof 会检查对象的原型链。
 * instanceof 可以用来检测一个对象是否是某个类的实例。
 * instanceof 可以正确处理多继承的情况，因为它会遍历整个原型链。
 * 
 * isPrototypeOf() 是 Object.prototype 上的一个方法，可以用来检查一个对象是否是另一个对象的原型。
 * isPrototypeOf() 会检查调用它的对象是否在另一个对象的原型链上。
 * isPrototypeOf() 可以用来检查一个对象是否是另一个对象的原型或原型链上的某个对象。
 * isPrototypeOf() 不能处理多继承的情况，因为它只检查直接的原型关系。
 * 
 * instanceof 会遍历整个原型链，而 isPrototypeOf() 只检查直接的原型关系。instanceof 用于检测对象是否是构造函数的实例，而 isPrototypeOf() 用于检测对象是否是另一个对象的原型。
 * 
 * isPrototypeOf() 与 instanceof 运算符不同：
 * 在表达式 "object instanceof AFunction"中，
 * object 的原型链是针对 AFunction.prototype 进行检查的，而不是针对 AFunction 本身。
 *
 * isPrototypeOf() 与 Object.getPrototypeOf()：
 * Object.getPrototypeOf() 返回指定对象的原型（内部[[Prototype]]属性的值）。
 * 给定对象的原型。如果没有继承属性，则返回 null。
 * 
 * 实现原理：
 * while 循环遍历左值的原型链，判断和右值的原型对象是否相等，
 * 相等返回 true，意味着左值
 * 遍历到原型链终点时则返回 false，找到则返回 true
 * 
 * instanceof能否判断基本数据类型？
 * 能。但需要手动实现。将原有的 instanceof 方法重定义。
 * 需要先将基本类型转换为它们的包装对象，然后再进行原型链的检查。
 */

/**
 * 模拟 instanceof
 * @param {*} left 
 * @param {*} right 
 * @returns 
 */
function myInstanceof(left, right) {
  if (typeof left !== "object" || left === null || right === null) {
    return false;
  }
  // 左值的原型链
  let proto = Object.getPrototypeOf(left);
  // 右值的prototype属性
  let prototype = right.prototype;

  // 遍历左值的原型链，直到找到匹配的prototype属性
  while (proto !== null) {
    if (proto === prototype) {
      return true;
    }
    proto = Object.getPrototypeOf(proto);
  }

  return false;
}

console.log('手撕 instanceof ->', myInstanceof(/a/, RegExp))


/**
 * 基本类型判断
 * @param {*} left 
 * @param {*} right 
 * @returns 
 */
function myInstanceof(left, right) {
  // 确保right是函数，因为instanceof是用来检测对象是否是函数的实例
  if (typeof right !== 'function') {
    throw new Error('Right-hand side of instanceof operator must be a function.');
  }

  // 如果left是基本类型，则将其转换为对应的包装对象
  if (typeof left !== 'object' || left === null) {
    left = Object(left);
  }

  // 左值的原型链
  let proto = Object.getPrototypeOf(left);
  // 右值的prototype属性
  let prototype = right.prototype;

  // 遍历左值的原型链，直到找到匹配的prototype属性
  while (proto) {
    if (proto === prototype) {
      return true;
    }
    proto = Object.getPrototypeOf(proto);
  }

  return false;
}

// 使用示例
console.log(myInstanceof(123, Number)); // true
console.log(myInstanceof("Hello", String)); // true
console.log(myInstanceof(true, Boolean)); // true
console.log(myInstanceof(false, Number)); // false
console.log(myInstanceof({}, Object)); // true
console.log(myInstanceof([], Array)); // true
console.log(myInstanceof(function (){}, Array)); // false
console.log(myInstanceof(null, Object)); // true