/*
 * @lc app=leetcode.cn id=290 lang=javascript
 *
 * [290] 单词规律
 *
 * 判断字符与字符串之间是否恰好一一对应
 * 任意一个字符都对应着唯一的字符串，
 * 任意一个字符串也只被唯一的一个字符对应。
 * 在集合论中，这种关系被称为「双射」
 *
 * 利用双哈希表记录每一个字符对应的字符串，以及每一个字符串对应的字符
 * 枚举每一对字符与字符串的配对过程，不断更新哈希表，如果发生了冲突，则说明给定的输入不满足双射关系。
 *
 * 枚举 pattern 中的每一个字符，利用双指针来均摊线性地找到该字符在 str 中对应的字符串。每次确定一个字符与字符串的组合，我们就检查是否出现冲突，最后我们再检查两字符串是否比较完毕即可。
 */

// @lc code=start
/**
 * 方法一 索引法
 * @param {string} pattern
 * @param {string} s
 * @return {boolean}
 */
 var wordPattern = function(pattern, s) {
    let sArr = s.split(' ')
    if(pattern.length !== sArr.length) return false
    let i = 0;
    while(i++ < pattern.length){
        if(pattern.indexOf(pattern[i]) !== sArr.indexOf(sArr[i])){
            return false
        }
    }
    return true
};

/**
 * 方法二 双射法
 * @param {*} pattern 
 * @param {*} s 
 * @returns 
 */
var wordPattern = function (pattern, s) {
  let sArr = s.split(" ");
  let pMap = new Map(),
    sMap = new Map();
  if (pattern.length != sArr.length) return false;
  for (let i = 0; i < pattern.length; i++) {
    let [key, value] = [pattern[i], sArr[i]];
    if (!pMap.has(key)) {
      pMap.set(key, value);
    } else {
      if (pMap.get(key) !== value) {
        return false;
      }
    }
    if (!sMap.has(value)) {
      sMap.set(value, key);
    } else {
      if (sMap.get(value) !== key) {
        return false;
      }
    }
  }
  return true;
};

// @lc code=end
