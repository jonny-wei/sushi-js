/**
 * events：事件注册中心 events = [{eventName: '', listeners: []},{}]
 * MyEvent：一个实例一组同类(eventName)事件的回调任务队列(listeners)
 * eventName：回调函数名(类型)
 * listeners：回调队列
 */

const events = [];

function on(eventName, callback) {
  let event = events.find((x) => x.eventName === eventName);
  if (event) {
    // 如果已有该事件，添加到监听者中
    event.addListener(callback);
  } else {
    // 如果没有该事件，则添加新事件，并添加到监听者
    event = new MyEvent(eventName);
    event.addListener(callback);
    events.push(event);
  }
}

function emit(eventName, ...params) {
  let event = events.find((x) => x.eventName === eventName);
  // 如果已有该事件，则触发
  if (event) {
    event.trigger(...params);
  }
}

class MyEvent {
  constructor(eventName) {
    // 创建一个事件，传入事件名
    this.eventName = eventName;
    // 同时动态生成一个监听者管理
    this.listeners = [];
  }
  // 触发事件，传入参数
  trigger(...params) {
    // 遍历监听者，触发回调
    this.listeners.forEach((x) => {
      x(...params);
    });
  }
  // 添加监听者
  addListener(callback) {
    this.listeners.push(callback);
  }
}
export default {
  on,
  emit,
};

// 方法二

class EventEmeitter {
  constructor() {
    this._events = this._events || new Map(); // 储存事件/回调键值对
    this._maxListeners = this._maxListeners || 10; // 设立监听上限
  }
}

// 触发名为type的事件
EventEmeitter.prototype.emit = function (type, ...args) {
  let handler;
  // 从储存事件键值对的this._events中获取对应事件回调函数
  handler = this._events.get(type);
  if (args.length > 0) {
    handler.apply(this, args);
  } else {
    handler.call(this);
  }
  return true;
};

// 监听名为type的事件
EventEmeitter.prototype.addListener = function (type, fn) {
  // 将type事件以及对应的fn函数放入this._events中储存
  if (!this._events.get(type)) {
    this._events.set(type, fn);
  }
};

// 方法三
// EventEmitter
class EventEmitter {
  constructor() {
    this.listeners = {};
  }

  on(eventName, listener) {
    const listeners = this.listeners;

    if (listeners[eventName] instanceof Array) {
      if (listeners[eventName].indexOf(listener) === -1) {
        listeners[eventName].push(listener);
      }
    } else {
      listeners[event] = [].concat(cb);
    }
  }

  once(eventName, listener) {
    const self = this;

    function fn(...args) {
      listener.apply(null, args);
      self.removeListener(event, fn);
    }

    this.on(event, fn);
  }

  removeListener(eventName, listener) {
    const eventListeners = this.listeners[eventName] || [];

    for (let i = 0; i < eventListeners.length; i++) {
      if (eventListeners[i] === listener) {
        eventListeners[eventName].splice(i, 1);
        break;
      }
    }
  }

  removeAllListeners(eventName) {
    this.listeners[eventName] = [];
  }

  emit(eventName, ...args) {
    if (!this.listeners[eventName] instanceof Array) {
      return;
    }

    this.listeners[eventName].forEach((listener) => {
      listener.apply(null, args);
    });
  }
}
