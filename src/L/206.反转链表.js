/*
 * @lc app=leetcode.cn id=206 lang=javascript
 *
 * [206] 反转链表
 */

// @lc code=start
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * 反转一个单链表
 * 可以迭代或递归地反转链表。你能否用两种方法解决这道题？
 *
 * 解题思路
 * (一)迭代
 * 初始化一个 prev 指针为 null，一个 cur 指针为 head；
 * 开始遍历链表，在每一次循环中：
 * 1. 先保存 cur.next；
 * 2. 把 cur.next 倒转方向指向 prev；
 * 3. prev 和 cur 都分别往前一步；
 * 时间复杂度：O(n)
 * 空间复杂度：O(1)
 *
 * (二)递归
 * 可以把链表分成两个部分：
 * 1. 第一个节点
 * 2. 余下的部分
 * 应该就能看到一个递归的套路了，就是把一个大问题一步步地拆分成越来越小的小问题，
 * 然后从最小的问题开始一个个往上解决，等把所有小问题都解决了，原本的大问题也就解决了。
 * 关键点就在于我们得找到可以被直接解决的最小问题，也就是递归的出口。
 * 在这道题目中，很明显这个最小问题就是当链表被分成只剩下最后一个节点的时候，我们只需要直接返回当前节点作为 head。
 * 时间复杂度：O(n)
 * 空间复杂度：O(n)
 *
 * 单链表反转与字符串反转联系与区别
 * 反转字符串，只需要左右双指针移动并交换顺序
 * 反转单链表，需要 prev，cur 两个指针和 nextNode(一个中间临时变量) 改变指向，移动指针
 */
/**
 * 方法一 迭代
 * @param {*} head
 * @returns
 */
const reverseList = function (head) {
  let [prev, cur] = [null, head];
  while (cur) {
    let nextNode = cur.next;
    cur.next = prev;
    prev = cur;
    cur = nextNode;
  }
  return prev;
};

// 简化
const reverseList = function (head) {
  let [prev, cur] = [null, head];
  while (cur) {
    [cur.next, prev, cur] = [prev, cur, cur.next];
  }
  return prev;
};

/**
 * 方法二 递归
 */
const reverseList = function (cur = head, prev = null) {
  if (!cur) return prev;
  let nextNode = cur.next;
  cur.next = prev;
  return reverseList(nextNode, cur);
};
// @lc code=end
