/**
 * promise并行限制
 *
 * 实现有并行限制的Promise调度器问题
 *
 * 不能使用Promise.all()和Promise.race()这两个API了，Promise.all()会等待所有Promise完成，Promise.race()只会执行一个Promise。
 */
class Scheduler {
  constructor() {
    this.queue = [];
    this.maxCount = 2;
    this.runCounts = 0;
  }
  add(promiseCreator) {
    this.queue.push(promiseCreator);
  }
  taskStart() {
    // 同步任务 一次发送 maxCount 的请求
    for (let i = 0; i < this.maxCount; i++) {
      this.request();
    }
  }
  request() {
    if (!this.queue || !this.queue.length || this.runCounts >= this.maxCount) {
      return;
    }
    this.runCounts++;
    this.queue
      .shift()()
      .then(() => {
        /**
         * 成功时处理逻辑
         *
         * 有一个成功就要进行下一个请求保证最大并行数2 所以 runCounts-- 并进行下一个请求
         * taskStart 中同步任务先发送 2 个 request (addTask(1000, "1")与addTask(500, "2");)
         * this.queue.shift() 取出异步任务并执行 this.queue.shift()().then() then中是成功时的处理，
         * 当取出的异步任务执行成功则 runCounts-- 并进行下一个请求 保证最大并行数 2
         */
        this.runCounts--;
        this.request();
      });
  }
}

const timeout = (time) =>
  new Promise((resolve, reject) => {
    setTimeout(resolve, time);
  });

const scheduler = new Scheduler();

const addTask = (time, order) => {
  scheduler.add(() => {
    return timeout(time).then(() => {
      console.log(order);
    });
  });
};
addTask(1000, "1");
addTask(500, "2");
addTask(300, "3");
addTask(400, "4");
scheduler.taskStart();
// 2
// 3
// 1
// 4

/**
 * 有并发控制的 Ajax 批量请求函数
 *
 * 实现一个批量请求函数 multiRequest(urls, maxNum, callback)，要求如下：
 * 要求最大并发数 maxNum
 * 每当有一个请求返回，就留下一个空位，可以增加新的请求
 * 所有请求完成后，结果按照 urls 里面的顺序依次打出
 * multiRequest 可以返回一个 promise 或者 直接执行 callback 回调
 */
function multiRequest(urls, maxNum, callback) {
  const len = urls.length;
  const result = new Array(len).fill(false);
  let runCount = 0;
  return new Promise((resolve, reject) => {
    // 最多同时发送maxNum个请求
    while (runCount < maxNum) {
      sendRequest();
    }
    function sendRequest() {
      let curCount = runCount;
      runCount++;
      console.log(`开始发送第 ${curCount} 个请求`);
      if (runCount >= len) {
        callback(result);
        resolve(result);
      }
      urls[curCount]
        .then((value) => {
          console.log(`第 ${curCount} 个请求：${value} 成功了！`);
          result[curCount] = `${value} 成功`;
        })
        .catch((reason) => {
          console.log(`第 ${curCount} 个请求：${reason} 失败了！`);
          result[curCount] = `${reason} 失败`;
        })
        .finally(() => {
          if (runCount < len) {
            sendRequest();
          }
        });
    }
  });
}

// 测试
const light = (timmer, cb) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const result = cb();
      if (result.code === 200) {
        resolve(result.data);
      } else {
        reject(result.data);
      }
    }, timmer);
  });
};

const p1 = light(1000, () => {
  return { code: 200, data: "1" };
});
const p2 = light(500, () => {
  return { code: 200, data: "2" };
});
const p3 = light(300, () => {
  return { code: 300, data: "3" };
});
const p4 = light(400, () => {
  return { code: 200, data: "4" };
});

multiRequest([p1, p2, p3, p4], 2, (data) => {
  console.log("执行最终的回调 ", data);
}).then((value) => console.log("执行完的结果", value));

// 测试用例2
const p1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(1);
  }, 1000);
});
const p2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject(2);
  }, 2000);
});
const p3 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(3);
  }, 600);
});
const p4 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(4);
  }, 3000);
});
promiseMuilti([p4, p2, p1, p3], 3, () => {
  console.log("callback");
})
  .then((value) => {
    console.log("success", value);
  })
  .catch((err) => {
    console.log("err", value);
  });



const parallelFetch = function (urls, max, callback) {
  if (!window.fetch || typeof window.fetch !== "function") {
    throw new Error("当前环境不支持 fetch 请求");
  }
  if (!urls || urls.length <= 0) {
    throw new Error("urls is Empty, 请传入正确的请求地址");
  }
  const len = urls.length;
  const max = max || 1; // 最大并发值
  let currentIndex = 0; // 当前请求地址索引
  let maxFetch = len >= max ? max : len; // 当前可以正常请求的数量，保证最大并发的安全性
  let finishedFetch = 0; // 当前完成的请求数量，用于判断何时调用回调
  for (let i = 0; i < maxFetch; i++) {
    fetchFunc();
  }
  function fetchFunc() {
    // 所有请求已完成 执行回调
    if (finishedFetch === len) {
      return callback();
    }
    // 当前请求的索引大于请求地址数组的长度，则不继续请求
    if (currentIndex >= len) {
      maxFetch = 0;
    }
    if (maxFetch > 0) {
      fetch(urls[currentIndex])
        .then((value) => {
          maxFetch += 1;
          finishedFetch += 1;
          fetchFunc();
        })
        .catch((err) => {
          maxFetch += 1;
          finishedFetch += 1;
          fetchFunc();
        });
      currentIndex += 1;
      maxFetch -= 1;
    }
  }
};

/**
 * 烧脑的并发控制请求
 *
 * 1. new Promise 一旦创建，立即执行
 * 2. 使用 Promise.resolve().then() 可以把任务加到微任务队列中，防止立即执行迭代方法
 * 3. 微任务处理过程中，产生的新的微任务，会在同一事件循环内，追加到微任务队列里
 * 4. 使用 race 在某个任务完成时，继续添加任务，保持任务按照最大并发数进行执行
 * 5. 任务完成后，需要从 doningTasks 中移出
 */

function multiRequest(promiseArr, maxNum) {
  const tasks = []; // 所有的任务
  const doingTasks = []; // 并行执行的任务
  let count = 0; // 执行了几次
  // 异步任务排队
  const enqueue = () => {
    if (count >= promiseArr.length) {
      return Promise.resolve();
    }
    // 压入微任务队列，防止立即执行迭代方法
    const task = Promise.resolve().then(() => promiseArr[count++]);
    tasks.push(task);
    // 执行，任务执行成功后删除一个并行任务，为下一个任务腾位置，以保证每次都有 maxNum 的任务在执行
    console.log(`开始请求第 ${count + 1} 个任务`);
    const doing = task.then(() =>
      doingTasks.splice(doingTasks.indexOf(doing), 1)
    );
    // 压入并行执行的任务队列
    doingTasks.push(doing);
    // 如果并行执行的任务数量等于了最大并行数则发起请求 Promise.race 只要有任务执行完毕即返回
    const res =
      doingTasks.length >= maxNum
        ? Promise.race(doingTasks) // race 无法捕获错误的结果 可用allSettled
        : Promise.resolve();
    // Promise.race 只要有任务执行完毕即返回不论成功与失败返回最快执行完毕的那个，成功后接着请求
    // 保证每次都有 maxNum 的任务在执行reason
    return res.then(enqueue);
  };
  return enqueue().then(() => Promise.all(tasks)); // all 无法捕获错误的结果 可用allSettled
}

// 测试
function red() {
  return { code: 200, data: "red" };
}
function green() {
  return { code: 200, data: "green" };
}
function yellow() {
  return { code: 300, data: "yellow" };
}
function black() {
  return { code: 200, data: "black" };
}
const light = (timmer, cb) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const result = cb();
      if (result.code === 200) {
        resolve(result.data);
      } else {
        reject(result.data);
      }
    }, timmer);
  });
};

const p1 = light(2000, red);
const p2 = light(1000, yellow);
const p3 = light(3000, green);
const p4 = light(800, black);
multiRequest([p1, p2, p3, p4], 2).then((data) => {
  console.log("最终回调的结果 ", data);
});
