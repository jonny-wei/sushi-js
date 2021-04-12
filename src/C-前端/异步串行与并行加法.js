/**
 * 异步串行和异步并行实现加法求和
 *
 */

const asyncAdd = (a, b, callback) => {
  setTimeout(() => {
    callback(null, a + b);
  }, 500);
};

const promiseAdd = (a, b, index) => {
  console.log(`第 ${index} 次计算，参数 ${a}, ${b}`);
  return new Promise((resolve, reject) => {
    asyncAdd(a, b, (err, res) => {
      if (err) {
        reject(err);
      } else {
        resolve(res);
      }
    });
  });
};

// 异步串行
const add1 = (arr) => {
  return arr.reduce((acc, val, index) => {
    return Promise.resolve(acc).then((value) => {
      return promiseAdd(value, val, index);
    });
  }, 0);
};

add1([1, 2, 3, 4, 5, 6, 7, 8, 9]).then((sum) =>
  console.log("异步串行加法结果", sum)
);

// 异步并行
async function parallelSum(arr) {
  if (arr.length === 1) return arr[0];
  const tasks = [];
  for (let i = 0; i < arr.length; i += 2) {
    tasks.push(promiseAdd(arr[i], arr[i + 1] || 0));
  }
  const results = await Promise.all(tasks);
  return parallelSum(results);
}

parallelSum([1, 2, 3, 4, 5, 6, 7, 8, 9]).then((sum) =>
  console.log("异步并行加法结果", sum)
);
