/**
 * 写一个 mySetInterVal(fn, a, b), 每次间隔 a, a+b, a+2b, ..., a+nb 的时间，
 * 然后写一个 myClear，停止上面的 mySetInterVal
 */

/**
 * 方法一
 */
function mySetInterVal(fn, a, b) {
  let timeCount = 0;
  let timer;
  const loop = () => {
    timer = setTimeout(() => {
      fn();
      timeCount++;
      loop();
    }, a + timeCount * b);
  };
  loop();
  return () => {
    clearTimeout(timer);
  };
}
//测试
const myClear = mySetInterVal(
  () => {
    console.log("test");
  },
  1000,
  500
);
// 清除定时器
setTimeout(() => myClear(), 10000);

/**
 * 方法二 推荐
 */
class MySetInterVal {
  constructor(fn, a, b) {
    this.fn = fn;
    this.a = a;
    this.b = b;
    this.count = 0;
    this.timer = null;
  }
  mySetInterVal(...args) {
    this.timer = setTimeout(() => {
      this.fn(...args);
      this.count++;
      this.mySetInterVal(...args);
    }, this.a + this.count * this.b);
  }
  myClear() {
    clearTimeout(this.timer);
    this.timer = null;
  }
}

// 测试
class MySetInterval {
  constructor(callback, initialDelay, increment) {
    this.callback = callback;
    this.initialDelay = initialDelay;
    this.increment = increment;
    this.currentTimer = null;
    this.currentCount = 0;
  }

  start(...args) {
    if (this.currentTimer) {
      console.warn('Timer is already running. Please stop the current timer before starting a new one.');
      return;
    }

    this.currentCount = 0;
    this.run(...args);
  }

  run(...args) {
    this.currentTimer = setTimeout(() => {
      this.callback(...args);
      this.currentCount++;
      this.run(...args);
    }, this.initialDelay + this.currentCount * this.increment);
  }

  stop() {
    if (this.currentTimer) {
      clearTimeout(this.currentTimer);
      this.currentTimer = null;
    }
  }
}

// 示例用法
const interval = new MySetInterval(() => {
  console.log(new Date().toISOString());
}, 1000, 500);

interval.start();

// 停止定时器
setTimeout(() => {
  interval.stop();
  console.log('Interval stopped');
}, 10000);
