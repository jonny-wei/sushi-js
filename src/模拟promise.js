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
 * （1）在本轮 事件循环 运行完成之前，回调函数是不会被调用的。
 * （2）即使异步操作已经完成（成功或失败），在这之后通过 then() 添加的回调函数也会被调用。
 * （3）通过多次调用 then() 可以添加多个回调函数，它们会按照插入顺序进行执行。（链式调用（chaining））
 *
 * 当 .then() 中缺少能够返回 promise 对象的函数时，链式调用就直接继续进行下一环操作。
 * 一个已经处于"已敲定"（"settled"）状态的 promise 中的操作只有 promise 链式调用的栈被清空了和一个事件循环过去了之后才会被执行。
 * 这种效果跟 setTimeout(action, 10) 特别相似。
 *
 * // 构造方法
 * Promise()
 *
 * // 静态方法
 * Promise.all(iterable) 都成功时才成功
 * 这个方法返回一个新的promise对象，该promise对象在iterable参数对象里所有的promise对象都成功的时候才会触发成功，
 * 一旦有任何一个iterable里面的promise对象失败则立即触发该promise对象的失败。
 * 如果这个新的promise对象触发了失败状态，它会把iterable里第一个触发失败的promise对象的错误信息作为它的失败错误信息。
 *
 * Promise.allSettled(iterable)
 * 等到所有promises都已敲定（settled）（每个promise都已兑现（fulfilled）或已拒绝（rejected））。
 * 返回一个promise，该promise在所有promise完成后完成。并带有一个对象数组，每个对象对应每个promise的结果。
 *
 * Promise.any(iterable) 一个成功即返回
 * 接收一个Promise对象的集合，当其中的一个 promise 成功，就返回那个成功的promise的值。
 *
 * Promise.race(iterable)
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

const { for } = require("core-js/fn/symbol");

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
      if (this.status === REJECTED) {
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
    const len = promiseArr.length;
    const values = new Array(len);
    let count = 0; // 记录已兑现的promise个数
    return new Promise((resolve, reject) => {
      for (let i = 0; i < len; i++) {
        Promise.resolve(promiseArr[i]).then(
          (val) => {
            values[i] = val;
            count++;
            if (count === len) {
              resolve(values);
            }
          },
          (err) => {
            reject(err);
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
}
