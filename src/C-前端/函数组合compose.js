/**
 * 函数式编程之组合与管道
 * 函数组合 - compose 函数 与 pointfree 概念
 * 
 * 在 UNix/Linux 中称管道 pipe; 在 webpack 中称函数组合compose，都是一个概念
 *
 * compose函数的作用就是组合函数，依次组合传入的函数：
 * 1. 后一个函数作为前一个函数的参数
 * 2. 最后一个函数可以接受多个参数，前面的函数只能接受单个参数；后一个的返回值传给前一个
 * 类似于 fn3(fn2(fn1(fn0(x))))
 * 
 * 应用场景：webpack 的 loader 机制 多 loader 从右向左处理就用的 compose 函数组合的编程思想实现
 * 函数组合的两种情况：
 * Unix 的 pipline
 * Compose（Webpack 采用）
 * Loader 是 webpack 的核心概念之一，它的基本工作流是将一个文件以字符串的形式读入，对其进行语法分析及转换，
 * 然后交由下一环节进行处理，所有载入的模块最终都会经过 moduleFactory 处理，
 * 转成 JavaScript 可以识别和运行的代码，从而完成模块的集成。
 * 
 * 
 *
 * https://github.com/mqyqingfeng/Blog/issues/45
 */

// 函数式编程之组合与管道
 function compose() {
  let args = arguments;
  let start = args.length - 1;
  let result;
  return function() {
      result = args[start].apply(this, arguments);
      while(start--) {
          result = args[start].call(this, result);
      }
      return result;
  }
}

// 与 compose 一样，一样的概念
function pipe() {
  let args = arguments;
  let start = 0;
  let result;
  return function () {
      result = args[start].apply(this, arguments);
      while(start--) {
          result = args[start].call(this, result);
      }
      return result;
  }
}

/**
 * 方法一 reduce 实现 (推荐)
 *
 * compose(f4,f3,f2,f1)(c,d,e)
 * compose(f4,f3,f2,f1)返回的是一个函数
 * 
 * 核心 fn1(fn2(fn3(1,2))) 转化为 compose(fn1,fn2,fn3)(1,2)
 *
 * reduce回调函数第一次执行时，返回值为 函数 (...args) => f4(f3(...args))，作为下一次执行的a参数
 * 回调函数第二次执行时，返回值为 函数(...args) => f4(f3(f2(...args))),作为下一次执行的a参数
 * 回调函数第三次执行时，返回值为 函数(...args) => f4(f3(f2(f1(...args))))
 * 最右边的参数f1可以接受多个参数，然后返回结果传给下一个函数f2,返回结果再传入f3··· f3最先被调用，会等待f2的结果，再等待f1的结果。
 *
 * 那么如果想从左到右返回结果呢?
 * 1. 使用reduceRight
 * 2. 将funcs倒序
 * webpack - loader 执行原理
 * redux compose 原理
 * lodash flow、flowRight
 */
function compose(...funcs) {
  //没有传入函数参数，就返回一个默认函数（直接返回参数）
  if (funcs.length === 0) {
    return (arg) => arg;
  }

  if (funcs.length === 1) {
    // 单元素数组时调用reduce，会直接返回该元素，不会执行callback;所以这里手动执行
    return funcs[0];
  }
  // 依次拼凑执行函数
  return funcs.reduce((a, b) => (...args) => a(b(...args)));
}

function composeRight(...funcs) {
  //没有传入函数参数，就返回一个默认函数（直接返回参数）
  if (funcs.length === 0) {
    return (arg) => arg;
  }

  if (funcs.length === 1) {
    // 单元素数组时调用reduce，会直接返回该元素，不会执行callback;所以这里手动执行
    return funcs[0];
  }
  // 依次拼凑执行函数
  return funcs.reduceRight((a, b) => (...args) => a(b(...args)));
}

// 测试
let a = (x, y) => x + y,
  b = (x) => x * x,
  c = (x) => (x === 0 ? x : 1 / x);

compose(c, b, a)(1, 2); // 1/9
composeRight(a, b, c)(1, 2); // 1/9

/**
 * 方法二 迭代
 * 用迭代的方式实现从右到左依次执行的组合函数。
 *
 * 通过index来标记应该执行哪个函数，这里是从最右边（length - 1）开始执行的，
 * 每执行一个index就减1，直到index为0（最左边）为止。
 * 用result来记录每次函数执行的返回值，每次都会更新，直到所有函数都执行完。才会返回最终结果
 * 如果传递的函数列表为空，则返回传入参数。
 *
 * 同样的如果需要从左到右依次执行，则将funcs倒序即可。
 */
function compose(...funcs) {
  let length = funcs.length;

  return function (...arg) {
    let index = length - 1,
      result = length > 0 ? funcs[index].apply(this, arg) : arg; //注意arg为数组，要用apply
    while (--index >= 0) {
      result = funcs[index].call(this, result);
    }
    return result;
  };
}

/**
 * 方法三 underscore源码 的 compose 函数的实现
 * 和上面迭代实现一样
 */
function compose() {
  var args = arguments;
  var start = args.length - 1;
  return function () {
    var i = start;
    var result = args[start].apply(this, arguments);
    while (i--) result = args[i].call(this, result);
    return result;
  };
}

/**
 * pointfree
 *
 * pointfree 指的是函数无须提及将要操作的数据是什么样的。
 *
 * 例如有以下需求 输入 'kevin daisy kelly'，返回 'K.D.K'
 * 从这个例子可以看出：利用柯里化（curry）和函数组合 (compose) 非常有助于实现 pointfree。
 *
 * Pointfree 的本质就是使用一些通用的函数，组合出各种复杂运算。
 * 上层运算不要直接操作数据，而是通过底层函数去处理。即不使用所要处理的值，只合成运算过程。
 * 那么使用 pointfree 模式究竟有什么好处呢？
 * pointfree 模式能够帮助我们减少不必要的命名，让代码保持简洁和通用，更符合语义，更容易复用，测试也变得轻而易举。
 */
// 非 pointfree，因为提到了数据：name
var initials = function (name) {
  return name.split(" ").map(compose(toUpperCase, head)).join(". ");
};

// pointfree
// 先定义基本运算
var split = curry(function (separator, str) {
  return str.split(separator);
});
var head = function (str) {
  return str.slice(0, 1);
};
var toUpperCase = function (str) {
  return str.toUpperCase();
};
var join = curry(function (separator, arr) {
  return arr.join(separator);
});
var map = curry(function (fn, arr) {
  return arr.map(fn);
});

var initials = compose(join("."), map(compose(toUpperCase, head)), split(" "));

initials("kevin daisy kelly");

// 这样写很麻烦 我们还需要定义那么多的基础函数 使用 ramda.js 库 可以方便写出
var initials = R.compose(
  R.join("."),
  R.map(R.compose(R.toUpper, R.head)),
  R.split(" ")
);

/**
 * pointfree 实战
 *
 * 有以下数据写一个名为 getIncompleteTaskSummaries 的函数，接收一个 username 作为参数，从服务器获取数据，
 * 然后筛选出这个用户的未完成的任务的 ids、priorities、titles、和 dueDate 数据，并且按照日期升序排序
 */
var data = {
  result: "SUCCESS",
  tasks: [
    {
      id: 104,
      complete: false,
      priority: "high",
      dueDate: "2013-11-29",
      username: "Scott",
      title: "Do something",
      created: "9/22/2013",
    },
    {
      id: 105,
      complete: false,
      priority: "medium",
      dueDate: "2013-11-22",
      username: "Lena",
      title: "Do something else",
      created: "9/22/2013",
    },
    {
      id: 107,
      complete: true,
      priority: "high",
      dueDate: "2013-11-22",
      username: "Mike",
      title: "Fix the foo",
      created: "9/22/2013",
    },
    {
      id: 108,
      complete: false,
      priority: "low",
      dueDate: "2013-11-15",
      username: "Punam",
      title: "Adjust the bar",
      created: "9/25/2013",
    },
    {
      id: 110,
      complete: false,
      priority: "medium",
      dueDate: "2013-11-15",
      username: "Scott",
      title: "Rename everything",
      created: "10/2/2013",
    },
    {
      id: 112,
      complete: true,
      priority: "high",
      dueDate: "2013-11-27",
      username: "Lena",
      title: "Alter all quuxes",
      created: "10/5/2013",
    },
  ],
};

/**
 * 第一版 过程式编程
 *
 */
var fetchData = function () {
  // 模拟
  return Promise.resolve(data);
};

var getIncompleteTaskSummaries = function (membername) {
  return fetchData()
    .then(function (data) {
      return data.tasks;
    })
    .then(function (tasks) {
      return tasks.filter(function (task) {
        return task.username == membername;
      });
    })
    .then(function (tasks) {
      return tasks.filter(function (task) {
        return !task.complete;
      });
    })
    .then(function (tasks) {
      return tasks.map(function (task) {
        return {
          id: task.id,
          dueDate: task.dueDate,
          title: task.title,
          priority: task.priority,
        };
      });
    })
    .then(function (tasks) {
      return tasks.sort(function (first, second) {
        var a = first.dueDate,
          b = second.dueDate;
        return a < b ? -1 : a > b ? 1 : 0;
      });
    })
    .then(function (task) {
      console.log(task);
    });
};

getIncompleteTaskSummaries("Scott");

/**
 * 第二版 pointfree 改写
 */
var fetchData = function () {
  return Promise.resolve(data);
};

// 编写基本函数
var prop = curry(function (name, obj) {
  return obj[name];
});

var propEq = curry(function (name, val, obj) {
  return obj[name] === val;
});

var filter = curry(function (fn, arr) {
  return arr.filter(fn);
});

var map = curry(function (fn, arr) {
  return arr.map(fn);
});

var pick = curry(function (args, obj) {
  var result = {};
  for (var i = 0; i < args.length; i++) {
    result[args[i]] = obj[args[i]];
  }
  return result;
});

var sortBy = curry(function (fn, arr) {
  return arr.sort(function (a, b) {
    var a = fn(a),
      b = fn(b);
    return a < b ? -1 : a > b ? 1 : 0;
  });
});

var getIncompleteTaskSummaries = function (membername) {
  return fetchData()
    .then(prop("tasks"))
    .then(filter(propEq("username", membername)))
    .then(filter(propEq("complete", false)))
    .then(map(pick(["id", "dueDate", "title", "priority"])))
    .then(sortBy(prop("dueDate")))
    .then(console.log);
};

getIncompleteTaskSummaries("Scott");

/**
 * 第三版 使用 ramda.js
 * 可以省去编写基本函数
 */
var fetchData = function () {
  return Promise.resolve(data);
};

var getIncompleteTaskSummaries = function (membername) {
  return fetchData()
    .then(R.prop("tasks"))
    .then(R.filter(R.propEq("username", membername)))
    .then(R.filter(R.propEq("complete", false)))
    .then(R.map(R.pick(["id", "dueDate", "title", "priority"])))
    .then(R.sortBy(R.prop("dueDate")))
    .then(console.log);
};

getIncompleteTaskSummaries("Scott");

/**
 * 第四版 使用 compose
 * compose 是从右到左依此执行，当然你也可以写一个从左到右的版本，但是从右向左执行更加能够反映数学上的含义
 * @returns 
 */
var fetchData = function () {
  return Promise.resolve(data);
};

var getIncompleteTaskSummaries = function (membername) {
  return fetchData().then(
    R.compose(
      console.log,
      R.sortBy(R.prop("dueDate")),
      R.map(R.pick(["id", "dueDate", "title", "priority"])),
      R.filter(R.propEq("complete", false)),
      R.filter(R.propEq("username", membername)),
      R.prop("tasks")
    )
  );
};

getIncompleteTaskSummaries("Scott");

/**
 * 第五版 使用 R.pipe
 * ramda.js 提供了一个 R.pipe 函数，可以做的从左到右，以上可以改写为：
 * @param {*} membername 
 * @returns 
 */
var getIncompleteTaskSummaries = function(membername) {
  return fetchData()
      .then(R.pipe(
          R.prop('tasks'),
          R.filter(R.propEq('username', membername)),
          R.filter(R.propEq('complete', false)),
          R.map(R.pick(['id', 'dueDate', 'title', 'priority'])
          R.sortBy(R.prop('dueDate')),
          console.log,
      ))
};