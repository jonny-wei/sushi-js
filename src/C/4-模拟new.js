/**
 * 模拟 new
 * 
 * new 运算符创建一个用户定义的对象类型的实例或具有构造函数的内置对象类型之一
 * 
 * 访问到 Otaku 构造函数里的属性
 * 访问到 Otaku.prototype 中的原型对象上的属性
 *
 * let obj = new Object();
 * 
 * 因为 new 的结果是一个新对象，所以在模拟实现的时候，我们也要建立一个新对象，这个新对象可以
 * 访问到构造函数中的属性。根据原型与原型链，我们知道实例的 __proto__ 属性会指向构造函数的 prototype，
 * 也正是因为建立起这样的关系，实例可以访问原型上的属性。
 * 
 * new 一个对象发生了什么？
 * （1）创建一个简单的对象（创建一个新的对象）
 * （2）设置这个简单对象的原型为构造函数的原型（设置对象的原型属性）
 * （3）执行构造函数，设置构造函数的this指向为新创建简单对象，执行构造函数中定义的行为。（确定 this 指向）
 * （4）如果构造函数没有返回值或者返回值是值类型，丢弃，则new的最终结果是新创建的对象，
 * 如果构造函数的返回结果是一个引用类型对象，那么new的最终结果是构造函数的返回结果。（返回创建的对象）
 */
/**
 * 方法一 （推荐）
 * 
 * 工厂方法实现 new
 * objectFactory(constructor, ...restParams)
 */
function myNew1() {
  // 创建一个新对象 从 Object.prototype 上克隆一个对象
  let obj = new Object();
  // 取出第一个参数，就是我们要传入的构造函数。此外因为 shift 会修改原数组，所以 arguments 会被去除第一个参数
  // 使 new 出的对象 可以访问构造函数及其原型对象上的的属性和方法
  // 取出构造函数，从 arguments 对象 中取出第一个参数即为构造函数
  let con = Array.prototype.shift.call(arguments);
  // 将 obj 的原型指向构造函数，这样 obj 就可以访问到构造函数原型中的属性
  // 将 new 出的对象原型 指向 构造函数的原型对象 这样 obj 就可以访问到构造函数原型中的属性
  // 执行构造函数，并改变 new 出的对象的 this， 这样 obj 就可以访问到构造函数中的属性
  // 区别：
  // 一个能访问的构造函数原型上的属性和方法 - 原型链
  // 一个能访问到构造函数本身上的属性和方法 - 借助 apply 改变 this 指向
  obj.__proto__ = con.prototype; 
  // 绑定this，执行构造函数，使用 apply 借用构造函数，改变构造函数 this 的指向到新建的对象，这样 obj 就可以访问到构造函数中的属性
  // 执行并返回结果，arguments 数组经过上面 shift 的处理已经只剩下参数了，shift 可改变原数组 arguments
  let result = con.apply(obj, arguments);
  // 确保 new 出来的是个对象
  // 如果构造函数返回值是引用类型，则返回构造函数的返回值。构造函数返回了一个对象，在实例 中只能访问返回的对象中的属性
  // 如果构造函数的返回值是基本类型，则返回新创建的对象。尽管有返回值，但是相当于没有返回值进行处理。
  // 所以我们还需要判断返回的值是不是一个对象，如果是一个对象，我们就返回这个对象，如果没有，我们该返回什么就返回什么
  // 返回值处理
  // 当构造函数的返回值是基本类型时，不做处理，返回obj
  // 当构造函数的返回值是引用类型时，返回结果
  return typeof result === "object" ? result : obj;
}


/**
 * 方法二
 * 
 * Object.create(proto: object, propertiesObject ?: object): object
 * 方法创建一个新对象，使用现有的对象来提供新创建的对象的__proto__。
 * 返回值：一个新对象，带着指定的原型对象和属性。
 */
const isComplexDataType = (obj) =>
  (typeof obj === "object" || typeof obj === "function") && obj !== null;

function myNew2(myConstructor, ...args) {
  // 创建一个对象，并将 obj.__proto__ 指向构造函数的原型 myConstructor.prototype
  const obj = Object.create(myConstructor.prototype); 
  const result = myConstructor.apply(obj, args);
  return isComplexDataType(result) ? result : obj;
}


/**
 * 方法三
 * @param {} constructor 
 * @param  {...any} restParams 
 * @returns 
 */
function myNew3(constructor, ...restParams) {
  // 创建空对象，空对象关联构造函数的原型对象
  const instance = Object.create(constructor.prototype);
  // 执行对象类的构造函数，同时该实例的属性和方法被 this 所引用，即 this 指向新构造的实例
  const result = constructor.apply(instance, restParams);
  // 判断构造函数的运行结果是否对象类型
  return (typeof result === 'object' && result) || instance;
}

// 测试用例1
function Otaku(name, age) {
  this.name = name;
  this.age = age;
  this.habit = "Games";
}
Otaku.prototype.strength = 60;
Otaku.prototype.sayYourName = function () {
  console.log("I am " + this.name);
};

var person = myNew1(Otaku, "Kevin", "18");

console.log(person.name); // Kevin
console.log(person.habit); // Games
console.log(person.strength); // 60
person.sayYourName(); // I am Kevin
