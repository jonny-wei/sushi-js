/**
 * 最小的K个数
 *
 * 给定一个数组，找出其中最小的K个数。例如数组元素是4,5,1,6,2,7,3,8这8个数字，
 * 则最小的4个数字是1,2,3,4。如果K>数组的长度，那么返回一个空的数组
 * 注意不是比小于等于K的数
 *
 * 输入： arr = [1,3,5,7,2,4,6,8], k = 4
 * 输出： [1,2,3,4]
 *
 * 解题思路
 * 1. 排序(Array.sort() + slice取出前 k 个数)，对原数组从小到大排序后取出前 k 个数
 * 时间复杂度：O(nlogn)，其中 n 是数组 arr 的长度。算法的时间复杂度即排序的时间复杂度。
 * 空间复杂度：O(logn)，排序所需额外的空间复杂度为 O(logn)。
 * 2. 堆
 * 3. 利用快速排序思想
 */

/**
 * 方法一 排序(Array.sort() + slice取出前 k 个数)
 */
var smallestK = function (arr, k) {
  return arr.sort((a, b) => a - b).slice(0, k);
};


