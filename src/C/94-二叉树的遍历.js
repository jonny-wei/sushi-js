// 二叉树的深度遍历 和 层序遍历

/**
 * 二叉树思考过程
 * 综上，遇到一道二叉树的题目时的通用思考过程是：

1、是否可以通过遍历一遍二叉树得到答案？如果可以，用一个 traverse 函数配合外部变量来实现。

2、是否可以定义一个递归函数，通过子问题（子树）的答案推导出原问题的答案？如果可以，写出这个递归函数的定义，并充分利用这个函数的返回值。

3、无论使用哪一种思维模式，你都要明白二叉树的每一个节点需要做什么，需要在什么时候（前中后序）做。
 */

/**
 * function TreeNode(val,left,right){
 * 		this.value = val;
 * 		this.left  = left;
 * 		this.right = right;
 * }
 */

const tree = {
  value: 1,
  left: {
    value: 2,
    left: {
      value: 4,
      left: {
        value: 8,
      },
    },
    right: {
      value: 5,
    },
  },
  right: {
    value: 3,
    left: {
      value: 6,
    },
    right: {
      value: 7,
    },
  },
};

// 深度优先 - 前序遍历
// [1, 2, 4, 8, 5, 3, 6, 7]
function toTree(tree) {
  const res = [];
  const traverse = (node) => {
    if (node) {
      res.push(node.value);
      traverse(node.left);
      traverse(node.right);
    }
  };
  traverse(tree);
  return res;
}
/**
 * 非递归实现 - 前序
 * 栈(先进后出) + 循环
 * 将右子树入栈，再将左子树入栈，然后一个个出栈
 * @param tree
 * 非递归实现，需要自行实现“回溯”，可以使用栈来巧妙实现
 */
// [1, 2, 4, 8, 5, 3, 6, 7]
function toTree(tree) {
  let res = [];
  let stack = [];
  stack.push(tree);
  while (stack.length) {
    const node = stack.pop();
    res.push(node.value);
    if (node.right) {
      stack.push(node.right);
    }
    if (node.left) {
      stack.push(node.left);
    }
  }
  return res;
}
// 深度优先 - 中序遍历
// [8, 4, 2, 5, 1, 6, 3, 7]
function toTree(tree) {
  const res = [];
  const traverse = (node) => {
    if (node) {
      traverse(node.left);
      res.push(node.value);
      traverse(node.right);
    }
  };
  traverse(tree);
  return res;
}
/**
 * 非递归实现 - 中序
 * 栈(先进后出) + 循环
 * 左子树都先入栈，然后取根节点
 */
// [8, 4, 2, 5, 1, 6, 3, 7]
function toTree(tree) {
  let res = [];
  let stack = [];
  while (tree || stack.length) {
    while (tree) {
      stack.push(tree);
      tree = tree.left || null;
    }
    tree = stack.pop();
    res.push(tree.value);
    tree = tree.right || null;
  }
  return res;
}

// 深度优先 - 后序遍历
// [8, 4, 5, 2, 6, 7, 3, 1]
function toTree(tree) {
  const res = [];
  const traverse = (node) => {
    if (node) {
      traverse(node.left);
      traverse(node.right);
      res.push(node.value);
    }
  };
  traverse(tree);
  return res;
}
/**
 * 非递归实现 - 后序
 * 栈(先进后出) + 循环
 */
// [8, 4, 5, 2, 6, 7, 3, 1]
function toTree(tree) {
  let res = [];
  if (!root) return res;
  let stack = [];
  stack.push(tree);
  while (stack.length) {
    const node = stack.pop();
    if (node.left) {
      stack.push(node.left);
    }
    if (node.right) {
      stack.push(node.right);
    }
    res.unshift(node.value);
  }
  return res;
}

// 广度优先 BFS
// [1, 2, 3, 4, 5, 6, 7, 8]
function toTree(tree) {
  let res = [];
  let queue = [tree];
  while (queue.length) {
    const node = queue.shift();
    res.push(node.value);
    if (node.left) {
      queue.push(node.left);
    }
    if (node.right) {
      queue.push(node.right);
    }
  }
  return res;
}

/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[][]}
 * 二叉树的层次遍历 II   BFS广度优先遍历来自层序遍历
 * 给定一个二叉树，返回其节点值自底向上的层次遍历。
 */
var levelOrderBottom = function (root) {
  if (!root) {
    return [];
  }
  const queue = [];
  queue.push(root);
  const res = []; // 用来储存最后的结果

  while (queue.length) {
    const subRes = []; // 用来储存每一层的节点值
    const levelSize = queue.length;
    for (let i = 0; i < levelSize; i++) {
      const cur = queue.shift();
      subRes.push(cur.val);
      if (cur.left) {
        queue.push(cur.left);
      }
      if (cur.right) {
        queue.push(cur.right);
      }
    }
    res.unshift(subRes);
  }
  return res;
};
