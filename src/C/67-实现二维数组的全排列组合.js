/**
 * 二维数组的全排列组合
 *
 * 例如
 * var arr =[[‘A’,’B’],[‘a’,’b’],[1,2]] 求二维数组的全排列组合
 * 结果：Aa1,Aa2,Ab1,Ab2,Ba1,Ba2,Bb1,Bb2
 */

/**
 * 方法一
 * @param {*} arr
 * @returns
 */
function foo(arr) {
  // 用于记录初始数组长度, 用于将数组前两组已经获取到全排列的数组进行截取标识
  var len = arr.length;
  // 当递归操作后, 数组长度为1时, 直接返回arr[0], 只有大于1继续处理
  if (len >= 2) {
    // 每次只做传入数组的前面两个数组进行全排列组合, 即arr[0]和arr[1]的全排列组合
    var len1 = arr[0].length;
    var len2 = arr[1].length;
    var items = new Array(len1 * len2); // 创建全排列组合有可能次数的数组
    var index = 0; // 记录每次全排列组合后的数组下标
    for (var i = 0; i < len1; i++) {
      for (var j = 0; j < len2; j++) {
        if (Array.isArray(arr[0])) {
          // 当第二次进来后, 数组第一个元素必定是数组包着数组
          items[index] = arr[0][i].concat(arr[1][j]); // 对于已经是第二次递归进来的全排列直接追加即可
        } else {
          items[index] = [arr[0][i]].concat(arr[1][j]); // 这里因为只需要去arr[0]和arr[1]的全排列, 所以这里就直接使用concat即可
        }
        index++; // 更新全排列组合的下标
      }
    }
    // 如果数组大于2, 这里新的newArr做一个递归操作
    var newArr = new Array(len - 1); // 递归的数组比传进来的数组长度少一, 因为上面已经将传进来的数组的arr[0]和arr[1]进行全排列组合, 所以这里的newArr[0]就是上面已经全排列好的数组item
    for (var i = 2; i < arr.length; i++) {
      // 这里的for循环是为了截取下标1项后的数组进行赋值给newArr
      newArr[i - 1] = arr[i];
    }
    newArr[0] = items; // 因为上面已经将传进来的数组的arr[0]和arr[1]进行全排列组合, 所以这里的newArr[0]就是上面已经全排列好的数组item
    // 重新组合后的数组进行递归操作
    return foo(newArr);
  } else {
    // 当递归操作后, 数组长度为1时, 直接返回arr[0],
    return arr[0];
  }
}
var arr = [
  ["A", "B"],
  ["a", "b"],
  [1, 2],
];
console.log(foo(arr));

/**
 * 方法二
 * @param {*} arr1
 * @param {*} arr2
 * @returns
 */
const getResult = (arr1, arr2) => {
  if (!Array.isArray(arr1) || !Array.isArray(arr2)) {
    return;
  }
  if (!arr1.length) {
    return arr2;
  }
  if (!arr2.length) {
    return arr1;
  }
  let result = [];
  for (let i = 0; i < arr1.length; i++) {
    for (let j = 0; j < arr2.length; j++) {
      result.push(String(arr1[i]) + String(arr2[j]));
    }
  }
  return result;
};

const findAll = (arr) =>
  arr.reduce((total, current) => {
    return getResult(total, current);
  }, []);
var arr = [
  ["A", "B"],
  ["a", "b"],
  [1, 2],
];
console.log(findAll(arr));


/**
 * 方法三 回溯法
 * @param {*} arr 
 * @returns 
 */
const fullArray = (arr) => {
  const res = [];
  const traceBack = (path, n) => {
    if (path.length === arr.length) {
      res.push(path.slice());
      return;
    }
    for (const item of arr[n]) {
      traceBack(path + item, n + 1);
    }
  };
  traceBack("", 0);
  return res;
};
var arr = [
  ["A", "B"],
  ["a", "b"],
  [1, 2],
];
console.log(fullArray(arr));
