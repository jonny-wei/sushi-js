/**
 * 手撕 Promise.all(iterable)
 *
 * 并行运行异步操作
 * Promise.all(iterable) 等待所有都完成（或第一个失败）
 * 这个方法返回一个新的promise对象，该promise对象在iterable参数对象里所有的promise对象都成功的时候才会触发成功，
 * 一旦有任何一个iterable里面的promise对象失败则立即触发该promise对象的失败。
 * 如果这个新的promise对象触发了失败状态，它会把iterable里第一个触发失败的promise对象的错误信息作为它的失败错误信息。
 *
 * Promise.all() 方法接收一个promise的iterable类型（注：Array，Map，Set都属于ES6的iterable类型）的输入，
 * 并且只返回一个Promise实例， 那个输入的所有promise的resolve回调的结果是一个数组。
 * 这个Promise的resolve回调执行是在所有输入的promise的resolve回调都结束，或者输入的iterable里没有promise了的时候。
 * 它的reject回调执行是，只要任何一个输入的promise的reject回调执行或者输入不合法的promise就会立即抛出错误，并且reject的是第一个抛出的错误信息。
 *
 * Promise.all(iterable);
 *
 * 返回值：
 * 如果传入的参数是一个空的可迭代对象，则返回一个已完成（already resolved）状态的 Promise。
 * 如果传入的参数不包含任何 promise，则返回一个异步完成（asynchronously resolved） Promise。
 * 注意：Google Chrome 58 在这种情况下返回一个已完成（already resolved）状态的 Promise。
 * 其它情况下返回一个处理中（pending）的Promise。这个返回的 promise 之后会在所有的 promise 都完成或有一个 promise 失败时异步地变为完成或失败。
 * 返回值将会按照参数内的 promise 顺序排列，而不是由调用 promise 的完成顺序决定。
 *
 * 完成（Fulfillment）：
 * 如果传入的可迭代对象为空，Promise.all 会同步地返回一个已完成（resolved）状态的promise。
 * 如果所有传入的 promise 都变为完成状态，或者传入的可迭代对象内没有 promise，Promise.all 返回的 promise 异步地变为完成。
 * 在任何情况下，Promise.all 返回的 promise 的完成状态的结果都是一个数组，它包含所有的传入迭代参数对象的值（也包括非 promise 值）。
 *
 * 失败/拒绝（Rejection）：
 * 如果传入的 promise 中有一个失败（rejected），Promise.all 异步地将失败的那个结果给失败状态的回调函数，而不管其它 promise 是否完成。
 */

function myPromiseAll(promiseArr) {
  return new Promise((resolve, reject) => {
    let count = 0;
    const len = promiseArr.length;
    const result = [];

    if (!len) resolve(result);

    for (const [i, p] of promiseArr.entries()) {
      Promise.resolve(p).then(
        (value) => {
          result[i] = value;
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

/**
 * 使用
 */
function red() {
  return { code: 200, data: "red" };
}
function green() {
  return { code: 200, data: "green" };
}
function yellow() {
  return { code: 200, data: "yellow" };
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

const p1 = light(3000, red);
const p2 = light(2000, yellow);
const p3 = light(1000, green);

myPromiseAll([p1, p2, p3]).then(
  (value) => {
    console.log("success ->", value);
  },
  (reason) => {
    console.log("fail -> ", reason);
  }
);