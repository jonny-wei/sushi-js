/**
 * 数组去重
 * 
 * 推荐方法2
 * 
 * https://github.com/mqyqingfeng/Blog/issues/27
 */
const arr = [
  0,
  0,
  1,
  2,
  undefined,
  2,
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

/**
 * 方法1
 * 
 * new Set
 * 
 * 缺点 只去重一些基本类型数据 Number(NaN), String, Boolean, null, undefined
 * 不能去重引用类型数据 Object Array RegExp Date
 */
const deplicates1 = [...new Set(arr)];
console.log("方法1 ->", deplicates1);

/**
 * 方法2 （强烈推荐使用）
 * filter + obj[typeof item + JSON.stringify(item)]
 * 数组去重就是比较值与类型是否都相等(即===全等)
 * 利用值与类型是否都相等，使用 typeof item 类型 + item值 组成一个字符串
 * 通用的数组去重
 * 
 * 
 */
function removeDeplicates(arr) {
  let obj = {};
  return arr.filter((item) => {
    if (obj[typeof item + JSON.stringify(item)]) {
      return false;
    } else {
      obj[typeof item + JSON.stringify(item)] = true;
      return true;
    }
  });
}
const deplicates2 = removeDeplicates(arr);
console.log("方法2 ->", deplicates2);

/************** 循环迭代加判断(大同小异) *************/

/**
 * 方法3
 * 双重for循环 + splice(item,1)(不推荐)
 * 缺点较多：需要排好序，不能去null，undefined和引用类型数据
 */

function forDeplicates(data) {
  let len = data.length;
  for (let i = 0; i < len; i++) {
    for (let j = i + 1; j < len; j++) {
      if (data[i] === data[j]) {
        data.splice(i, 1); // 删除
      }
      len--;
      j--;
    }
  }
  return data;
}
const deplicates3 = forDeplicates(arr);
console.log("方法3 ->", deplicates3);
/**
 * 方法4
 * 循环 + indexOf/includes
 * 不能去null，undefined和引用类型数据
 */
function indexOfDeplicates(data) {
  const result = [];
  for (let item of data) {
    if (result.indexOf(item) === -1) {
      result.push(item);
    }
  }
  return data;
}
const deplicates4 = indexOfDeplicates(arr);
console.log("方法4 ->", deplicates4);

/**
 * 方法5
 * reduce + indexOf/includes
 * 和[...new Set(arr)] 方法一除了不能去除引用类型数据，唯一的不同就是不能去除NaN
 * 缺点：不能去除引用类型数据和NaN，但可去除基本类型数据包括null,undefined
 */
function reduceDuplicate(arr) {
  return arr.reduce((acc, val) => {
    if (acc.indexOf(val) === -1) {
      //!acc.includes(val)
      acc.push(val);
    }
    return acc;
  }, []);
}

console.log("方法5 ->", reduceDuplicate(arr));
