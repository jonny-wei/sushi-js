/**
 * 继承的多种方式和优缺点
 *
 * 推荐 方式三 组合继承 和 方式六 寄生组合式继承
 *
 *
 * ES5 与 ES6 的继承
 *
 * ES5 通过原型链实现原型属性的继承，通过构造函数实现实例属性的继承。
 * ES5 的类继承：子类是无法继承父类的静态属性和静态方法的，只是通过传递
 * 其中有个需要注意的地方：静态方法没办法获取到this,由于JavaScript中的类也是一个对象，
 * 静态方法相当于是这个类对象的一个属性方法，但是this指的是当前实例对象而不是类对象，所以是无法取到的
 *
 * ES6 中的静态方法和静态属性都可以被继承下来的，只是静态属性的继承需要稍作处理，否则就被共享了
 *
 * es5 和 es6 实现继承的方式是不同的，前者通过原型链实现对父类原型方法、原型属性的继承，
 * 通过构造函数的调用实现对实例方法，实例属性的调用，后者通过 extends 关键字实现继承
 * es5 中静态方法、静态属性是无法通过继承下来的，只能通过赋值传递，但 es6 中则是可以的
 *
 * https://juejin.cn/post/6844903825241800717
 */

/**
 * 方式一 原型链继承
 *
 * 缺点：
 * （1）引用类型的属性被所有实例共享
 * （2）创建Child的实例时，不能向Parent传参
 */
function Parent() {
  this.name = "kevin";
}
Parent.prototype.getName = function () {
  return this.name;
};
function Child() {}
Child.prototype = new Parent(); // 原型链继承
let child = new Child();
console.log("1.原型链继承 ->", child.getName());

// 测试用例1
function Parent() {
  this.names = ["kevin", "daisy"];
}

function Child() {}

Child.prototype = new Parent();

var child1 = new Child();

child1.names.push("yayu");

console.log(child1.names); // ["kevin", "daisy", "yayu"]

var child2 = new Child();

console.log(child2.names); // ["kevin", "daisy", "yayu"]

/**
 * 方式二 借用构造函数(经典继承)
 *
 * 子类型构造函数的内部调用父类构造函数以实现对父类构造函数属性的继承。
 * Child 的每个实例都会具有自己的继承与父类构造函数的属性的副本。
 * 函数只不过是在特定环境中执行代码的对象，因此通过使用 apply 和 call 方法也可以在新创建的对象上执行构造函数。
 *
 * 优点：避免了引用类型的属性被所有实例共享；可以在Child中传参
 * 缺点：
 * 1. 方法都在构造函数中定义，每次创建实例都会创建一遍方法。
 * (无法实现复用，每个子类都有父类实例函数的副本，影响性能)
 * 2. 只能继承父类实例对象的属性和方法，不能继承原型对象的属性和方法
 */
function Parent() {
  this.names = ["kevin", "dasiy"];
}
function Child() {
  Parent.call(this); //借用构造函数
}
let child2 = new Child();
child2.names.push("jonny wei");
console.log("2.借用构造函数 ->", child2.names);

/**
 * 方式三 组合继承(推荐)
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
function Parent(name) {
  this.name = name;
  this.colors = ["red", "blue", "green"];
}
Parent.prototype.getName = function () {
  return this.name;
};
function Child(name, age) {
  // 第二次调用 Parent()
  // Child.prototype 又得到了 name 和 attr 两个属性
  // 并对上次得到的属性值进行了覆盖
  Parent.call(this, name); // 借用构造函数
  this.age = age;
}
// 第一次调用 Parent()
// 使得子类实例的原型对象指向父类实例对象
// Child.prototype 得到了 name 和 attr 两个属性
Child.prototype = new Parent();
Child.prototype.constructor = Child;
let child3 = new Child("jonny wei", 20);
console.log("3.组合继承 ->", child3.name);

/**
 * 方式四 原型式继承
 *
 * Object.create()的模拟实现，将传入的对象作为创建的对象的原型
 *
 * 缺点：和原型链继承一样，包含引用类型的属性值都会共享相应的值
 */
function createObj(a) {
  function F() {}
  F.prototype = a;
  return new F();
}
// 测试用例4
var person = {
  name: "kevin",
  friends: ["daisy", "kelly"],
};

var person1 = createObj(person);
var person2 = createObj(person);

person1.name = "person1";
console.log(person2.name); // kevin

person1.friends.push("taylor");
console.log(person2.friends); // ["daisy", "kelly", "taylor"]

/**
 * 方式五 寄生式继承
 *
 * 创建一个仅仅用于封装继承过程的函数，
 * 该函数在内部以某种方式来做增强对象，最后返回对象
 *
 * 缺点：和借用构造函数一样，每次创建对象否会创建一遍方法
 */
function createObj(obj) {
  let clone = Object.create(obj);
  clone.sayName = function () {
    console.log("hi");
  };
  return clone;
}

/**
 * 方式六 寄生组合式继承
 *
 * 只调用一次 Parent 的构造函数，因此避免了在Parent.prototype 上面创建不必要的，多余的属性或方法
 * 与此同时，原型链还能保持不变；因此能够正常的使用 instanceof 和 isPrototypeOf
 *
 * 寄生组合式继承时引用类型最理想的继承方式。这种方式的高效率体现它只调用了一次 Parent 构造函数，
 * 并且因此避免了在 Parent.prototype 上面创建不必要的、多余的属性。
 * 与此同时，原型链还能保持不变；因此，还能够正常使用 instanceof 和 isPrototypeOf。
 * 开发人员普遍认为寄生组合式继承是引用类型最理想的继承范式。
 *
 *
 * Object.create()方法创建一个新对象，使用现有的对象来提供新创建的对象的__proto__
 */
function object(o) {
  function F() {}
  F.prototype = o;
  return new F();
}

function prototype(child, parent) {
  var prototype = object(parent.prototype);
  prototype.constructor = child;
  child.prototype = prototype;
}

// 当我们使用的时候：
prototype(Child, Parent);

function Parent() {
  this.name = "parent";
}
function Child() {
  Parent.call(this); // 借用构造函数
  this.type = "children";
}
Child.prototype = Object.create(Parent.prototype); // （1）（3）
Child.prototype.constructor = Child; // （2）
