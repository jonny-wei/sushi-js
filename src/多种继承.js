/**
 * 继承的多种方式和优缺点
 * 
 * 推荐 方式三 组合继承 和 方式六 寄生组合式继承
 */

/**
 * 方式一 原型链继承
 *
 * 缺点：
 * （1）引用类型的属性被所有实例共享
 * （2）创建Child的实例时，不能向Parent传参
 */
// function Parent(){
//     this.name = 'kevin';
// }
// Parent.prototype.getName = function(){
//     return this.name
// }
// function Child(){}

// Child.prototype = new Parent(); // 原型链继承
// let child = new Child();
// console.log('1.原型链继承 ->',child.getName())

/**
 * 方式二 借用构造函数(经典继承)
 *
 * 优点：避免了引用类型的属性被所有实例共享；可以在Child中传参
 * 缺点：方法都在构造函数中定义，每次创建实例都会创建一遍方法
 */
// function Parent(){
//     this.names = ['kevin','dasiy'];
// }
// function Child(){
//     Parent.call(this) //借用构造函数
// }
// let child = new Child();
// child.names.push('jonny wei')
// console.log('2.借用构造函数 ->',child.names)

/**
 * 方式三 组合继承
 *
 * 原型链 + 借用构造函数
 * javascript中最常见的继承方式
 */
// function Parent(name) {
//   this.name = name;
//   this.colors = ["red", "blue", "green"];
// }
// Parent.prototype.getName = function () {
//   return this.name
// };
// function Child(name, age) {
//   Parent.call(this, name); // 借用构造函数
//   this.age = age;
// }
// Child.prototype = new Parent();
// Child.prototype.constructor = Child;
// let child = new Child('jonny wei', 20)
// console.log('3.组合继承 ->',child.name)

/**
 * 方式四 原型式继承
 *
 * Object.create()的模拟实现，将传入的对象作为创建的对象的原型
 *
 * 缺点：和原型链继承一样，包含引用类型的属性值都会共享相应的值
 */
// function createObj(a) {
//   function F() {}
//   F.prototype = a;
//   return new F();
// }

/**
 * 方式五 寄生式继承
 *
 * 创建一个仅仅用于封装继承过程的函数，
 * 该函数在内部以某种方式来做增强对象，最后返回对象
 *
 * 缺点：和借用构造函数一样，每次创建对象否会创建一遍方法
 */
// function createObj(obj) {
//   let clone = Object.create(obj);
//   clone.sayName = function () {
//     console.log("hi");
//   };
//   return clone;
// }

/**
 * 方式六 寄生组合式继承
 * 
 * 只调用一次 Parent 的构造函数，因此避免了在Parent.prototype 上面创建不必要的，多余的属性或方法
 * 与此同时，原型链还能保持不变；因此能够正常的使用 instanceof 和 isPrototypeOf
 * 
 * 寄生组合式继承时引用类型最理想的继承方式
 */
// function object(obj) {
//   function F() {}
//   F.prototype = obj;
//   return new F();
// }
// function prototype(Child, Parent) {
//   let prototype = object(Parent.prototype); // 也即 Object.create(parent.prototype)（1）
//   prototype.constructor = Child;（2）
//   Child.prototype = prototype;（3）
// }
// prototype(Child,Parent) // 使用
function Parent() {
  this.name = 'parent';
}
function Child() {
  Parent.call(this); // 借用构造函数
  this.type = 'children';
}
Child.prototype = Object.create(Parent.prototype); // （1）（3）
Child.prototype.constructor = Child; // （2）