/**
 * 合并二维有序数组成一维有序数组，归并排序的思路
 *
 * [[1,2,3],[4,5,6],[7,8,9],[1,2,3],[4,5,6]]
 * [[1,4,6],[7,8,10],[2,6,9],[3,7,13],[1,5,12]]
 *
 * 思路：先扁平化而为一维数组再排序得到一维有序数组
 */

// 扁平化数组
const flatArray = function (arr, depth = 1) {
  return depth > 1
    ? arr.reduce((acc, val) => {
        return acc.concat(Array.isArray(val) ? flatArray(val, depth - 1) : val);
      }, [])
    : arr.slice();
};

// 排序
const margeSort = function (arr) {
  return arr.sort((a, b) => a - b);
};

// 测试
let arr = [
  [1, 4, 6],
  [7, 8, 10],
  [2, 6, 9],
  [3, 7, 13],
  [1, 5, 12],
];
console.log("方法1 ->", margeSort(flatArray(arr, 2)));

// 简写一下
function sortFlatArray(arr) {
  function flatArray(arr) {
    const newArr = arr.flat();
    return newArr.some((item) => Array.isArray(item))
      ? flatArray(newArr)
      : newArr;
  }
  if (!arr || !arr.length) {
    return [];
  }
  let flattenedArr = flatArray(arr);
  return flattenedArr.sort((a, b) => {
    return a - b;
  });
}
