/**
 * 模拟 new
 *
 * let obj = new Object();
 * new 一个对象发生了什么？
 * （1）创建一个简单的对象（创建一个新的对象）
 * （2）设置这个简单对象的原型为构造函数的原型（设置对象的原型属性）
 * （3）执行构造函数，设置构造函数的this指向为新创建简单对象，执行构造函数中定义的行为。（确定 this 指向）
 * （4）如果构造函数没有返回值或者返回值是值类型，丢弃，则new的最终结果是新创建的对象，
 * 如果构造函数的返回结果是一个引用类型对象，那么new的最终结果是构造函数的返回结果。（返回创建的对象）
 */
/**
 * 方法一
 */
function mynew1() {
  let obj = new Object(); // 创建一个对象
  let con = [].shift.call(arguments); // 获得构造函数
  obj.__proto__ = con.prototype; // 链接原型 设置对象的原型属性
  // 绑定this，执行构造函数，使用 apply 借用构造函数，并指定构造函数中的 this 为新创建的对象，达到继承的目的
  let result = con.apply(obj, arguments);
  // 确保new出来的是个对象 1）如果构造函数返回值是引用类型，则返回构造函数的返回值。2）如果构造函数的返回值是基本类型，则返回新创建的对象。
  return typeof result === "object" ? result : obj;
}
/**
 * 方法二
 * Object.create(proto: object, propertiesObject ?: object): object
 * 方法创建一个新对象，使用现有的对象来提供新创建的对象的__proto__。
 * 返回值：一个新对象，带着指定的原型对象和属性。
 */
const isComplexDataType = (obj) =>
  (typeof obj === "object" || typeof obj === "function") && obj !== null;

function mynew2(myConstructor, ...args) {
  const obj = Object.create(myConstructor.prototype); // 创建一个对象，并将 obj.__proto__指向构造函数的原型myConstructor.prototype
  const result = myConstructor.apply(obj, args);
  return isComplexDataType(result) ? result : obj;
}


function objectFactory(constructor, ...restParams) {
  // 创建空对象，空对象关联构造函数的原型对象
  const instance = Object.create(constructor.prototype);
  // 执行对象类的构造函数，同时该实例的属性和方法被 this 所引用，即 this 指向新构造的实例
  const result = constructor.call(instance, restParams);
  // 判断构造函数的运行结果是否对象类型
  return (typeof result === 'object' && result) || instance;
}

// 测试
function Otaku(name, age) {
  this.name = name;
  this.age = age;
  this.habit = "Games";
}
Otaku.prototype.strength = 60;
Otaku.prototype.sayYourName = function () {
  console.log("I am " + this.name);
};

var person = mynew2(Otaku, "Kevin", "18");

console.log(person.name); // Kevin
console.log(person.habit); // Games
console.log(person.strength); // 60
person.sayYourName(); // I am Kevin
