/*
 * @lc app=leetcode.cn id=409 lang=javascript
 *
 * [409] 最长回文串
 */

// @lc code=start
/**
 * 方法一 使用map统计字符串 利用回文串 中位字符 + 偶数特性
 * @param {string} s
 * @return {number}
 */
var longestPalindrome = function (s) {
  let map = new Map();
  for (let i = 0; i < s.length; i++) {
    let char = s.charAt(i);
    if (map.has(char)) {
      map.set(char, map.get(char) + 1);
      if (map.get(char) % 2 === 0) {
        map.delete(char);
      }
    } else {
      map.set(char, 1);
    }
  }
  return map.size === 0 ? s.length : s.length - map.size + 1;
};
console.log(longestPalindrome("ccccdd"));
console.log(longestPalindrome("abccccdd"));
// @lc code=end
