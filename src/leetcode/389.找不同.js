/*
 * @lc app=leetcode.cn id=389 lang=javascript
 *
 * [389] 找不同
 */

// @lc code=start
/**
 * 方法一 利用map统计t字符出现的次数，如果s的字符出现在map中次数减一
 * 减为0的直接删除 最终map中剩余的就是不同字符
 * @param {string} s
 * @param {string} t
 * @return {character}
 */
var findTheDifference = function (s, t) {
  let res = [];
  let map = new Map();
  for (let i = 0; i < t.length; i++) {
    let char = t.charAt(i);
    if (map.has(char)) {
      map.set(char, map.get(char) + 1);
    } else {
      map.set(char, 1);
    }
  }
  for (let i = 0; i < s.length; i++) {
    let char = s.charAt(i);
    map.set(char, map.get(char) - 1);
    if (!map.get(char)) {
      map.delete(char);
    }
  }
  for (let key of map.keys()) {
    res.push(key);
  }
  return res.join("");
};
console.log(findTheDifference("ae", "aea")); // a
console.log(findTheDifference("abcd", "abcde")); // e
console.log(findTheDifference("a", "aa")); // a
console.log(findTheDifference("aa", "taa")); // t
console.log(findTheDifference("", "y")); // y
console.log(findTheDifference(" ", "y")); // y

// 简化
var findTheDifference = function (s, t) {
  const map = new Map();
  for (let i = 0; i < s.length; i++) {
    const val = map.get(s[i]);
    map.set(s[i], val === undefined ? 1 : val + 1);
  }
  for (let i = 0; i < t.length; i++) {
    const val = map.get(t[i]);
    if (val === 0 || val === undefined) {
      return t[i];
    } else {
      map.set(t[i], val - 1);
    }
  }
};

// 方法二 异或运算
// @lc code=end
