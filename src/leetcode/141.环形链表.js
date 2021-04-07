/*
 * @lc app=leetcode.cn id=141 lang=javascript
 *
 * [141] 环形链表
 */

// @lc code=start
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * 给定一个链表，判断链表中是否有环。
 * 如果链表中有某个节点，可以通过连续跟踪 next 指针再次到达，则链表中存在环。
 *
 * 解题思路
 * 1. 暴力法
 * 2. 利用哈希表
 * 最容易想到的方法是遍历所有节点，每次遍历到一个节点时，判断该节点此前是否被访问过。
 * 使用哈希表来存储所有已经访问过的节点。每次我们到达一个节点，如果该节点已经存在于哈希表中，
 * 则说明该链表是环形链表，否则就将该节点加入哈希表中。重复这一过程，直到我们遍历完整个链表即可。
 * 时间复杂度：O(n)
 * 空间复杂度：O(n)
 * 3. 快慢指针 (类似追及问题，Floyd 判圈算法，龟兔赛跑算法)
 * 快、慢指针，从头节点出发
 * 慢指针每次走一步，快指针每次走两步，不断比较它们指向的节点的值
 * 如果节点值相同，说明有环。如果不同，继续循环。
 * 时间复杂度：O(n)
 * 空间复杂度：O(1) 利用的是原地链表 有点反转链表的味道
 *
 */

/**
 * 方法一 利用哈希表
 * @param {*} head
 */
var hasCycle = function (head) {
  let hashMap = new Map();
  while (head) {
    if (hashMap.has(head)) {
      return true;
    }
    hashMap.set(head, true);
    head = head.next;
  }
  return false;
};

/**
 * 方法二 快慢指针
 * 慢指针每次走一步，快指针每次走两步，不断比较它们指向的节点的值
 * @param {*} head 
 * @returns 
 */
var hasCycle = function (head) {
  let [fast, slow] = [head, head];
  while (fast) {
    if (fast.next === null) return false;
    slow = slow.next;
    fast = fast.next.next;
    if (slow === fast) return true;
  }
  return false;
};
// @lc code=end
