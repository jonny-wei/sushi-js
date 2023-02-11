/*
 * @lc app=leetcode.cn id=434 lang=javascript
 *
 * [434] 字符串中的单词数
 */

// @lc code=start
/**
 * 方法一 正则表达式
 * @param {string} s
 * @return {number}
 */
var countSegments = function (s) {
  const regex = /[A-Za-z'-\S]+/g;
  let m = null;
  let count = 0;
  while ((m = regex.exec(s))) {
    count++;
  }
  return count;
};
console.log(countSegments(", , , ,        a, eaefa")); // 6
console.log(countSegments("love live! mu'sic forever")); // 4
// @lc code=end
