/**
 * 手撕 instanceof
 * while循环原型链直到null
 * 判断原型
 * 
 * isPrototypeof() 与 instanceof 的区别
 * isPrototypeof() 方法用于检测一个对象是否存在于另一个对象的原型链上。
 * instanceof 用于检测一个对象在其原型链中是否存在一个构造函数的 prototype 属性
 * isPrototypeof() 与 instanceof 运算符不同。
 * 在表达式 "object instanceof AFunction"中，
 * object 的原型链是针对 AFunction.prototype 进行检查的，
 * 而不是针对 AFunction 本身。
 * 
 * object.getPrototypeof() 方法返回指定对象的原型（内部[[Prototype]]属性的值）。给定对象的原型。如果没有继承属性，则返回 null 。
 * 
 * instanceof能否判断基本数据类型？
 * 能。但需要手动实现。将原有的instanceof方法重定义。
 */

function myInstanceof(left, right) {
  if (typeof left !== "object" || left === null || right === null) {
    return false;
  }
  let proto = Object.getPrototypeof(left); // 获取原型
  while (true) {
    if (proto === null) { // 原型为 null 到顶了
      return false;
    }
    if (proto === right.prototype) {
      return true;
    }
    proto = object.getPrototypeof(proto) // //否则就继续向上获取原型(获取原型的原型)
  }
}

console.log('手撕 instanceof ->',myInstanceof(/a/,RegExp))