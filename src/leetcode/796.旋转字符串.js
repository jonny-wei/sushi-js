/*
 * @lc app=leetcode.cn id=796 lang=javascript
 *
 * [796] 旋转字符串
 */

// @lc code=start
/**
 * @param {string} s
 * @param {string} goal
 * @return {boolean}
 */
var rotateString = function (s, goal) {
  if (s === goal) return true;
  let str = s;
  for (let i = 0; i < s.length; i++) {
    let char = s.charAt(i);
    str = str.substring(1).concat(char);
    if (str === goal) {
      return true;
    }
  }
  return false;
};

/**
 * 方法二 s + s 判断 包含
 * @param {*} s 
 * @param {*} goal 
 * @returns 
 */
var rotateString = function (s, goal) {
    if (s.length !== goal.length) return false;
    let str = s.concat(s);
    return str.includes(goal);
  };
// @lc code=end
