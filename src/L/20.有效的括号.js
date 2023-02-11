/*
 * @lc app=leetcode.cn id=20 lang=javascript
 *
 * [20] 有效的括号
 */

// @lc code=start
/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function (s) {
  let stack = [];
  s = s.split("");
  let len = s.length;
  if (len % 2) return false;
  let map = new Map([
    [")", "("],
    ["]", "["],
    ["}", "{"],
  ]);
  for (const char of s) {
    let matchChar = map.get(char);
    if (matchChar) {
      if (stack[stack.length - 1] !== matchChar) {
        return false;
      } else {
        stack.pop();
      }
    } else {
      stack.push(char);
    }
  }
  return !stack.length;
};
console.log(isValid("()[]{}"));
console.log(isValid("(]"));
console.log(isValid("([)]"));
console.log(isValid("{[]}"));

var isValid = function (s) {
  let stack = [];
  for (let i = 0; i < s.length; i++) {
    let char = s.charAt(i);
    if (["(", "[", "{"].includes(char)) {
      stack.push(char);
    } else {
      let char2 = stack.pop();
      if (
        (char2 === "(" && char === ")") ||
        (char2 === "[" && char === "]") ||
        (char2 === "{" && char === "}")
      ) {
        continue;
      } else {
        return false;
      }
    }
  }
  return !stack.length;
};
// @lc code=end
