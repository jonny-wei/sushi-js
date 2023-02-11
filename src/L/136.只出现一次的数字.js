/*
 * @lc app=leetcode.cn id=136 lang=javascript
 *
 * [136] 只出现一次的数字
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
var singleNumber = function (nums) {
  if (!nums.length) return 0;
  let res = nums[0];
  for (let i = 1; i < nums.length; i++) {
    res ^= nums[i];
  }
  return res;
};
console.log(singleNumber([2, 2, 1]));
console.log(singleNumber([4, 1, 2, 1, 2]));
// @lc code=end
