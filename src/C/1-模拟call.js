/**
 * 手撕 call
 *
 * 使用一个指定的 this 值和若干个指定的参数值的前提下调用某个函数或方法，改变this的指向并传递若干参数。
 *
 * function.call(thisArg, arg1, arg2, ...)
 *
 * 该方法的语法和作用与 apply() 方法类似，只有一个区别，就是 call() 方法接受的是一个参数列表，
 * 而 apply() 方法接受的是一个包含多个参数的数组。
 *
 * 模拟思路：(1) 将函数设为对象的属性；(2) 执行该函数；(3) 删除该函数；
 *
 * 原理就是将函数作为传入的上下文参数（context）的临时属性，改变其作用域，
 * 然后执行并返回结果，最后删除此临时属性指向的函数。
 *
 */

/**
 * 方法1
 */
Function.prototype.mycall1 = function () {
  if (typeof this !== "function") {
    throw new TypeError(this + " is not a function");
  }
  // 获取调用 call 的函数，将其设为目标对象的属性，改变其作用域，但最后要删除这个临时属性
  let context = arguments[0] || globalThis;
  context.fn = this;
  // 入参不定长，收集参数，从 Arguments 对象中取值，取出第二个到最后一个参数，然后放到一个数组里
  const args = [];
  for (let i = 1; i < arguments.length; i++) {
    args.push("arguments[" + i + "]"); // args.push(`arguments[${i}]`);
  }
  // 用 eval 执行，并返回函数执行结果
  const result = eval("context.fn(" + args + ")"); //  eval(`context.fn(${args})`)
  // 删除临时属性
  delete context.fn;

  return result;
};

/**
 * 方法2 (推荐)
 *
 * 这里为了防止属性冲突使用了 ES6 的 Symbol 类型，但 call 是 ES3 的函数。
 * thisArg[fn] = this --->  thisArg[fn](...args) ---> delete thisArg[fn]
 */
Function.prototype.mycall2 = function (thisArg, ...args) {
  if (typeof this !== "function") {
    throw new TypeError(this + " is not a function");
  }
  let context = thisArg || globalThis;
  const fn = Symbol("fn");
  context[fn] = this;
  const result = context[fn](...args);
  delete context[fn];
  return result;
};

/**
 * 测试用例1
 * 使用 call 调用父构造函数实现继承
 */
function Product(name, price) {
  this.name = name;
  this.price = price;
}

function Food(name, price) {
  Product.mycall1(this, name, price);
  this.category = "food";
}

function Toy(name, price) {
  Product.mycall2(this, name, price);
  this.category = "Toy";
}

const food = new Food("feta", 5);
const toy = new Toy("robot", 40);
console.log("手撕call, 使用call调用父构造函数实现继承 ->", food, toy);

/**
 * 测试用例2
 *
 * 严格模式下 this === undefined 需要根据不同js编译器指定默认值
 */
var sData = "Wisen";
function display() {
  console.log("sData value is %s ", this.sData);
}
display.mycall1(); // sData value is Wisen
display.mycall2(); // sData value is Wisen
