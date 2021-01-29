/**
 * 单例模式
 *
 * 通过 ES6 的 Proxy 拦截构造函数的执行方法来实现的单例模式
 */
function proxy(func) {
  let instance;
  let handler = {
    construct(target, args) {
      if (!instance) {
        instance = Reflect.construct(func, args);
      }
      return instance;
    },
  };

  return new Proxy(func, handler);
}
