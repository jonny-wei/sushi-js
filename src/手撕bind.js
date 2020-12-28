/**
 * 手撕 bind
 * function.bind(thisArg, arg1, arg2, ...): function
 *
 * 创建一个新的函数
 * 这个新函数的 this 被指定为 bind() 的第一个参数，而其余参数将作为新函数的参数，供调用时使用。
 * 返回一个原函数的拷贝，并拥有指定的 this 值和初始参数。
 *
 * bind() 函数会创建一个新的绑定函数（bound function，BF）。
 * 绑定函数是一个 exotic function object（怪异函数对象ES6),它包装了原函数对象
 * 调用绑定函数通常会导致执行包装函数.
 *
 * 模拟思路：（1）改变this指向（call()，apply() 即可实现）;（2）返回一个函数；
 * 注意：当 bind 返回的函数作为构造函数的时候，bind 时指定的 this 值会失效，但传入的参数依然生效。所以重点要处理这个逻辑：
 */

/**
 * 方法1
 */
Function.prototype.mybind1 = function () {
  if (typeof this !== "function") {
    throw new TypeError(this + "is not a function");
  }
  var context = arguments[0] || globalThis;
  var self = this;
  var args = Array.prototype.slice.call(arguments, 1); // 获取从第二个参数到最后一个参数
  var fNOP = function () {};
  var fbound = function () {
    self.apply(
      this instanceof self ? this : context,
      args.concat(Array.prototype.slice.call(arguments))
    );
  };
  fNOP.prototype = this.prototype;
  fbound.prototype = new fNOP();
  return fbound;
};

/**
 * 方法2
 */
Function.prototype.mybind2 = function (context, ...args) {
  if (typeof this !== "function") {
    throw new TypeError(this + "is not a function");
  }
  var self = this;
  return function F() {
    // 考虑new的情况
    if (this instanceof F) {
      return new self(...args, ...arguments);
    }
    return self.apply(context, [...args, ...arguments]);
  };
};

/**
 * MDN
 */
Function.prototype.mybind3 = function (otherThis) {
  if (typeof this !== "function") {
    throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
  }

  var baseArgs = Array.prototype.slice.call(arguments, 1), // 取bind参数
    baseArgsLength = baseArgs.length,
    fToBind = this,
    fNOP = function () {},
    fBound = function () {
      baseArgs.length = baseArgsLength; // reset to default base arguments
      baseArgs.push.apply(baseArgs, arguments);
      return fToBind.apply(
        fNOP.prototype.isPrototypeOf(this) ? this : otherThis,
        baseArgs
      ); // fNOP.prototype.isPrototypeOf(this) 同instanceof的实现检查原型链 类型是否相同
    };

  if (this.prototype) {
    fNOP.prototype = this.prototype;
  }
  fBound.prototype = new fNOP();

  return fBound;
};

/**
 * 创建绑定函数
 *
 * JavaScript新手经常犯的一个错误是将一个方法从对象中拿出来，
 * 然后再调用，期望方法中的 this 是原来的对象（比如在回调中传入这个方法）。
 * 如果不做特殊处理的话，一般会丢失原来的对象。
 * 基于这个函数，用原始的对象创建一个绑定函数，巧妙地解决了这个问题：
 */
// this.x = 9; // 在浏览器中，this 指向全局的 "window" 对象
// var module = {
//   x: 81,
//   getX: function () {
//     return this.x;
//   },
// };

// console.log(module.getX())// 81

// var retrieveX = module.getX;
// retrieveX();
// // 返回 9 - 因为函数是在全局作用域中调用的
// // 创建一个新函数，把 'this' 绑定到 module 对象
// // 新手可能会将全局变量 x 与 module 的属性 x 混淆
// var boundGetX = retrieveX.mybind2(module);
// console.log(boundGetX()) // 81

/**
 * setTimeout
 */
function LateBloomer() {
  this.petalCount = Math.ceil(Math.random() * 12) + 1;
}

// 在 1 秒钟后声明 bloom
LateBloomer.prototype.bloom = function () {
  window.setTimeout(this.declare.mybind2(this), 1000);
};

LateBloomer.prototype.declare = function () {
  console.log("I am a beautiful flower with " + this.petalCount + " petals!");
};

var flower = new LateBloomer();
flower.bloom(); // 一秒钟后, 调用 'declare' 方法

function fn(name, age) {
  this.test = "测试数据";
}
fn.prototype.protoData = "原型数据";
let fnBound = fn.mybind2(this, "王大锤", 18);
let newBind = new fnBound();
console.log(newBind.protoData); // "原型数据"
