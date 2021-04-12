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
 * 子类型构造函数的内部调用父类构造函数以实现对父类构造函数属性的继承。
 * Child 的每个实例都会具有自己的继承与父类构造函数的属性的副本。
 * 函数只不过是在特定环境中执行代码的对象，因此通过使用 apply 和 call 方法也可以在新创建的对象上执行构造函数。
 *
 * 优点：避免了引用类型的属性被所有实例共享；可以在Child中传参
 * 缺点：1. 方法都在构造函数中定义，每次创建实例都会创建一遍方法。
 * (无法实现复用，每个子类都有父类实例函数的副本，影响性能)
 * 2. 只能继承父类实例对象的属性和方法，不能继承原型对象的属性和方法
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
 * 
 * 使用原型链实现对原型对象的属性和方法的继承，而通过借用构造函数来实现对实例属性的继承。
 * 这样，既通过在原型上定义方法实现了函数复用，又能够保证每个实例都有它自己的属性。
 * 
 * 缺点：无论什么情况下，都会调用两次父类构造函数：第一次是在创建子类型原型的时候，
 * 另一次是在子类型构造函数内部。子类型对象最终会包含父类型对象的全部实例属性，
 * 但不得不在调用子类型构造函数时重写这些属性。
 */
// function Parent(name) {
//   this.name = name;
//   this.colors = ["red", "blue", "green"];
// }
// Parent.prototype.getName = function () {
//   return this.name
// };
// function Child(name, age) {
  // 第二次调用 Parent()
  // Child.prototype 又得到了 name 和 attr 两个属性
  // 并对上次得到的属性值进行了覆盖
//   Parent.call(this, name); // 借用构造函数
//   this.age = age;
// }
// 第一次调用 Parent()
// 使得子类实例的原型对象指向父类实例对象
// Child.prototype 得到了 name 和 attr 两个属性
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
 * 
 * 
 * Object.create()方法创建一个新对象，使用现有的对象来提供新创建的对象的__proto__
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