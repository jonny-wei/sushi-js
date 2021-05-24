/*
 * @lc app=leetcode.cn id=205 lang=javascript
 *
 * [205] 同构字符串
 * 
 * 思路：同构字符串，每字符上出现索引始终相同
 */

// @lc code=start
/**
 * 方法一 同构字符串，每字符上出现索引始终相同(索引法)
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
 var isIsomorphic = function (s, t) {
    for (let i = 0; i < s.length; i++) {
        if (s.indexOf(s[i]) !== t.indexOf(t[i])) {
           return false
        }
    }
    return true
};
/**
 * 方法二 你中有我，我中有你，互相映射(双射法)
 * @param {*} s 
 * @param {*} t 
 * @returns 
 */
var isIsomorphic = function (s, t) {
    let sMap = new Map(), tMap = new Map(), i = -1;
    while (i++ < s.length) {
        const a = s[i], b = t[i]
        if (sMap.has(a) && sMap.get(a) !== b || tMap.has(b) && tMap.get(b) !== a) return false
        sMap.set(a, b)
        tMap.set(b, a)
    }
    return true
};
// @lc code=end

