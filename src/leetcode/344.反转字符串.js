/*
 * @lc app=leetcode.cn id=344 lang=javascript
 *
 * [344] 反转字符串
 */

// @lc code=start
/**
 * 必须原地修改输入数组、使用 O(1) 的额外空间解决这一问题
 *
 * 解题思路
 * 比较反转前后下标变化很容易得出 s[i] 的字符与 s[N - 1 - i] 的字符发生了交换的规律，因此我们可以得出如下双指针的解法
 * 双指针法
 * 1. 原地修改数组，并翻转字符串，可以用双指针法，指针分别指向头尾
 * 2. 交换头尾指针指向的字符，并移动指针，直到相交就交换完成了
 * 时间复杂度：O(n)
 * 空间复杂度：O(1)
 *
 * 链表反转与字符串反转联系与区别
 * 反转字符串，只需要左右双指针移动并交换顺序
 *
 * @param {character[]} s
 * @return {void} Do not return anything, modify s in-place instead.
 */
const reverseString = function (s) {
  const len = s.length;
  for (let left = 0, right = len - 1; left < right; ++left, --right) {
    [s[left], s[right]] = [s[right], s[left]];
  }
  return s
};
// @lc code=end
