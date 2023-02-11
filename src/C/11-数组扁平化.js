/**
 * 数组扁平化
 *
 * 数组扁平化是指将一个多维数组变为一个一维数组
 *
 * 推荐方法1，替代推荐方法2,方法3及其改进型
 * 
 * https://github.com/mqyqingfeng/Blog/issues/36
 */
const arr = [1, , [2, [3, [{ a: [4] }, 5, ["", null, undefined]]]], 6];

/**
 * 方法1
 *
 * 使用 Array.flat(depth)
 *
 * 按照一个可指定的深度递归遍历数组，并将所有元素与遍历到的子数组中的元素合并为一个新数组返回。
 * depth 指定要提取嵌套数组的结构深度，默认值为 1。
 * depth = Infinity 可展开任意深度的嵌套数组
 * 扁平化数组空项[1, 2, , 4, 5].flat(Infinity) => [1,2,4,5]
 * 如果原数组有空位，Array.prototype.flat() 会跳过空位。
 * 传入 <=0 的整数将返回原数组，不扁平化
 * 不传参数时，默认扁平化一层，可以传入一个整数，表示想要扁平化的层数。
 */
const flat1 = arr.flat(Infinity);
console.log("方法1 ->", flat1);

/************* 利用迭代器 ***************/

/**
 * 方法2
 * 使用 reduce 与 concat
 * reduce+isArray+concat+递归
 * 可去除数组空项
 */

function flatDeep(arr, d = 1) {
  return d > 0
    ? arr.reduce(
        (acc, val) =>
          acc.concat(Array.isArray(val) ? flatDeep(val, d - 1) : val), // return
        []
      )
    : arr.slice();
}

const flat2 = flatDeep(arr, Infinity);
console.log("方法2 ->", flat2);
/**
 * 方法2改进
 * 使用 reduce + push
 */
function flatDeep2(arr, depth = 1) {
  let result = [];
  arr.reduce((acc, val) => {
    if (Array.isArray(val) && depth > 0) {
      result.push(...flatDeep2(val, --depth));
    } else {
      result.push(val);
    }
    return acc;
  }, []);
  return result;
}
console.log("方法2改进版 ->", flatDeep2(arr, Infinity));

/**
 * 方法3
 * 使用 forEach 循环
 * forEach+isArray+push+递归+立即执行函数
 * forEach: 天然去除数组空项但不去除 undefined
 */
function eachFlat(arr, depth) {
  const result = [];
  (function flat(arr, depth) {
    arr.forEach((item) => {
      if (Array.isArray(item) && depth > 0) {
        flat(item, depth - 1);
      } else {
        result.push(item);
      }
    });
  })(arr, depth);
  return result;
}
const flat3 = eachFlat(arr, Infinity);
console.log("方法3 ->", flat3);
/**
 * 方法3改进
 */
function eachFlat33(arr, depth) {
  const result = [];
  arr.forEach((item) => {
    if (Array.isArray(item) && depth > 0) {
      result.push(...eachFlat33(item, depth - 1));
    } else {
      result.push(item);
    }
  });
  return result;
}
const flat33 = eachFlat33(arr, Infinity);
console.log("方法3改进 ->", flat33);

/**
 * 方法4
 * for...of-value循环
 * for...of+isArray+push+递归
 * 缺点 不能天然去除数组空项，需手动去除，同时去除了undefined
 */
function forFlat(arr, depth) {
  const result = [];
  (function flat(arr, depth) {
    for (let item of arr) {
      if (Array.isArray(item) && depth > 0) {
        flat(item, --depth);
      } else {
        item !== void 0 && result.push(item);
      }
    }
  })(arr, depth);
  return result;
}
const flat4 = forFlat(arr, Infinity);
console.log("方法4 ->", flat4);

/**
 * 方法5
 * map + isArray + push + 递归
 * 天然去除数组空项 但同时去除了undefined
 */
function mapFlat(arr, depth = 1) {
  const result = [](function flat(arr, depth) {
    arr.map((item) => {
      if (Array.isArray(item) && depth > 0) {
        flat(arr, --depth);
      } else {
        result.push(item);
      }
    });
  })(arr, depth);
  return result;
}
const flat5 = forFlat(arr, Infinity);
console.log("方法5 ->", flat5);

/************* 利用字符串(不推荐) ***************/

/**
 * 方法6
 * 使用正则
 * 1. 利用JSON.stringify()将对象转为字符串
 * 2. 使用正则去[]符号
 * 3. 使用splice(',')生成数组
 * 缺点：数组中的元素最后都成了字符串,无法去除空项, 且由于字符串正则匹配导致{a:[4]} => {a:4}, undefined -> null
 * 没控制depth 扁平化层级
 */
const flat6 = JSON.stringify(arr).replace(/\[|\]/g, "").split(",");
console.log("方法6 ->", flat6);
/**
 * 方法6进化
 * 使用正则
 * 1. 利用JSON.stringify()将对象转为字符串
 * 2. 使用正则去[]符号
 * 3. 利用JSON.Parse()转为数组
 * 缺点：,无法去除空项, 由于字符串正则匹配导致{a:[4]} => {a:4} undefined -> null
 */
const flat66 = JSON.parse(
  "[" + JSON.stringify(arr).replace(/\[|\]/g, "") + "]"
);
console.log("方法2进化 ->", flat66);

/**
 * 方法7
 * 使用toString()
 * 缺点最多 组中元素都是Number或者String类型的才能用
 */

const flat7 = arr
  .toString()
  .split(",")
  .map((item) => +item);
console.log("方法7 ->", flat7);
