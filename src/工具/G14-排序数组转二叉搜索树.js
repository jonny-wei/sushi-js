/**
 * 排序数组转二叉搜索树 sortedArrayToBST
 */

/**
 * 
 * @param {*} nums
 * @returns
 */
// 定义TreeNode类
class TreeNode {
  constructor(val) {
    this.val = val;
    this.left = this.right = null;
  }
}
function sortedArrayToBST(nums) {
  // 定义一个辅助函数来递归创建二叉搜索树
  function helper(left, right) {
    if (left > right) return null;

    // 选择中间元素作为根节点
    const mid = Math.floor((left + right) / 2);
    const node = new TreeNode(nums[mid]);

    // 递归创建左子树和右子树
    node.left = helper(left, mid - 1);
    node.right = helper(mid + 1, right);

    return node;
  }

  // 使用辅助函数创建二叉搜索树
  return helper(0, nums.length - 1);
}

// 测试用例
const nums = [-10, -3, 0, 5, 9];
const root = sortedArrayToBST(nums);

// 打印二叉树（中序遍历）
function inorderTraversal(root) {
  const result = [];
  function traverse(node) {
    if (node) {
      traverse(node.left);
      result.push(node.val);
      traverse(node.right);
    }
  }
  traverse(root);
  return result;
}

console.log(inorderTraversal(root)); // 输出：[-10, -3, 0, 5, 9]