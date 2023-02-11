/**
 * 模拟函数重载
 *
 * 利用闭包 类似函数柯里化
 */

function addMethod(object, name, callback) {
  let old = object[name]; // 保存前一个值
  // 向 object[name] 赋值一个代理函数
  object[name] = function () {
    if (callback.length === arguments.length) {
      return callback.apply(this, arguments);
    } else if (typeof old === "function") {
      return old.apply(this, arguments);
    }
  };
}
// 测试
let methods = {};
addMethod(methods, "add", () => 0);
addMethod(methods, "add", (a, b) => a + b);
addMethod(methods, "add", (a, b, c) => a + b + c);
console.log(methods.add(), methods.add(10, 20), methods.add(10, 20, 30));
