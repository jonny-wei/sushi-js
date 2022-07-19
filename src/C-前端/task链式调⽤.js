// 题⽬：实现⼀个arrange函数，可以进⾏时间和⼯作调度
// 测试⽤例⼀：
// arrange('William');
// > William is notified
// 测试⽤例⼆：
// arrange('William').wait(5).do('commit');
// > William is notified
// > Waiting 5s...
// > Start to commit // 等待5s后打印
// 测试⽤例三：
// arrange('William').waitFirst(5).do('push');
// > Waiting 5s...
// > Start to push // 等待5s后打印
// > William is notified
class Task {
  name = null;
  list = [];
  constructor(name) {
    this.name = name;
    this.list = [
      () => {
        console.log(`${name} is notified`);
      },
    ];
    this._nextTick();
    return this;
  }
  do(something) {
    this.list.push(() => console.log(`Start to ${something}`));
    return this;
  }
  wait(n) {
    this.list.push(() => {
      return this._delay(n);
    });
    return this;
  }
  waitFirst(n) {
    this.list.splice(0, 0, () => {
      return this._delay(n);
    });
    return this;
  }
  _delay(s) {
    return new Promise((resolve) => {
      console.log(`Waiting ${s}s...`);
      setTimeout(resolve, 1000 * s);
    });
  }
  async _nextTick() {
    Promise.resolve().then(async () => {
      let task;
      while ((task = this.list.shift())) {
        await task();
      }
    });
  }
}

// 测试⽤例四:
// 要求：打印timeout0需晚于arrange中未延迟的任务
setTimeout(() => {
  console.log("timeout0");
}, 0);
arrange("William").wait(5).do("commit");
// > William is notified
// > waiting 5s...
// > timeout0
setTimeout(() => {
  console.log("timeout0");
}, 0);
arrange("William").waitFirst(5).do("commit");
// > waiting 5s...
// > timeout0
