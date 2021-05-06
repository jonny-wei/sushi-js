/**
 * 单例模式
 *
 * 通过 ES6 的 Proxy 拦截构造函数的执行方法来实现的单例模式
 *
 * 单例模式 (Singleton) 的实现在于保证一个特定类只有一个实例，
 * 第二次使用同一个类创建新对象的时候，应该得到与第一次创建对象完全相同的对象。
 *
 * 单例模式的核心是确保只有一个实例，并提供全局访问
 * 在JavaScript可以通过直接创建一个对象来实现单例模式
 * 可以用闭包的方式实现私有变量
 *
 * 单例模式用到了闭包和高阶函数的特性。
 * 单例模式是简单但常用到的模式，比如单页应用、websocket连接等等。
 * 特别是惰性单例模式，用到时才创建，再次用到是不需要再次创建。
 * 创建对象和管理单例的职责分布在不同的方法中，方便扩展和管理。
 *
 * 实现：
 * 将构造方法私有化，杜用构造器创建实例。
 * 需要自身创建唯一的一个实例，并提供一个全局访问入口
 *
 * 方式一：
 * 静态属性中的实例(传统的单例模式的实现)
 * 在构造函数的静态属性中缓存该实例(将this作为构造函数静态属性)，缺点在于 instance 属性是公开可访问的属性，在外部代码中可能会修改该属性。
 *
 * 方式二：
 * 闭包中的实例
 * 可以把实例封装在闭包中，这样可以保证该实例的私有性并且保证该实例不会在构造函数之外被修改，代价是带来了额外的闭包开销。
 * 当第一次调用构造函数时，它正常返回 this ，然后在以后调用时，它将会执行重写构造函数，
 * 这个构造函数通过闭包访问了私有 instance 变量，并且简单的返回了该 instance。
 *
 * 方式三：
 * 惰性单例(惰性单例是指在需要的时候才创建)
 * 有时候对于单例对象需要延迟创建，所以在单例中还存在一种延迟创建的形式，也有人称之为惰性创建。
 *
 * 方式四：
 * proxy 拦截代理
 * const proxy = new Proxy(target, handler);
 * handler.construct() 方法主要用于拦截 new 运算命令。
 * const proxy = new Proxy(target, {
 *    construct: function(target, property) {
 *        // do something
 *    }
 * });
 * Reflect.construct	对构造函数进行 new 操作，相当于执行 new target(...args)
 */
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

// 闭包实现
const getSingleton = function (fn) {
  let instance;
  return function () {
    return instance || (instance = new (fn.bind(this, ...arguments))());
  };
};
