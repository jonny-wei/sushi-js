/**
 * 手撕 instanceof
 * while循环原型链直到null
 * 判断一个实例是否属于某种类型
 * 
 * 而 o instanceOf O的实现原理是，检测o的原型链上有没有O.prototype 
 * 即 o.proto == O.prototype || o.proto.proto == O.prototype
 * instanceof 用于检测一个对象在其原型链中是否存在一个构造函数的 prototype 属性
 * 
 * isPrototypeof() 与 instanceof 的区别
 * isPrototypeof() 方法用于检测一个对象是否存在于另一个对象的原型链上。
 * instanceof 用于检测一个对象在其原型链中是否存在一个构造函数的 prototype 属性
 * isPrototypeof() 与 instanceof 运算符不同。
 * 在表达式 "object instanceof AFunction"中，
 * object 的原型链是针对 AFunction.prototype 进行检查的，
 * 而不是针对 AFunction 本身。
 * 
 * Object.getPrototypeOf() 方法返回指定对象的原型（内部[[Prototype]]属性的值）。给定对象的原型。如果没有继承属性，则返回 null 。
 * 
 * instanceof能否判断基本数据类型？
 * 能。但需要手动实现。将原有的instanceof方法重定义。
 * 通过判断对象的原型链上是否能找到对象的 prototype，来确定 instanceof 返回值
 * 
 * 原理是递归遍历 left 参数的原型链，每次和 right 参数作比较，
 * 遍历到原型链终点时则返回 false，找到则返回 true
 */

function myInstanceof(left, right) {
  if (typeof left !== "object" || left === null || right === null) {
    return false;
  }
  let proto = Object.getPrototypeOf(left); // 获取原型
  while (true) {
    if (proto === null) { // 原型为 null 到顶了
      return false;
    }
    if (proto === right.prototype) {
      return true;
    }
    proto = Object.getPrototypeOf(proto) // //否则就继续向上获取原型(获取原型的原型)
  }
}

console.log('手撕 instanceof ->',myInstanceof(/a/,RegExp))