/**
 * 发布订阅 EventEmitter
 *
 * 通过 on 方法注册事件，emit 方法触发事件，来达到事件之间的松散解耦，
 * 并且额外添加了 once 和 off 辅助函数用于注册只触发一次的事件以及注销事件
 *
 * 同一个事件 event 有多个回调，event 是一个回调任务队列
 * 注册 event 时先判断回调任务队列this.subs[event]是否有数据
 * 为空，置为[]；否则找到对应的event将cb压入该event回调任务队列
 *
 * 触发时循环执行event回调任务队列中的所有cb回调
 */
class EventEmitter {
  constructor() {
    this.events = new Map();
  }

  // 注册事件监听器
  on(eventName, listener) {
    if (!this.events.has(eventName)) {
      this.events.set(eventName, []);
    }
    this.events.get(eventName).push(listener);
  }

  // 移除事件监听器
  off(eventName, listener) {
    if (!this.events.has(eventName)) {
      return;
    }
    const listeners = this.events.get(eventName);
    const index = listeners.indexOf(listener);
    if (index !== -1) {
      listeners.splice(index, 1);
    }
  }

  // 触发事件
  emit(eventName, ...args) {
    if (!this.events.has(eventName)) {
      return;
    }
    const listeners = this.events.get(eventName);
    listeners.forEach(listener => listener(...args));
  }

  // 一次性监听事件
  once(eventName, listener) {
    const wrappedListener = (...args) => {
      listener(...args);
      this.off(eventName, wrappedListener);
    };
    this.on(eventName, wrappedListener);
  }
}

// 使用示例
const eventEmitter = new EventEmitter();

// 注册事件监听器
eventEmitter.on('greet', (name) => {
  console.log(`Hello, ${name}!`);
});

eventEmitter.on('greet', (name) => {
  console.log(`Hi, ${name}!`);
});

// 触发事件
eventEmitter.emit('greet', 'Alice');

// 一次性监听事件
eventEmitter.once('welcome', (name) => {
  console.log(`Welcome, ${name}!`);
});

eventEmitter.emit('welcome', 'Bob');
eventEmitter.emit('welcome', 'Charlie'); // 这次不会触发，因为是一次性的

// 移除事件监听器
eventEmitter.off('greet', (name) => {
  console.log(`Hi, ${name}!`);
});

// 再次触发事件
eventEmitter.emit('greet', 'David');
