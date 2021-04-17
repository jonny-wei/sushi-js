/**
 * 简易 co 模块
 *
 * run 函数接受一个生成器函数，每当 run 函数包裹的生成器函数遇到 yield 关键字就会停止，
 * 当 yield 后面的 promise 被解析成功后会自动调用 next 方法执行到下个 yield 关键字处，
 * 最终就会形成每当一个 promise 被解析成功就会解析下个 promise的流水线操作。
 * 衍变为现在用的最多的 async/await 语法
 *
 * co函数返回一个Promise对象，因此可以用then方法添加回调函数。
 * 前面说过，Generator 就是一个异步操作的容器。它的自动执行需要一种机制，当异步操作有了结果，能够自动交回执行权。
 * 两种方法可以做到这一点。
 * （1）回调函数。将异步操作包装成 Thunk 函数，在回调函数里面交回执行权。
 * （2）Promise 对象。将异步操作包装成 Promise 对象，用then方法交回执行权。
 *
 * co 先检查参数 generatorFunc 是否为 Generator 函数。如果是，就执行该函数，
 * 得到一个内部指针对象；如果不是就返回，并将 Promise 对象的状态改为 resolved。
 * 接着，co 将 Generator 函数的内部指针对象的 next 方法，包装成 onFulfilled 函数。
 * 这主要是为了能够捕捉抛出的错误。
 *
 * https://blog.csdn.net/ixygj197875/article/details/79211813
 */
function run(generatorFunc) {
  let it = generatorFunc();
  let result = it.next();

  return new Promise((resolve, reject) => {
    const next = function (result) {
      if (result.done) {
        resolve(result.value);
      }
      result.value = Promise.resolve(result.value);
      result.value
        .then((res) => {
          let result = it.next(res);
          next(result);
        })
        .catch((err) => {
          reject(err);
        });
    };
    next(result);
  });
}

// 测试
const api = (time) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("time ", time);
      resolve(time);
    }, time);
  });
};
function* generatorFn() {
  const res1 = yield api(1100);
  yield api(1200);
  yield api(1300);
  console.log("res1", res1); // {value: Promise, done: false}
}
run(generatorFn).then((value) => {
  console.log(value);
});
