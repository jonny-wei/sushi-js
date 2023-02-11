/*
 * @lc app=leetcode.cn id=1190 lang=javascript
 *
 * [1190] 反转每对括号间的子串
 *
 * (ed(et(oc))el) -> "leetcode"
 *
 * 对于括号序列相关的题目，通用的解法是使用递归或栈。
 *
 * 首先处理内层括号,然后处理外层括号
 * 遇到 '(' 入栈一个单词，并清空。遇到 ')' 单词反转后 和出栈的单词拼接 
 */

// @lc code=start
/**
 * @param {string} s
 * @return {string}
 */
var reverseParentheses = function (s) {
  const stack = [];
  let str = "";
  for (const ch of s) {
    if (ch === "(") {
      stack.push(str);
      str = "";
    } else if (ch === ")") {
      str = str.split("").reverse().join("");
      str = stack[stack.length - 1] + str;
      stack.pop();
    } else {
      str += ch;
    }
  }
  return str;
};
// @lc code=end
