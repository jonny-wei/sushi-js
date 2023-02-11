/**
 * 手撕 bind
 *
 * function.bind(thisArg, arg1, arg2, ...): function 实现的机制就是 Currying
 *
 * 创建一个新的函数
 * 这个新函数的 this 被指定为 bind() 的第一个参数，而其余参数将作为新函数的参数，供调用时使用。
 * 返回一个原函数的拷贝，并拥有指定的 this 值和初始参数。
 *
 * bind 方法会返回函数的拷贝值，但带有绑定的上下文！ 它不会立即执行
 *
 * bind() 函数会创建一个新的绑定函数（bound function，BF）。
 * 绑定函数是一个 exotic function object（怪异函数对象ES6),它包装了原函数对象
 * 调用绑定函数通常会导致执行包装函数.
 *
 * 模拟思路：（1）改变 this 指向（call()，apply() 即可实现）;（2）返回一个函数；
 * 注意：当 bind 返回的函数作为构造函数的时候，bind 时指定的 this 值会失效，但传入的参数依然生效。
 * 所以重点要处理这个逻辑：
 *
 * 当作为构造函数时，this 指向实例，self 指向绑定函数
 * 当作为普通函数时，this 指向 window，self 指向绑定函数
 *
 * 实现函数的 bind 方法核心是利用 call 绑定 this 指向，同时考虑了一些其他情况，例如
 * bind 返回的函数被 new 调用作为构造函数时，绑定的值会失效并且改为 new 指定的对象。
 * 定义了绑定后函数的 length 属性和 name 属性（不可枚举属性）。
 * 绑定后函数的 prototype 需指向原函数的 prototype
 * （真实情况中绑定后的函数是没有 prototype 的，取而代之在绑定后的函数中有个 内部属性 [[TargetFunction]] 保存原函数，
 * 当将绑定后函数作为构造函数时，将创建的实例的 __proto__ 指向 [[TargetFunction]] 的 prototype，
 * 这里无法模拟内部属性，所以直接声明了一个 prototype 属性）
 */

/**
 * 方法1 （推荐）
 */
Function.prototype.mybind1 = function () {
  if (typeof this !== "function") {
    throw new TypeError(this + "is not a function");
  }
  // 目标对象，this 的指向要指向此对象
  var context = arguments[0] || globalThis;
  // 获取 bind 的函数
  var self = this;
  // 收集参数，bind 的参数是列表，bind 是可以传参的
  var args = Array.prototype.slice.call(arguments, 1); // 获取从第二个参数到最后一个参数

  // 空函数来进行中转
  var fNOP = function () {};
  
  // 需要区分返回的新函数，是作为在构造函数还是普通函数
  var fbound = function () {
    // 当作为构造函数时，this 指向实例，此时结果为 true，将绑定函数的 this 指向该实例
    // 当作为普通函数时，this 指向 window，此时结果为 false，将绑定函数的 this 指向 context
    self.apply(
      this instanceof fNOP ? this : context,
      args.concat(Array.prototype.slice.call(arguments))
    );
  };

  // 当 bind 返回的函数作为构造函数的时候，bind 时指定的 this 值会失效(此时的 this 已经指向了 new 构造函数生成的对象, 而不是我们的目标对象)
  // 通过修改返回的函数的原型来实现
  // 修改返回函数的 prototype 为绑定函数的 prototype，实例就可以继承绑定函数的原型中的值
  fNOP.prototype = this.prototype;

  // 直接将 fBound.prototype = this.prototype，我们直接修改 fBound.prototype 的时候，
  // 也会直接修改绑定函数的 prototype。这个时候，我们可以通过一个空函数来进行中转
  fbound.prototype = new fNOP();

  // 返回一个新函数
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
 * MDN （推荐）
 */
Function.prototype.mybind3 = function (otherThis) {
  if (typeof this !== "function") {
    throw new TypeError(
      "Function.prototype.bind - what is trying to be bound is not callable"
    );
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
 * 测试用例1
 *
 * 创建绑定函数
 *
 * JavaScript 新手经常犯的一个错误是将一个方法从对象中拿出来，
 * 然后再调用，期望方法中的 this 是原来的对象（比如在回调中传入这个方法）。
 * 如果不做特殊处理的话，一般会丢失原来的对象。
 * 基于这个函数，用原始的对象创建一个绑定函数，巧妙地解决了这个问题：
 */
this.x = 9; // 在浏览器中，this 指向全局的 "window" 对象
var module = {
  x: 81,
  getX: function () {
    return this.x;
  },
};

console.log(module.getX()); // 81

var retrieveX = module.getX;
retrieveX();
// 返回 9 - 因为函数是在全局作用域中调用的
// 创建一个新函数，把 'this' 绑定到 module 对象
// 新手可能会将全局变量 x 与 module 的属性 x 混淆
var boundGetX = retrieveX.mybind2(module);
console.log(boundGetX()); // 81

/**
 * 测试用例2
 *
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

/**
 * 补充
 */
const isComplexDataType = (obj) =>
  (typeof obj === "object" || typeof obj === "function") && obj !== null;

const selfBind = function (bindTarget, ...args1) {
  if (typeof this !== "function")
    throw new TypeError("bind must be called on a function");
  const originFunc = this;
  const boundFunc = function (...args2) {
    // 如果是 new 关键字调用返回新对象
    if (new.target) {
      let res = originFunc.call(this, ...args1, ...args2);
      if (isComplexDataType(res)) return res;
      return this;
    } else {
      originFunc.call(bindTarget, ...args1, ...args2);
    }
  };

  if (originFunc.prototype) {
    boundFunc.prototype = originFunc.prototype;
  }

  const desc = Object.getOwnPropertyDescriptors(originFunc);
  Object.defineProperties(boundFunc, {
    length: desc.length,
    name: Object.assign(desc.name, {
      value: `bound ${desc.name.value}`,
    }),
  });

  return boundFunc;
};
