/**
 * 简易 co 模块
 *
 * run 函数接受一个生成器函数，每当 run 函数包裹的生成器函数遇到 yield 关键字就会停止，
 * 当 yield 后面的 promise 被解析成功后会自动调用 next 方法执行到下个 yield 关键字处，
 * 最终就会形成每当一个 promise 被解析成功就会解析下个 promise，
 * 当全部解析成功后打印所有解析的结果，
 * 衍变为现在用的最多的 async/await 语法
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
        .cache((err) => {
          reject(err);
        });
    };
    next(result);
  });
}

// 定义一个 generator 函数
function* func() {
  let res = yield api(data);
  let res2 = yield api(data2);
  let res3 = yield api(data3);
  console.log(res, res2, res3);
}

// 调用
run(func);
