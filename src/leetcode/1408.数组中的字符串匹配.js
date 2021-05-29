/*
 * @lc app=leetcode.cn id=1408 lang=javascript
 *
 * [1408] 数组中的字符串匹配
 */

// @lc code=start
/**
 * @param {string[]} words
 * @return {string[]}
 */
var stringMatching = function (words) {
  let ws = [];
  for (let word of words) {
    if (words.some((w) => word !== w && w.includes(word))) {
      ws = [...ws, word];
    }
  }
  return ws;
};
// @lc code=end
