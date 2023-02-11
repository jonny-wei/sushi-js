/*
 * @lc app=leetcode.cn id=58 lang=javascript
 *
 * [58] 最后一个单词的长度
 */

// @lc code=start
/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLastWord = function (s) {
  return s.split(" ").filter(Boolean)?.pop()?.length ?? 0;
};
console.log(lengthOfLastWord("Hello World"));
console.log(lengthOfLastWord(" "));
console.log(lengthOfLastWord("a "));
// @lc code=end
