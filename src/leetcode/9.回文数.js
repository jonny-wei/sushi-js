/*
 * @lc app=leetcode.cn id=9 lang=javascript
 *
 * [9] 回文数
 *
 */

// @lc code=start
/**
 * 回文数是指正序（从左向右）和倒序（从右向左）读都是一样的整数。例如，121 是回文，而 123 不是。
 *
 * 解题思路
 * 字符串转数组然后反转，反转后再转字符串，前后比较
 * @param {number} x
 * @return {boolean}
 */
var isPalindrome = function (x) {
  const s = x.toString();
  return s.split("").reverse().join("") === s;
};
// @lc code=end
