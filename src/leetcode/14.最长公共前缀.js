/*
 * @lc app=leetcode.cn id=14 lang=javascript
 *
 * [14] 最长公共前缀
 * 方法: 横向比较，纵向比较，分治法，二分查找法
 */

// @lc code=start
/**
 * 横向比较，前后两两比较找出公共前缀
 * @param {string[]} strs
 * @return {string}
 */
var longestCommonPrefix = function (strs) {
  if (!strs.length) return "";
  let prefix = strs[0];
  for (let i = 1; i < strs.length; i++) {
    let j = 0;
    for (; j < strs[i].length; j++) {
      if (prefix.charAt(j) !== strs[i][j]) {
        break;
      }
    }
    prefix = prefix.substring(0, j);
    if (prefix === "") return prefix;
  }
  return prefix;
};

// 解法2
var longestCommonPrefix = function (strs) {
  let str = strs[0];
  if (!str) return "";
  let res = "";
  for (let i = 0; i < str.length; i++) {
    let flag = strs.every((item) => item[i] == str[i]);
    if (flag) {
      res += str[i];
    } else {
      return res;
    }
  }
  return res;
};
console.log(longestCommonPrefix(["flower", "flow", "flight"]));
console.log(longestCommonPrefix(["dog", "racecar", "car"]));
// @lc code=end
