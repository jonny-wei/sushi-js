/*
 * @lc app=leetcode.cn id=459 lang=javascript
 *
 * [459] 重复的子字符串
 */

// @lc code=start
/**
 * 方法一 正则表达式
 * @param {string} s
 * @return {boolean}
 */
var repeatedSubstringPattern = function (s) {
  return /^([a-z]+)\1+$/.test(s);
};

/**
 * 方法二
 * 若串是由一个字串重复多次形成，则将串尾首相接绕成一个圈，
 * 该串旋转一定位数，必定可以跟原来的位置重合
 * @param {*} s
 * @returns
 */
var repeatedSubstringPattern = function (s) {
  //截出来的部分为所有位移情况，保留原位向后移的情况
  let str = (s + s).slice(1, -1);
  return str.indexOf(s) === -1 ? false : true;
};
// 或
var repeatedSubstringPattern = function (s) {
  let str = s.repeat(2).slice(1, -1);
  return str.indexOf(s) !== -1;
};
// @lc code=end
