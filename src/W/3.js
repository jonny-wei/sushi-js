// 单例模式
function proxy(func) {
  let instance;
  let handler = {
    construct(target, args) {
      if (!instance) {
        instance = Reflect.construct(target, args);
      }
      return instance;
    },
  };

  return new Proxy(func, handler);
}

const signal = function (fn) {
  let instance;
  return function () {
    return instance || (instance = new (fn.bind(this, ...arguments))());
  };
};
