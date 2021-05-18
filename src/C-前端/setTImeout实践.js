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
 * 方法一 推荐
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
let obj = new MySetInterVal(
  (...args) => {
    console.log("run", ...args);
  },
  1000,
  500
);
obj.mySetInterVal(1, 2);
setTimeout(() => {
  obj.myClear();
}, 10000);
