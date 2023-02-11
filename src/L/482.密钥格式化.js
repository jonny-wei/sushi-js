/*
 * @lc app=leetcode.cn id=482 lang=javascript
 *
 * [482] 密钥格式化
 */

// @lc code=start
/**
 * @param {string} s
 * @param {number} k
 * @return {string}
 */
var licenseKeyFormatting = function (s, k) {
  const strArr = s.replace(/-/g, "").split("");
  for (let i = strArr.length - 1; i > 0; i -= k) {
    let index = i - k + 1;
    if (index > 0) {
      strArr.splice(index, 0, "-");
    }
  }
  return strArr.join("").toLocaleUpperCase();
};
// @lc code=end
