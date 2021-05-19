/**
 * 发布订阅 EventEmitter
 *
 * 通过 on 方法注册事件，trigger 方法触发事件，来达到事件之间的松散解耦，
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

/**
 * 方法二
 *
 * Map 实现
 */

class Observer {
  static events = new Map();

  static on(name, fn) {
    this.events.set(name, { isOnce: false, fn });
  }

  static once(name, fn) {
    this.events.set(name, { isOnce: true, fn });
  }

  static off(name) {
    this.events.delete(name);
  }

  static emit(name, data) {
    let cache = this.events.get(name);
    if (cache) {
      if (cache.isOnce) this.events.delete(name);
      cache.fn(data);
    }
  }
}

// vue 中自定义事件的实现
// 参照 vue 源码实现
var EventEmiter = function () {
  this._events = {};
};
EventEmiter.prototype.on = function (event, cb) {
  if (Array.isArray(event)) {
    for (let i = 0, l = event.length; i < l; i++) {
      this.on(event[i], cb);
    }
  } else {
    (this._events[event] || (this._events[event] = [])).push(cb);
  }
  return this;
};
EventEmiter.prototype.once = function (event, cb) {
  function on() {
    this.off(event, cb);
    cb.apply(this, arguments);
  }
  on.fn = cb;
  this.on(event, on);
  return this;
};
EventEmiter.prototype.off = function (event, cb) {
  if (!arguments.length) {
    this._events = Object.create(null);
    return this;
  }
  if (Array.isArray(event)) {
    for (let i = 0, l = event.length; i < l; i++) {
      this.off(event[i], cb);
    }
    return this;
  }
  if (!cb) {
    this._events[event] = null;
    return this;
  }
  if (cb) {
    let cbs = this._events[event];
    let i = cbs.length;
    while (i--) {
      if (cb === cbs[i] || cb === cbs[i].fn) {
        cbs.splice(i, 1);
        break;
      }
    }
    return this;
  }
};
EventEmiter.prototype.emit = function (event) {
  let cbs = this._events[event];
  let args = Array.prototype.slice.call(arguments, 1);
  if (cbs) {
    for (let i = 0, l = cbs.length; i < l; i++) {
      cbs[i].apply(this, args);
    }
  }
};
