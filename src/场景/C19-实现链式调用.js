/**
 * 链式调用
 *
 * 类似 compose 和 pipe 函数
 * 链式调用的核心就在于调用完的方法将自身实例返回
 */

/**
 * 示例一
 */
function Class1() {
  console.log("初始化");
}
Class1.prototype.method = function (param) {
  console.log(param);
  return this;
};
let cl = new Class1();
//由于new 在实例化的时候this会指向创建的对象， 所以this.method这个方法会在原型链中找到。
cl.method("第一次调用").method("第二次链式调用").method("第三次链式调用");

/**
 * 示例二
 *
 */
class Person {
  handle() {
    console.log("先洗手");
    return this;
  }
  eat() {
    console.log("在吃饭");
    return this;
  }
  drink() {
    console.log("去喝水");
    return this;
  }
  say() {
    console.log("聊聊天");
  }
}
const person = new Person();
person.handle().eat().drink().say();

/**
 * 示例三
 */
var pipe = function (value) {
  let stack = [];
  let proxy = new Proxy(
    {},
    {
      get(target, prop, receiver) {
        if (prop === "get") {
          return stack.reduce((x, fn) => {
            return fn(x);
          }, value);
        }
        stack.push(window[prop]);
        // 关键
        return proxy;
      },
    }
  );
  return proxy;
};

var double = (n) => n * 2;
var pow = (n) => n * n;
var reverseInt = (n) => n.toString().split("").reverse().join("") | 0;

pipe(3).double.pow.reverseInt.get; // 63


