/**
 * 发布订阅 EventEmitter
 *
 * 通过 on 方法注册事件，trigger 方法触发事件，来达到事件之间的松散解耦，
 * 并且额外添加了 once 和 off 辅助函数用于注册只触发一次的事件以及注销事件
 */
class EventEmitter {
  constructor() {
    this.subs = {};
  }

  on(event, cb) {
    (this.subs[event] || (this.subs[event] = [])).push(cb);
  }

  trigger(event, ...args) {
    this.subs[event] &&
      this.subs[event].forEach((cb) => {
        cb(...args);
      });
  }

  once(event, oncecb) {
    const cb = (...args) => {
      oncecb(...args);
      this.off(event, oncecb);
    };
    this.on(event, cb);
  }

  off(event, offcb) {
    if (this.subs[event]) {
      let index = this.subs[event].findIndex((cb) => cb === offcb);
      this.subs[event].splice(index, 1);
      if (!this.subs[event].length) delete this.subs[event];
    }
  }
}
