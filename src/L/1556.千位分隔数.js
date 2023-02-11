/*
 * @lc app=leetcode.cn id=1556 lang=javascript
 *
 * [1556] 千位分隔数
 */

// @lc code=start
/**
 * @param {number} n
 * @return {string}
 */
var thousandSeparator = function (n) {
  let re = /(?=(?!\b)(\d{3})+$)/g;
  return ("" + n).replace(re, ".");
};

// 方法二
var thousandSeparator = function (n) {
  if (n < 1000) {
    return `${n}`;
  }
  n = n.toString().split("");
  for (let i = n.length - 3; i > 0; i = i - 3) {
    n.splice(i, 0, ".");
  }
  return n.join("");
};
// @lc code=end
