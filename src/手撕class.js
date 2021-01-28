/**
 * 手撕 class
 * 
 * ES6 的 class 内部是基于寄生组合式继承，它是目前最理想的继承方式，
 * 通过 Object.create 方法创造一个空对象，并将这个空对象继承 Object.create 方法的参数，
 * 再让子类（subType）的原型对象等于这个空对象，就可以实现子类实例的原型等于这个空对象，
 * 而这个空对象的原型又等于父类原型对象（superType.prototype）的继承关系
 * 
 * 而 Object.create 支持第二个参数，即给生成的空对象定义属性和属性描述符/访问器描述符，
 * 我们可以给这个空对象定义一个 constructor 属性更加符合默认的继承行为，
 * 同时它是不可枚举的内部属性（enumerable:false）
 * 
 * 而 ES6 的 class 允许子类继承父类的静态方法和静态属性，
 * 而普通的寄生组合式继承只能做到实例与实例之间的继承，
 * 对于类与类之间的继承需要额外定义方法，
 * 这里使用 Object.setPrototypeOf 将 superType 设置为 subType 的原型，
 * 从而能够从父类中继承静态方法和静态属性
 * 
 * Object.create()方法创建一个新对象，使用现有的对象来提供新创建的对象的__proto__
 * Object.create(proto, propertiesObject) 返回一个新对象，带着指定的原型对象和属性。
 * propertiesObject
 * 可选。需要传入一个对象，该对象的属性类型参照 Object.defineProperties() 的第二个参数。
 * 如果该参数被指定且不为 undefined，该传入对象的自有可枚举属性(即其自身定义的属性，而不是其原型链上的枚举属性)
 * 将为新创建的对象添加指定的属性值和对应的属性描述符。
 * 
 * o = {}; // 以字面量方式创建的空对象就相当于: o = Object.create(Object.prototype);
 */
function inherit(subType, superType) {
  subType.prototype = Object.create(superType.prototype, {
    constructor: {
      enumerable: false,
      configurable: true,
      writable: true,
      value: subType,
    },
  });
  Object.setPrototypeOf(subType, superType);
}
