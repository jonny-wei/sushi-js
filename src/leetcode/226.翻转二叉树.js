/*
 * @lc app=leetcode.cn id=226 lang=javascript
 *
 * [226] 翻转二叉树
 */

// @lc code=start
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {TreeNode}
 */
// 前序遍历
const invertTree = (root) => {
  if (root == null) {
    return root;
  }
  const temp = root.left;
  root.left = root.right;
  root.right = temp;
  invertTree(root.left);
  invertTree(root.right);
  return root;
};
// 后序遍历
const invertTree = (root) => {
  if (root == null) {
    return root;
  }
  invertTree(root.left);
  invertTree(root.right);
  const temp = root.left;
  root.left = root.right;
  root.right = temp;
  return root;
};
// 层次遍历
const invertTree = (root) => {
  if (root == null) {
    return root;
  }
  const queue = [root]; // 维护一个队列，初始推入第一层的root

  while (queue.length) {
    const cur = queue.shift(); // 出列的节点
    [cur.left, cur.right] = [cur.right, cur.left]; // 交换左右子树

    if (cur.left) {
      // 作为下一层节点入列考察
      queue.push(cur.left);
    }
    if (cur.right) {
      queue.push(cur.right);
    }
  }
  return root;
};
// @lc code=end
