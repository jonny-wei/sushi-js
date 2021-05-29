/*
 * @lc app=leetcode.cn id=94 lang=javascript
 *
 * [94] 二叉树的中序遍历
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
 * @return {number[]}
 */
var inorderTraversal = function (root) {
  let result = [];
  var inorder = (node) => {
    if (node) {
      // 先遍历左子树
      inorder(node.left);
      // 再根节点
      result.push(node.val);
      // 最后遍历右子树
      inorder(node.right);
    }
  };
  inorder(root);
  return result;
};

// 迭代
const inorderTraversal = (root) => {
  const res = [];
  const stack = [];

  while (root) {
    // 能压入栈的左子节点都压进来
    stack.push(root);
    root = root.left;
  }
  while (stack.length) {
    let node = stack.pop(); // 栈顶的节点出栈
    res.push(node.val); // 在压入右子树之前，处理它的数值部分（因为中序遍历）
    node = node.right; // 获取它的右子树
    while (node) {
      // 右子树存在，执行while循环
      stack.push(node); // 压入当前root
      node = node.left; // 不断压入左子节点
    }
  }
  return res;
};
// @lc code=end
