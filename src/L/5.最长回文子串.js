/*
 * @lc app=leetcode.cn id=5 lang=javascript
 *
 * [5] 最长回文子串
 * 
 * 给你一个字符串 s，找到 s 中最长的回文子串。
 */

// @lc code=start
/**
 * 方法一：动态规划
 * 解题思路
 * 对于一个子串而言，如果它是回文串，并且长度大于2，那么将它首尾的两个字母去除之后，它仍然是个回文串。
 * 例如 'ababa' , 'bab'是回文串，那么'ababa'一定是回文串，这是因为它的首尾两个字母都是 'a'。
 * @param {string} s
 * @return {string}
 */
var longestPalindrome = function(s) {

};
// @lc code=end

