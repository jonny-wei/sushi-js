/**
 * 手撕 Promise.race()
 *
 * Promise.race(iterable) 方法返回一个 promise，一旦迭代器中的某个promise解决或拒绝，返回的 promise就会解决或拒绝。
 * 返回迭代器中最快执行的promise，拒绝或成功
 *
 * race 函数返回一个 Promise，它将与第一个传递的 promise 相同的完成方式被完成。它可以是完成（ resolves），也可以是失败（rejects），这要取决于第一个完成的方式是两个中的哪个。
 * 如果传的迭代是空的，则返回的 promise 将永远等待。
 * 如果迭代包含一个或多个非承诺值和/或已解决/拒绝的承诺，则 Promise.race 将解析为迭代中找到的第一个值
 */

function promiseRace(promiseArr) {
  return new Promise((resolve, reject) => {
    for (const task of promiseArr) {
      Promise.resolve(task).then(
        (value) => {
          resolve(value);
        },
        (reason) => {
          reject(reason);
        }
      );
    }
  });
}
