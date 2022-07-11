// 二叉树的深度遍历 和 层序遍历

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

// 广度优先
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
