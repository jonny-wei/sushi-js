/**
 * 手撕 bind
 *
 * function.bind(thisArg, arg1, arg2, ...): function 
 * 
 * 模拟思路：
 * （1）创建一个新的函数 fBound，这个函数将作为 bind 方法的返回值。（bind返回的是一个函数）
 * （2）处理预设参数。改变新函数的 this 指向为第一个参数，而其余参数将作为新函数的参数，供调用时使用。
 * （3）处理构造函数调用：如果新函数作为构造函数被调用，那么 this 应该指向新创建的对象，而不是 bind 方法传入的 this 值。
 * （4）返回新创建的函数 fBound。这个函数在调用时将使用预设的 this 值和参数。
 * 
 * 注意：当 bind 返回的函数作为构造函数的时候，bind 时指定的 this 值会失效(此时的 this 已经指向了 new 构造函数生成的对象, 而不是我们的目标对象。
 *
 */

/**
 * 方法1
 */
Function.prototype.mybind1 = function () {
  if (typeof this !== "function") {
    throw new TypeError(this + " is not a function");
  }
  // 目标对象，新函数的 this 的指向要指向此对象
  var context = arguments[0] || globalThis;
  // 收集参数，bind 的参数是列表，bind 是可以传参的
  var args = Array.prototype.slice.call(arguments, 1); // 获取从第二个参数到最后一个参数
  // 目标函数，获取要绑定的函数（构造函数、普通函数）
  var fToBound = this;
  // 空函数，用来帮助设置 fBound 的原型链
  var fNOP = function () { };
  // 创建一个新的函数 fBound，这个函数将作为 bind 方法的返回值
  var fBound = function () {
    // 当作为构造函数时，this 指向实例，此时结果为 true，将绑定函数的 this 指向该实例
    // 当作为普通函数时，this 指向 window，此时结果为 false，将绑定函数的 this 指向 context
    return fToBound.apply(
      this instanceof fNOP ? this : context,
      args.concat(Array.prototype.slice.call(arguments))
    );
  };

  // 当 bind 返回的函数作为构造函数的时候，bind 时指定的 this 值会失效(此时的 this 已经指向了 new 构造函数生成的对象, 而不是我们的目标对象)
  // 修改返回函数的 prototype 为绑定函数的 prototype，实例就可以继承绑定函数的原型中的值
  fNOP.prototype = this.prototype;
  // 直接将 fBound.prototype = this.prototype，我们直接修改 fBound.prototype 的时候，
  // 也会直接修改绑定函数的 prototype。这个时候，我们可以通过一个空函数来进行中转
  fBound.prototype = Object.create(fNOP.prototype);

  // 设置 fBound 的 prototype 的 constructor 指向 fBound
  fBound.prototype.constructor = fBound;

  // 返回一个新函数
  return fBound;
};

/**
 * 方法2 （推荐）
 */
Function.prototype.mybind2 = function (context, ...args) {
  if (typeof this !== "function") {
    throw new TypeError(this + "is not a function");
  }
  var self = this; // 获取原始函数
  return function F() {
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
    throw new TypeError(
      "Function.prototype.bind - what is trying to be bound is not callable"
    );
  }

  var baseArgs = Array.prototype.slice.call(arguments, 1), // 取bind参数
    baseArgsLength = baseArgs.length,
    fToBind = this,
    fNOP = function () { },
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
var boundGetX = retrieveX.mybind1(module);
console.log(boundGetX()); // 81

/**   综合测试   */
// 测试用例 1: 基本绑定
function testBindBasic() {
  var obj = {
    value: 'example'
  };

  function func() {
    return this.value;
  }

  var boundFunc = func.mybind2(obj);
  console.log('Test 1:', boundFunc()); // 应该输出 'example'
}

// 测试用例 2: 预设参数
function testBindPrepended() {
  function func(a, b) {
    return a + this.value + b;
  }

  var obj = {
    value: 'example'
  };

  var boundFunc = func.mybind1(obj, 'pre-');
  console.log('Test 2:', boundFunc('-post')); // 应该输出 'pre-example-post'
}

// 测试用例 3: 作为构造函数
function testBindNew() {
  function func(value) {
    this.value = value;
  }

  var boundFunc = func.mybind2(null, 'example');
  var obj = new boundFunc();
  console.log('Test 3:', obj.value); // 应该输出 'example'
}

// 测试用例 4: 绑定后的方法作为构造函数
function testBindConstructor() {
  function func() {
    this.value = 'example';
  }

  var boundFunc = func.mybind3();
  var obj = new boundFunc();
  console.log('Test 4:', obj.value); // 应该输出 'example'
}

// 运行测试用例
testBindBasic();
testBindPrepended();
testBindNew();
testBindConstructor();
