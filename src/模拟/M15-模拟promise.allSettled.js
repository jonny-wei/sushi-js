/**
 * Promise.allSettled
 */

// 静态方法 allSettled
Promise.allSettled = function (promiseArr) {
  return new Promise(function (resolve) {
    const len = promiseArr.length;
    const result = [];
    let count = 0;

    if (!len) {
      resolve(result);
    }

    for (let [i, p] of promiseArr.entries()) {
      Promise.resolve(p).then(
        value => {
          result[i] = { status: "fulfilled", value };
          count++;
          if (count === length) {
            resolve(result);
          }
        },
        reason => {
          result[i] = { status: "rejected", reason };
          count++;
          if (count === length) {
            resolve(result);
          }
        }
      );
    }
  });
};

// 使用 Promise.finally 实现 Promise.allSettled
Promise.allSettled = function (promises) {
  // 也可以使用扩展运算符将 Iterator 转换成数组
  // const promiseArr = [...promises];
  const promiseArr = Array.from(promises);
  return new Promise(resolve => {
    const result = [];
    const len = promiseArr.length;
    let count = len;
    if (len === 0) {
      return resolve(result);
    }
    for (let i = 0; i < len; i++) {
      promiseArr[i]
        .then(
          value => {
            result[i] = { status: "fulfilled", value: value };
          },
          reason => {
            result[i] = { status: "rejected", reason: reason };
          }
        )
        .finally(() => {
          if (!--count) {
            resolve(result);
          }
        });
    }
  });
};

// 使用 Promise.all 实现 Promise.allSettled
Promise.allSettled = function (promises) {
  // 也可以使用扩展运算符将 Iterator 转换成数组
  // const promiseArr = [...promises];
  const promiseArr = Array.from(promises);
  return Promise.all(
    promiseArr.map(p =>
      Promise.resolve(p).then(
        res => {
          return { status: "fulfilled", value: res };
        },
        error => {
          return { status: "rejected", reason: error };
        }
      )
    )
  );
};