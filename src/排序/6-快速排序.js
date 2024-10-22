/**
 * 快速排序 Quick Sort
 *
 * 使用分治法（Divide and conquer）策略来把一个串行（list）分为两个子串行（sub-lists）
 * 快速排序又是一种分而治之思想在排序算法上的典型应用。
 * 本质上来看，快速排序应该算是在冒泡排序基础上的递归分治法。
 *
 * 算法原理
 * 1. 挑选基准值：从数列中挑出一个元素，称为 基准（pivot）哨兵
 * 2. 分割：重新排序数列，所有元素比基准值小的摆放在基准前面，所有比基准大的元素摆在基准的后面（相同的数可以到任意一边）。
 *    在这个分区退出之后，该基准就处于数列的中间位置。这个称为分区（partition）操作
 * 3. 递归排序子序列：递归地（recursive）把小于基准值元素的子数列和大于基准值元素的子数列排序
 *
 * 递归到最底部的判断条件是数列的大小是零或一，此时该数列显然已经有序。
 * 选取基准值有数种具体方法，此选取方法对排序的时间性能有决定性影响。
 *
 * 算法复杂度
 * 平均时间复杂度：O(nlogn)
 * 空间复杂度： O(logn) 【根据实现方式的不同而不同】 原地排序
 * 稳定性：不稳定
 * 
 * 三路快速排序法
 * 三路快速排序是快速排序的的一个优化版本， 将数组分成三段， 即小于基准元素、 等于基准元素和大于基准元素， 
 * 这样可以比较高效的处理数组中存在相同元素的情况,其它特征与快速排序基本相同。
 * 1. 随机选取基准值 pivot（支点随机选取）
 * 2. 配合着使用插入排序(当问题规模较小时，近乎有序时，插入排序表现的很好)
 * 3. 当大量数据，且重复数多时，用三路快排
 */

/**
 * 方法一 随机化快速排序法
 * @param {*} arr
 * @param {*} left
 * @param {*} right
 * @returns
 */
const quickSort = function (arr, left, right) {
  const len = arr.length;
  left = typeof left === "number" ? left : 0;
  right = typeof right === "number" ? right : len - 1;

  if (left < right) {
    let partitionIndex = left - 1;
    for (let i = left; i <= right; i++) {
      if (arr[i] <= arr[right]) {
        partitionIndex++;
        [arr[i], arr[partitionIndex]] = [arr[partitionIndex], arr[i]];
      }
    }

    quickSort(arr, left, partitionIndex - 1);
    quickSort(arr, partitionIndex + 1, right);
  }

  return arr;
};

/**
 * 双路快速排序法
 * @param {*} arr
 * @returns
 */
const quickSort = function (arr) {
  if (arr.length <= 1) {
    return arr;
  }
  let pivot = arr.splice(~~(arr.length / 2), 1)[0]; // 取位于数组的中间值 改变原数组
  let left = []; // 存在位于基准数左边的子集
  let right = []; // 存在位于基准数右边的子集

  while (arr.length) {
    if (arr[0] < pivot) {
      left.push(arr.shift());
    } else {
      right.push(arr.shift());
    }
  }

  return quickSort(left).concat(pivot, quickSort(right));
};

// 简化版
const quickSort = function (arr) {
  return arr.length <= 1
    ? arr
    : quickSort(arr.slice(1).filter((item) => item <= arr[0])).concat(
        arr[0],
        quickSort(arr.slice(1).filter((item) => item > arr[0]))
      );
};
