/*
 * @lc app=leetcode.cn id=3 lang=javascript
 *
 * [3] 无重复字符的最长子串
 */

// @lc code=start
/**
 *
 * 给定一个字符串，请你找出其中不含有重复字符的 最长子串 的长度。
 *
 * 解题思路：
 * 滑动窗口(即，移动的队列)
 * 双指针 滑动窗口 哈希表存储
 *
 * 
 * 滑动窗口题目:
 * 3. 无重复字符的最长子串
 * 30. 串联所有单词的子串
 * 76. 最小覆盖子串
 * 159. 至多包含两个不同字符的最长子串
 * 209. 长度最小的子数组
 * 239. 滑动窗口最大值
 * 567. 字符串的排列
 * 632. 最小区间
 * 727. 最小窗口子序列
 */

/**
 * 方法一 维护数组，使用一个数组来维护滑动窗口
 * (没有用 Map，indexOf时间复杂度O(n)，不太好)
 *
 * 在js中我们使用一个数组来维护滑动窗口
 * 1. 遍历字符串，判断字符串是否在滑动窗口数组里面
 * 2. 在则删除滑动窗口数组中找到与当前字符串相同的字符，并将其本身和之前的字符全部删除
 * (使用 indexOf 判断是否在数组中出现过)，然后将当前字符push进数组
 * 3. 不在则push进数组
 * 4. 然后将max更新为当前最长子串的长度
 * 5. 遍历完成，返回max即可。
 *
 * 时间复杂度：O(n^2)
 * 其中 arr.indexOf() 时间复杂度为 O(n) ，arr.splice(0, index+1) 的时间复杂度也为 O(n)
 * 空间复杂度：O(n)
 */
var lengthOfLongestSubstring = function (s) {
  let arr = [];
  let max = 0;
  for (let i = 0; i < s.length; i++) {
    let index = arr.indexOf(s[i]);
    if (index !== -1) {
      arr.splice(0, index + 1);
    }
    arr.push(s.charAt(i));
    max = Math.max(arr.length, max);
  }
  return max;
};

/**
 * 方法二 滑动窗口 + 哈希表存储
 *
 * 使用 map 来存储当前已经遍历过的字符，key 为字符，value 为下标（哈希表）
 * 使用 k 来标记无重复子串开始下标，rk 为当前遍历字符下标（双指针）
 * 遍历字符串，判断当前字符 rk 是否已经在 map 中存在，存在则更新无重复子串开始下标 k 移动一位，
 * 此时从 k 到 rk 为最新的无重复子串，更新 max ，将当前字符与下标放入 map 中
 * 最后，返回 max 即可
 */
var lengthOfLongestSubstring = function (s) {
  let map = new Map(),
    max = 0;
  for (let k = 0, rk = 0; rk < s.length; rk++) {
    let key = s.charAt(rk);
    if (map.has(key)) {
      k = Math.max(k, map.get(key) + 1);
    }
    max = Math.max(max, rk - k + 1);
    map.set(key, rk);
  }
  return max;
};

// @lc code=end
