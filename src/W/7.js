// 发布订阅
// Map 实现

class EventEmitter {
  events = new Map();

  on(name, fn) {
    this.events.set(name, { isOnce: false, fn: fn });
  }

  off(name) {
    if (this.events.has(name)) {
      this.events.delete(name);
    }
  }

  emit(name, args) {
    const cache = this.events.get(name);
    if (cache) {
      if (cache.isOnce) {
        this.events.delete(name);
      }
      cache.fn(args);
    }
  }

  once(name, fn) {
    this.events.set(name, { isOnce: true, fn: fn });
  }
}

// test
// const eventObj = new EventEmitter();
// eventObj.on("message", (args) => {
//   console.log(args);
// });
// eventObj.on("message", (args) => {
//   console.log("2", args);
// });
// eventObj.emit("message", 1242);

// 普通

class EventEmitter2 {
  constructor() {
    this.subs = {};
  }

  on(name, fn) {
    (this.subs[name] || (this.subs[name] = [])).push(fn);
  }

  off(name, fn) {
    if (this.subs[name]) {
      const index = this.subs[name].findIndex((cb) => cb === fn);
      this.subs[name].splice(index, 1);
      if (!this.subs[name].length) {
        delete this.subs[name];
      }
    }
  }

  once(name, fn) {
    const onceEvent = (...args) => {
      fn(...args);
      this.off(name, fn);
    };
    this.on(name, onceEvent);
  }

  emit(name, ...args) {
    if (this.subs[name]) {
      this.subs[name].forEach((cb) => {
        cb(...args);
      });
    }
  }
}

const eventObj2 = new EventEmitter2();
const callback1 = (args) => {
  console.log(args);
};
const callback2 = (args) => {
  console.log("2", args);
};

eventObj2.on("message2", callback1);
eventObj2.on("message2", callback2);
eventObj2.on("message2", callback1);
eventObj2.on("message2", callback2);

eventObj2.off("message2", callback1);
eventObj2.off("message2", callback2);
eventObj2.off("message2", callback1);
eventObj2.off("message2", callback2);

eventObj2.emit("message2", 1242);
eventObj2.emit("message2", 1242);
