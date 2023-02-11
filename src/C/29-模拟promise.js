/**
 * 模拟 Promise
 *
 * Promise 是一个对象，它代表了一个异步操作的最终完成或者失败。
 * 本质上 Promise 是一个函数返回的对象，我们可以在它上面绑定回调函数，这样我们就不需要在一开始把回调函数作为参数传入这个函数了。
 *
 *  Promise 必然处于以下几种状态之一：
 * 待定（pending）: 初始状态，既没有被兑现，也没有被拒绝。
 * 已兑现（fulfilled）: 意味着操作成功完成。
 * 已拒绝（rejected）: 意味着操作失败。
 *
 * 待定状态的 Promise 对象要么会通过一个值被兑现（fulfilled），要么会通过一个原因（错误）被拒绝（rejected）。
 * 当这些情况之一发生时，我们用 promise 的 then 方法排列起来的相关处理程序就会被调用。
 * 如果 promise 在一个相应的处理程序被绑定时就已经被兑现或被拒绝了，那么这个处理程序就会被调用，
 * 因此在完成异步操作和绑定处理方法之间不会存在竞争状态。
 *
 * 如果一个 promise 已经被兑现（fulfilled）或被拒绝（rejected），那么我们也可以说它处于已敲定（settled）状态。
 * 您还会听到一个经常跟 promise 一起使用的术语：已决议（resolved），它表示 promise 已经处于已敲定(settled)状态，
 * 或者为了匹配另一个 promise 的状态被"锁定"了。
 *
 * 我们可以用 promise.then()，promise.catch() 和 promise.finally()
 * 这些方法将进一步的操作与一个变为已敲定状态的 promise 关联起来。
 * 这些方法还会返回一个新生成的 promise 对象，这个对象可以被非强制性的用来做链式调用
 *
 * 使用Promise有以下约定
 * （1）在本轮 事件循环 运行完成之前，回调函数是不会被调用的。[执行栈中的宏任务没有执行完，回调函数即微任务是不被eventlLoop检查与执行的]
 * （2）即使异步操作已经完成（成功或失败），在这之后通过 then() 添加的回调函数也会被调用。[微任务执行完成，又产生新的微任务，也会在本轮 tick 中执行，不会留到下一轮 tick]
 * （3）通过多次调用 then() 可以添加多个回调函数，它们会按照插入顺序进行执行。[then 返回一个新的promise 进行链式调用（chaining）]
 *
 * 当 .then() 中缺少能够返回 promise 对象的函数时，链式调用就直接继续进行下一环操作。
 * 一个已经处于"已敲定"（"settled"）状态的 promise 中的操作只有 promise 链式调用的栈被清空了和一个事件循环过去了之后才会被执行。
 * 这种效果跟 setTimeout(action, 10) 特别相似。
 *
 * // 构造方法
 * Promise(exector)
 *
 * // 静态方法
 * Promise.all(iterable) 都成功时才成功
 * 这个方法返回一个新的promise对象，该promise对象在iterable参数对象里所有的promise对象都成功的时候才会触发成功，
 * 一旦有任何一个iterable里面的promise对象失败则立即触发该promise对象的失败。
 * 如果这个新的promise对象触发了失败状态，它会把iterable里第一个触发失败的promise对象的错误信息作为它的失败错误信息。
 *
 * Promise.allSettled(iterable) ES2020
 * 等到所有promises都已敲定（settled）（每个promise都已兑现（fulfilled）或已拒绝（rejected））。
 * 返回一个promise，该promise在所有promise完成后完成。并带有一个对象数组，每个对象对应每个promise的结果。
 * 当您有多个彼此不依赖的异步任务成功完成时，或者您总是想知道每个promise的结果时，通常使用它。
 * 相比之下，Promise.all() 更适合彼此相互依赖或者在其中任何一个reject时立即结束。
 *
 * Promise.any(iterable) 一个成功即返回 ES2021
 * 接收一个Promise对象的集合，当其中的一个 promise 成功，就返回那个成功的promise的值。
 * 本质上，这个方法和Promise.all()是相反的。仅在所有承诺均被拒绝的情况下拒绝。
 *
 * Promise.race(iterable) 不管结果本身是成功还是失败。哪个子promise执行的快就返回那个子promise的结果(失败或成功的结果)
 * 当iterable参数里的任意一个子promise被成功或失败后，父promise马上也会用子promise的成功返回值或失败详情
 * 作为参数调用父promise绑定的相应句柄，并返回该promise对象。
 *
 * Promise.resolve(value)
 * 返回一个状态由给定value决定的Promise对象
 *
 * Promise.reject(reason)
 * 返回一个状态为失败的Promise对象
 *
 * // Promise原型
 * Promise.prototype.then(onFulfilled, onRejected)
 * 添加解决(fulfillment)和拒绝(rejection)回调到当前 promise, 返回一个新的 promise, 将以回调的返回值来resolve.
 *
 * Promise.prototype.catch(onRejected)
 * 添加一个拒绝(rejection) 回调到当前 promise, 返回一个新的promise。当这个回调函数被调用，
 * 新 promise 将以它的返回值来resolve，否则如果当前promise 进入fulfilled状态，则以当前promise的完成结果作为新promise的完成结果.
 *
 * Promise.prototype.finally(onFinally)
 * 添加一个事件处理回调于当前promise对象，并且在原promise对象解析完毕后，返回一个新的promise对象。
 * 回调会在当前promise运行完毕后被调用，无论当前promise的状态是完成(fulfilled)还是失败(rejected)
 *
 * Promise利用3大手段解决回调地狱
 * （1）回调函数延迟执行
 * （2）返回值穿透
 * （3）错误冒泡
 */

// 定义三种状态
const PENDING = "PENDING"; // 待定 初始状态，既没有被兑现，也没有被拒绝
const FULFILLED = "FULFILLED"; // 已兑现
const REJECTED = "REJECTED"; // 已拒绝

class Promise {
  // 构造函数
  constructor(exector) {
    this.status = PENDING; // 状态初始化

    this.value = undefined; // 成功结果 放在this上便于then访问
    this.reason = undefined; // 失败结果 放在this上便于catch访问

    this.onFulfilledCallbacks = []; // 已兑现回调队列
    this.onRegectedCallbacks = []; // 已拒绝回调队列

    const resolve = (value) => {
      if (this.statue === PENDING) {
        //只有待定态才能变更状态
        this.status = FULFILLED;
        this.value = value;
        this.onFulfilledCallbacks.forEach((fn) => fn(this.value));
      }
    };

    const reject = (reason) => {
      if (this.status === PENDING) {
        this.status = REJECTED;
        this.reason = reason;
        this.onRegectedCallbacks.forEach((fn) => fn(this.reason));
      }
    };

    try {
      // 立即执行exector
      exector(resolve, reject); // 把内部的resolve和reject传入executor，用户可调用resolve和reject
    } catch (e) {
      reject(e); // executor执行出错，将错误内容reject抛出去
    }
  }

  // 原型属性(方法) then
  then(onFulfilled, onRejected) {
    onFulfilled =
      typeof onFulfilled === "function" ? onFulfilled : (value) => value;
    onRejected =
      typeof onRejected === "function"
        ? onRejected
        : (reason) => {
            throw new Error(reason instanceof Error ? reason.message : reason);
          };
    const self = this;
    return new Promise((resolve, reject) => {
      if (self.status === PENDING) {
        self.onFulfilledCallbacks.push(() => {
          try {
            // 模拟微任务
            setTimeout(() => {
              const result = onFulfilled(self.value);
              // 分两种情况：
              // 1. 回调函数返回值是Promise，执行then操作
              // 2. 如果不是Promise，调用新Promise的resolve函数
              result instanceof Promise
                ? result.then(resolve, reject)
                : resolve(result);
            });
          } catch (e) {
            reject(e);
          }
        });
        self.onRegectedCallbacks.push(() => {
          try {
            setTimeout(() => {
              const result = onRejected(self.reason);
              result instanceof Promise
                ? result.then(resolve, reject)
                : resolve(result);
            });
          } catch (e) {
            reject(e);
          }
        });
      } else if (self.status === FULFILLED) {
        try {
          setTimeout(() => {
            const result = onFulfilled(self.value);
            result instanceof Promise
              ? result.then(resolve, reject)
              : resolve(result);
          });
        } catch (e) {
          reject(e);
        }
      } else if (self.status === REJECTED) {
        try {
          const result = onRejected(self.reason);
          result instanceof Promise
            ? result.then(resolve, reject)
            : resolve(result);
        } catch (e) {
          reject(e);
        }
      }
    });
  }

  // 原型属性(方法) catch
  catch(onRejected) {
    return this.then(null, onRejected);
  }

  // 静态方法 resolve
  static resolve(value) {
    if (value instanceof Promise) {
      return value; // 如果是Promise实例直接返回
    } else {
      return new Promise((resolve, reject) => {
        resolve(value);
      });
    }
  }

  // 静态方法 reject
  static reject(reason) {
    return new Promise((resolve, reject) => {
      reject(reason);
    });
  }

  // 静态方法 all
  static all(promiseArr) {
    return new Promise((resolve, reject) => {
      let count = 0;
      const len = promiseArr.length;
      const result = [];

      if (!len) resolve(result);

      for (let index = 0; index < len; index++) {
        Promise.resolve(promiseArr[index]).then(
          (value) => {
            result[index] = value;
            count++;
            if (count === len) {
              resolve(result);
            }
          },
          (reason) => {
            reject(reason);
          }
        );
      }
    });
  }

  // 静态方法 race
  static race(promiseArr) {
    return new Promise((resolve, reject) => {
      promiseArr.forEach((p) => {
        Promise.resolve(p).then(
          (val) => resolve(val),
          (err) => reject(err)
        );
      });
    });
  }

  // 手写 allSettled
  static allSettled(promiseArr) {
    return new Promise(function (resolve) {
      const length = promiseArr.length;
      const result = [];
      let count = 0;

      if (length === 0) resolve(result);

      for (let [i, p] of promiseArr.entries()) {
        Promise.resolve(p).then(
          (value) => {
            result[i] = { status: "fulfilled", value: value };
            count++;
            if (count === length) {
              return resolve(result);
            }
          },
          (reason) => {
            result[i] = { status: "rejected", reason: reason };
            count++;
            if (count === length) {
              return resolve(result);
            }
          }
        );
      }
    });
  }

  // 手写 any
  static any(promiseArr) {
    return new Promise(function (resolve, reject) {
      const length = promiseArr.length;
      const result = [];
      let count = 0;

      if (length === 0) resolve(result);

      for (let [i, p] of promiseArr.entries()) {
        Promise.resolve(p).then(
          (value) => {
            return resolve(value);
          },
          (reason) => {
            result[i] = reason;
            count++;
            if (count === length) {
              reject(result);
            }
          }
        );
      }
    });
  }
}

/**
 * 方法二
 * 功能完善的手写 promise （推荐）
 * 符合 Promse/A+ 规范的 手写Promise 
 * promises-aplus-tests测试通过
 * 
 * https://juejin.cn/post/6945319439772434469#heading-29
 */
// 先定义三个常量表示状态
const PENDING = "pending";
const FULFILLED = "fulfilled";
const REJECTED = "rejected";

// 新建 MyPromise 类
class MyPromise {
  constructor(executor) {
    // executor 是一个执行器，进入会立即执行
    // 并传入resolve和reject方法
    try {
      executor(this.resolve, this.reject);
    } catch (error) {
      this.reject(error);
    }
  }

  // 储存状态的变量，初始值是 pending
  status = PENDING;
  // 成功之后的值
  value = null;
  // 失败之后的原因
  reason = null;

  // 存储成功回调函数
  onFulfilledCallbacks = [];
  // 存储失败回调函数
  onRejectedCallbacks = [];

  // 更改成功后的状态
  resolve = (value) => {
    // 只有状态是等待，才执行状态修改
    if (this.status === PENDING) {
      // 状态修改为成功
      this.status = FULFILLED;
      // 保存成功之后的值
      this.value = value;
      // resolve里面将所有成功的回调拿出来执行
      while (this.onFulfilledCallbacks.length) {
        // Array.shift() 取出数组第一个元素，然后（）调用，shift不是纯函数，取出后，数组将失去该元素，直到数组为空
        this.onFulfilledCallbacks.shift()(value);
      }
    }
  };

  // 更改失败后的状态
  reject = (reason) => {
    // 只有状态是等待，才执行状态修改
    if (this.status === PENDING) {
      // 状态成功为失败
      this.status = REJECTED;
      // 保存失败后的原因
      this.reason = reason;
      // resolve里面将所有失败的回调拿出来执行
      while (this.onRejectedCallbacks.length) {
        this.onRejectedCallbacks.shift()(reason);
      }
    }
  };

  then(onFulfilled, onRejected) {
    const realOnFulfilled =
      typeof onFulfilled === "function" ? onFulfilled : (value) => value;
    const realOnRejected =
      typeof onRejected === "function"
        ? onRejected
        : (reason) => {
            throw reason;
          };

    // 为了链式调用这里直接创建一个 MyPromise，并在后面 return 出去
    const promise2 = new MyPromise((resolve, reject) => {
      const fulfilledMicrotask = () => {
        // 创建一个微任务等待 promise2 完成初始化
        queueMicrotask(() => {
          try {
            // 获取成功回调函数的执行结果
            const x = realOnFulfilled(this.value);
            // 传入 resolvePromise 集中处理
            resolvePromise(promise2, x, resolve, reject);
          } catch (error) {
            reject(error);
          }
        });
      };

      const rejectedMicrotask = () => {
        // 创建一个微任务等待 promise2 完成初始化
        queueMicrotask(() => {
          try {
            // 调用失败回调，并且把原因返回
            const x = realOnRejected(this.reason);
            // 传入 resolvePromise 集中处理
            resolvePromise(promise2, x, resolve, reject);
          } catch (error) {
            reject(error);
          }
        });
      };
      // 判断状态
      if (this.status === FULFILLED) {
        fulfilledMicrotask();
      } else if (this.status === REJECTED) {
        rejectedMicrotask();
      } else if (this.status === PENDING) {
        // 等待
        // 因为不知道后面状态的变化情况，所以将成功回调和失败回调存储起来
        // 等到执行成功失败函数的时候再传递
        this.onFulfilledCallbacks.push(fulfilledMicrotask);
        this.onRejectedCallbacks.push(rejectedMicrotask);
      }
    });

    return promise2;
  }

  // resolve 静态方法
  static resolve(parameter) {
    // 如果传入 MyPromise 就直接返回
    if (parameter instanceof MyPromise) {
      return parameter;
    }

    // 转成常规方式
    return new MyPromise((resolve) => {
      resolve(parameter);
    });
  }

  // reject 静态方法
  static reject(reason) {
    return new MyPromise((resolve, reject) => {
      reject(reason);
    });
  }
}

function resolvePromise(promise2, x, resolve, reject) {
  // 如果相等了，说明return的是自己，抛出类型错误并返回
  if (promise2 === x) {
    return reject(
      new TypeError("Chaining cycle detected for promise #<Promise>")
    );
  }
  // 判断x是不是 MyPromise 实例对象
  if (x instanceof MyPromise) {
    // 执行 x，调用 then 方法，目的是将其状态变为 fulfilled 或者 rejected
    // x.then(value => resolve(value), reason => reject(reason))
    // 简化之后
    x.then(resolve, reject);
  } else {
    // 普通值
    resolve(x);
  }
}

// 改造后的 resolvePromise
function resolvePromise(promise, x, resolve, reject) {
  // 如果相等了，说明return的是自己，抛出类型错误并返回
  if (promise === x) {
    return reject(
      new TypeError("The promise and the return value are the same")
    );
  }

  if (typeof x === "object" || typeof x === "function") {
    // x 为 null 直接返回，走后面的逻辑会报错
    if (x === null) {
      return resolve(x);
    }

    let then;
    try {
      // 把 x.then 赋值给 then
      then = x.then;
    } catch (error) {
      // 如果取 x.then 的值时抛出错误 error ，则以 error 为据因拒绝 promise
      return reject(error);
    }

    // 如果 then 是函数
    if (typeof then === "function") {
      let called = false;
      try {
        then.call(
          x, // this 指向 x
          // 如果 resolvePromise 以值 y 为参数被调用，则运行 [[Resolve]](promise, y)
          (y) => {
            // 如果 resolvePromise 和 rejectPromise 均被调用，
            // 或者被同一参数调用了多次，则优先采用首次调用并忽略剩下的调用
            // 实现这条需要前面加一个变量 called
            if (called) return;
            called = true;
            resolvePromise(promise, y, resolve, reject);
          },
          // 如果 rejectPromise 以据因 r 为参数被调用，则以据因 r 拒绝 promise
          (r) => {
            if (called) return;
            called = true;
            reject(r);
          }
        );
      } catch (error) {
        // 如果调用 then 方法抛出了异常 error：
        // 如果 resolvePromise 或 rejectPromise 已经被调用，直接返回
        if (called) return;

        // 否则以 error 为据因拒绝 promise
        reject(error);
      }
    } else {
      // 如果 then 不是函数，以 x 为参数执行 promise
      resolve(x);
    }
  } else {
    // 如果 x 不为对象或者函数，以 x 为参数执行 promise
    resolve(x);
  }
}

/**
 * Promise 应用 -  异步加载图片
 */
function loadImageAsync(url) {
  return new Promise(function (resolve, reject) {
    const image = new Image();

    image.onload = function () {
      resolve(image);
    };

    image.onerror = function () {
      reject(new Error("Could not load image at " + url));
    };

    image.src = url;
  });
}

/**
 * Promise 应用 -  实现的 Ajax GET 请求操作
 */
const getJSON = function (url) {
  const promise = new Promise(function (resolve, reject) {
    const handler = function () {
      if (this.readyState !== 4) {
        return;
      }
      if (this.status === 200) {
        resolve(this.response);
      } else {
        reject(new Error(this.statusText));
      }
    };
    const client = new XMLHttpRequest();
    client.open("GET", url);
    client.onreadystatechange = handler;
    client.responseType = "json";
    client.setRequestHeader("Accept", "application/json");
    client.send();
  });

  return promise;
};

getJSON("/posts.json").then(
  function (json) {
    console.log("Contents: " + json);
  },
  function (error) {
    console.error("出错了", error);
  }
);

/**
 * Generator 函数与 Promise 的结合
 *
 * 使用 Generator 函数管理流程，遇到异步操作的时候，通常返回一个Promise对象。
 */
function getFoo() {
  return new Promise(function (resolve, reject) {
    resolve("foo");
  });
}

const g = function* () {
  try {
    const foo = yield getFoo();
    console.log(foo);
  } catch (e) {
    console.log(e);
  }
};

function run(generator) {
  const it = generator();

  function go(result) {
    if (result.done) return result.value;

    return result.value.then(
      function (value) {
        return go(it.next(value));
      },
      function (error) {
        return go(it.throw(error));
      }
    );
  }

  go(it.next());
}
