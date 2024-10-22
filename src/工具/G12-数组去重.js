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
const uniqueArray1 = [...new Set(arr)];
console.log("方法1 ->", uniqueArray1);

/**
 * 方法2 （推荐）
 * 
 * 数组去重就是比较值与类型是否都相等(即===全等)
 * 利用值与类型是否都相等，使用 typeof item 类型 + item值 组成一个字符串
 * 通用的数组去重
 * 
 * JSON.stringify来转换对象、数组、正则表达式和日期，以便可以将它们作为键使用。但是，请注意，这种方法对于复杂的对象或包含循环引用的对象可能不适用，并且对于大型数据集可能效率不高。
 * 
 */
function uniqueArray2(arr) {
  const seen = new Set();
  const uniqueArr = arr.filter(item => {
    // 尝试将item转换为JSON字符串
    const key = JSON.stringify(item);
    if (!seen.has(key)) {
      seen.add(key);
      return true;
    }
    return false;
  });
  return uniqueArr;
}
const arr2 = uniqueArray2(arr);
console.log("方法2 ->", arr2);

/************** 循环迭代加判断(大同小异) *************/

/**
 * 方法3
 * 双重for循环 + splice(item,1)(不推荐)
 * 缺点较多：需要排好序，不能去null，undefined和引用类型数据
 */

function uniqueArray3(data) {
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
const arr3 = uniqueArray3(arr);
console.log("方法3 ->", arr3);
/**
 * 方法4
 * 循环 + indexOf/includes
 * 不能去null，undefined和引用类型数据
 */
function uniqueArray4(data) {
  const result = [];
  for (let item of data) {
    if (result.indexOf(item) === -1) {
      result.push(item);
    }
  }
  return data;
}
const arr4 = uniqueArray4(arr);
console.log("方法4 ->", arr4);

/**
 * 方法5
 * reduce + indexOf/includes
 * 和[...new Set(arr)] 方法一除了不能去除引用类型数据，唯一的不同就是不能去除NaN
 * 缺点：不能去除引用类型数据和NaN，但可去除基本类型数据包括null,undefined
 */
function uniqueArray5(arr) {
  return arr.reduce((acc, val) => {
    if (acc.indexOf(val) === -1) {
      //!acc.includes(val)
      acc.push(val);
    }
    return acc;
  }, []);
}

console.log("方法5 ->", uniqueArray5(arr));
