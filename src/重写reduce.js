/**
 * 重写 reduce
 *
 * reduce(callback(accumulator,currentValue,index,array),initialValue): Array
 * initialValue作为第一次调用 callback 函数时的第一个参数的值。
 * 如果没有提供初始值，则将使用数组中的第一个元素。
 *
 * 在没有初始值的空数组上调用 reduce 将报错。
 *
 * 返回值：函数累计处理的结果 accumulator
 *
 * 为数组中的每一个元素依次执行callback函数，不包括数组中被删除或从未被赋值的元素
 *
 * 如果调用reduce()时提供了initialValue，
 * accumulator取值为initialValue，currentValue取数组中的第一个值，index为0；
 * accumnlator = initialValue; currentValue = arr[0]; index = 0;
 *
 * 如果没有提供 initialValue，
 * 那么accumulator取数组中的第一个值，currentValue取数组中的第二个值, index为1。
 * accumnlator = arr[k]; currentValue = arr[k+1]; index = K; (k：是为了考虑稀疏数组的情况)
 */
Array.prototype.reduce = function (callback, initialValue) {
  if (this == undefined) {
    throw new TypeError("this is null or not undefined");
  }
  if (typeof callback !== "function") {
    throw new TypeError(callback + "is not a function");
  }
  const obj = Object(this);
  const len = obj.length >>> 0;
  let k = 0;
  let accumulator = initialValue;
  // 累加器 accumulator 初始值处理
  if (arguments.length >= 2) {
    accumulator = arguments[1]; // 如果提供了initialValue, accumulator取值为initialValue
  } else {
    while (k < len && !(k in obj)) {
      k++;
    }
    // 如果是一个空数组且没提供初始值initialValue 抛出异常
    if (k >= len) {
      throw new TypeError("Reduce of empty array " + "with no initial value");
    }
    accumulator = obj[k++]; // 如果没提供initialValue 那么accumulator取数组中的第一个值
  }
  while (k < len) {
    accumulator = callback(accumulator, obj[k], k, obj);
    k++;
  }
  return accumulator;
};

/**
 * 方法二
 */
Array.prototype.reduce = function (callback, initialValue) {
  let arr = Array.prototype.slice.call(this);
  let accumulator = null;
  let startIndex = 0;
  if (initialValue === undefined) {
    for (let i = 0; i < arr.length; i++) {
      if (!arr.hasOwnProperty(i)) continue;
      startIndex = i;
      accumulator = arr[i];
      break;
    }
  } else {
    accumulator = initialValue;
  }
  for (let i = ++startIndex; i < arr.length; i++) {
    if (!arr.hasOwnProperty(i)) continue;
    accumulator = callback.call(null, accumulator, arr[i], i, this);
  }
};

/**
 * 数组求和
 *
 * 累加器初始值 0
 */
const arr1 = [0, 1, 2, 3];
let res1 = arr1.reduce((acc, val, index, arr1) => {
  return acc + val;
}, 0);
console.log("重写reduce,数组求和 ->", res1);

/**
 * 累加对象数组里的值
 *
 * 将对象数组的x属性的值累加
 * 累加器初始值 0
 */
const arr2 = [{ x: 1 }, { x: 2 }, { x: 3 }];
let res2 = arr2.reduce((acc, val) => {
  return acc + val.x;
}, 0);
console.log("重写reduce,累加对象数组里的值 ->", res2);

/**
 * 将二维数组转化为一维
 *
 * 累加器初始值 []
 */
const arr3 = [
  [0, 1],
  [2, 3],
  [4, 5],
];
let res3 = arr3.reduce((acc, val) => {
  return acc.concat(val); // or  acc.push(...val)
}, []);
console.log("重写reduce,将二维数组转化为一维 ->", res3);

/**
 * 计算数组中每个元素出现的次数
 */
var arr4 = ["Alice", "Bob", "Tiff", "Bruce", "Alice"]; // { 'Alice': 2, 'Bob': 1, 'Tiff': 1, 'Bruce': 1 }
let res4 = arr4.reduce((acc, val) => {
  if (val in acc) {
    acc[val]++;
  } else {
    acc[val] = 1;
  }
  return acc;
}, {});

/**
 * 按属性对object分类
 */
let arr5 = [
  { name: "Alice", age: 21 },
  { name: "Max", age: 20 },
  { name: "Jane", age: 20 },
];
function groupBy(arr, property) {
  let res = arr.reduce((acc, val) => {
    let key = val[property];
    if (!acc[key]) {
      // !(key in acc) 判断key是否是acc的属性，不是设置此属性并置为[]
      acc[key] = [];
    }
    acc[key].push(val);
    return acc;
  }, {});
  return res;
}

console.log("重写reduce,按属性对object分类 ->", groupBy(arr5, "age"));

/**
 * 数组去重
 * reduce + indexOf/includes
 * 不能去除引用类型数据和NaN，但可去除基本类型数据包括null,undefined
 */
const arr6 = [
  0,
  0,
  undefined,
  "a",
  null,
  {},
  null,
  "a",
  [],
  undefined,
  {},
  [],
  NaN,
  true,
  new Date(),
  NaN,
  /a/,
  new Date(),
  true,
  /a/,
];
function duplicate(arr) {
  return arr.reduce((acc, val) => {
    if (acc.indexOf(val) === -1) {
      //!acc.includes(val)
      acc.push(val);
    }
    return acc;
  }, []);
}
console.log("重写reduce,数组去重 ->", duplicate(arr6));

/**
 * 数组扁平化
 * reduce + push
 * 可去除数组空项
 */
const arr7 = [1, , [2, [3, [{ a: [4] }, 5, ["", null, undefined]]]], 6];
function depthFlat(arr, depth = 1) {
  let result = [];
  arr.reduce((acc, val) => {
    if (Array.isArray(val) && depth > 0) {
      result.push(...depthFlat(val, --depth));
    } else {
      result.push(val);
    }
  }, []);
  return result;
}
console.log("重写reduce,数组扁平化 ->", depthFlat(arr7, Infinity));

/**
 * 按顺序运行Promise(重要)
 * Promise.all() ?
 * 返回 Promise 对象
 */
// promise function 1
function p1(a) {
  return new Promise((resolve, reject) => {
    resolve(a * 5);
  });
}

// promise function 2
function p2(a) {
  return new Promise((resolve, reject) => {
    resolve(a * 2);
  });
}

// function 3  - will be wrapped in a resolved promise by .then()
function f3(a) {
  return a * 3;
}

// promise function 4
function p4(a) {
  return new Promise((resolve, reject) => {
    resolve(a * 4);
  });
}

const promiseArr = [p1, p2, f3, p4];

function runPromiseInSequence(arr, input) {
  return arr.reduce((promiseChain, currentFunction) => {
    console.log(promiseChain);
    return promiseChain.then(currentFunction);
  }, Promise.resolve(input));
}

runPromiseInSequence(promiseArr, 10).then((resolve, reject) => {
  console.log("重写reduce,按顺序运行Promise ->", resolve, reject);
});
