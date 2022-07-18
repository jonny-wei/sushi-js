/**
 * promisify
 *
 * util.promisify 是在 node.js 8.x 版本中新增的一个工具，
 * 用于将老式的 Error first callback 转换为 Promise 对象，让老项目改造变得更为轻松。
 * 在官方推出这个工具之前，民间已经有很多类似的工具了，比如es6-promisify、thenify、bluebird.promisify。
 *
 * 大致思路
 * 因为在Node中异步回调有一个约定：Error first，也就是说回调函数中的第一个参数一定要是Error对象，其余参数才是正确时的数据。
 * 知道了这样的规律以后，工具就很好实现了，在匹配到第一个参数有值的情况下，触发reject，其余情况触发resolve
 *
 * 1. 调用工具函数返回一个匿名函数，匿名函数接收原函数的参数。
 * 2. 匿名函数被调用后根据这些参数来调用真实的函数，同时拼接一个用来处理结果的callback。
 * 3. 检测到err有值，触发reject，其他情况触发resolve
 * resolve 只能传入一个参数，所以callback中没有必要使用...arg获取所有的返回值
 *
 * 有那么一些场景，是不能够直接使用promisify来进行转换的，有大概这么两种情况：
 * 1. 没有遵循Error first callback约定的回调函数。这很可能导致reject的误判，得不到正确的反馈
 * 2. 返回多个参数的回调函数。因为Promise.resolve只能接收一个参数，多余的参数会被忽略
 * util.promisify 还提供了一个 Symbol 类型的 key，util.promisify.custom。
 * Symbol 类型的大家应该都有了解，是一个唯一的值
 */

/**
 * promisify 用法
 *
 * 当后续代码调用 promisify 时就会进行判断：
 * 1. 如果目标函数存在 promisify.custom 属性，则会判断其类型：
 *  1.1 如果不是一个可执行的函数，抛出异常
 *  1.2 如果是可执行的函数，则直接返回其对应的函数
 * 2. 如果目标函数不存在对应的属性，按照Error first callback的约定生成对应的处理函数然后返回
 * 添加了这个 custom 属性以后，就不用再担心使用方针对你的函数调用 promisify 了。
 */
// 比如我们有一个对象，提供了一个返回多个参数的回调版本的函数
const obj = {
  getData(callback) {
    callback(null, "Niko", 18); // 返回两个参数，姓名和年龄
  },
};
// 这时使用promisify肯定是不行的
// 因为Promise.resolve只接收一个参数，所以我们只会得到 Niko
promisify(obj.getData)().then(console.log); // Niko
// 所以我们需要使用 promisify.custom 来自定义处理方式
obj.getData[promisify.custom] = async () => ({ name: "Niko", age: 18 });
// 当然了，这是一个曲线救国的方式，无论如何 Promise 不会返回多个参数过来的
promisify(obj.getData)().then(console.log); // { name: 'Niko', age: 18 }

/**
 * 手写 promisify
 * @param {*} func
 * @returns
 */

const promisify = function (func) {
  return (...args) => {
    return new Promise((resolve, reject) => {
      /**
       * func 的最后一个参数就是callback回调(例如下面的使用方法 func = fs.readFile)
       * func("1.txt", (err, data) => {})
       */
      func(...args, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  };
};

// 官方的用法
const { promisify } = require("util");
const fs = require("fs");

fs.readFile("1.txt", (err, data) => {});


// promisify(func)返回的是一个包装promise执行func的函数 promisify(func)(...arg)返回的是一个Promsie
const newReadFile = promisify(fs.readFile);

/**
 * 使用promisify将fs.readFile这个函数转化成promise对象
 * 执行完newReadFile("1.txt")返回的是一个promise
 */
newReadFile("1.txt")
  .then((data) => {
    console.log("正确的数据");
  })
  .catch((err) => {
    console.log("错误");
  });

// 也可以使用 async/await

try {
  const data = await newReadFile("1.txt");
  console.log("正确的数据",data);
} catch (e) {
  console.log("错误");
}
