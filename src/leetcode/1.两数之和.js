/*
 * @lc app=leetcode.cn id=1 lang=javascript
 *
 * [1] 两数之和
 * 给定一个整数数组 nums 和一个整数目标值 target，请你在该数组中找出和为目标值的那两个整数，并返回它们的数组下标。
 * 你可以假设每种输入只会对应一个答案。但是，数组中同一个元素在答案里不能重复出现。
 * 
 * 解题思路
 * 1. 暴力法：双层for循环
 * 2. 哈希表法
 * 3. 快排+二分查找
 *
 */

// @lc code=start
/**
 * 利用哈希表
 *
 * 时间复杂度：O(n)
 * 空间复杂度：O(n)
 * 
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function (nums, target) {
  let hash = new Map();
  for (let i = 0; i < nums.length; i++) {
    let diff = target - nums[i];
    if (hash.has(diff)) {
      return [hash.get(diff), i];
    } else {
      hash.set(nums[i], i);
    }
  }
  return [];
};

/**
 * 方法三 快排 + 二分查找
 * 
 * 现在的数据是无序的，可以先将数组排序（使用时间复杂度较小的排序算法），
 * js的sort排序也还挺快的，时间复杂度是O(nlogn)，
 * 排序后发现最小的数在最左边，最大的数在最右边，接着可以用二分查找配对，
 * 左边的数加右边的数判断是否等于10。如果大于10，右边的数向左寻找；小于10，左边的数向右寻找。
 * 二分查找的时间复杂度O(logn)，综合起来解决这个问题的时间复杂度为O(nlogn)，
 * 没有用到额外的数据空间，空间复杂度为O(1)。
 * 
 */
// @lc code=end
