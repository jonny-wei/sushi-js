/**
 * 冒泡排序 Bubble Sort
 *
 * 是一种 交换排序，核心是冒泡，把数组中最小的那个往上冒，冒的过程就是和他相邻的元素交换、
 * 2 种方式进行冒泡，一种是先把小的冒泡到前边去，另一种是把大的元素冒泡到后边
 *
 * 算法原理：
 * (大的冒泡到最后为例)
 * 1. 比较相邻的元素，如果第一个比第二个大，就交换他们两个
 * 2. 对每对相邻元素作同样的工作，从开始第一对到结尾的最后一对，这部做完后，最后的元素会是最大的数
 * 3. 针对所有的元素重复以上的步骤，除了最后一个
 * 4. 持续每次对越来越少的元素重复上面的步骤，直到没有任何一对数字需要比较
 *
 * 第一个循环（外循环）：负责把需要冒泡的值排除在外
 * 第二个循环（内循环）：负责两两比较交换
 *
 * 双层 for 循环 前后元素两两比较并交换
 *
 * 算法复杂度:
 *
 * 平均时间复杂度：O(n^2)
 * 平均空间复杂度：O(1)原地排序
 * 稳定性：稳定
 * 排序方式：In-place 内排
 *
 */

/**
 * 方法一 简单冒泡
 * @param {*} arr 
 * @returns 
 */
const bubbleSort = function (arr) {
  console.log(`原始排序 `, arr);
  const len = arr.length;
  for (let i = 0; i < len; i++) {
    for (let j = 0; j < len - 1 - i; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
    console.log(`第 ${i} 次比较 `, arr);
  }
  return arr;
};

const arr = [5, 8, 2, 0, 1, 9, 3, 1, 4, 7, 6, 9];
console.log(bubbleSort(arr));

/**
 * 方法二 双向冒泡 正反冒泡 正向冒泡找到最大值，反向冒泡找到最小值
 * 冒泡排序的优化算法
 * @param {*} arr 
 * @returns 
 */
const bubbleSort = function (arr) {
  let low = 0;
  let high = arr.length - 1;
  let index = 0;
  while (low < high) {
    // 正向冒泡找最大值
    for (index = low; index < high; ++index) {
      if (arr[index] > arr[index + 1]) {
        [arr[index], arr[index + 1]] = [arr[index + 1], arr[index]];
      }
    }
    --high;
    // 反向冒泡取最小值
    for (index = high; index > low; --index) {
      if (arr[index] < arr[index - 1]) {
        [arr[index], arr[index - 1]] = [arr[index - 1], arr[index]];
      }
    }
    ++low;
  }
  return arr;
};