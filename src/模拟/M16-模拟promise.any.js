/**
 * 模拟 Promise.all
 */

function myPromiseAny(promiseArr) {
  return new Promise(function(resolve, reject) {
    const len = promiseArr.length;
    const result = [];
    let count = 0;

    if (!len) {
      return resolve(result);
    }

    for (let [i, p] of promiseArr.entries()) {
      Promise.resolve(p).then(
        value => {
          return resolve(value);
        },
        reason => {
          result[i] = reason;
          count++;
          if (count === length) {
            reject(result);
          }
        }
      );
    }
  });
};