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

// 二叉树深度遍历 - 前序 - 递归
const toTree11 = (tree) => {
  const res = [];
  const traverse = (root) => {
    if (root) {
      res.push(root.value);
      traverse(root.left);
      traverse(root.right);
    }
  };
  traverse(tree);
  return res;
};
// test
const res11 = toTree11(tree);
console.log("二叉树深度遍历 - 前序 - 递归", res11);

// 二叉树深度遍历 - 前序 - 非递归
const toTree12 = (tree) => {
  const res = [];
  const stack = [];
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
};
// test
const res12 = toTree12(tree);
console.log("二叉树深度遍历 - 前序 - 非递归", res12);

// 二叉树深度遍历 - 中序 - 递归
const toTree21 = (tree) => {
  const res = [];
  const traverse = (root) => {
    if (root) {
      traverse(root.left);
      res.push(root.value);
      traverse(root.right);
    }
  };
  traverse(tree);
  return res;
};
// test
const res21 = toTree21(tree);
console.log("二叉树深度遍历 - 中序 - 递归", res21);

// 二叉树深度遍历 - 中序 - 非递归
const toTree22 = (tree) => {
  const res = [];
  const stack = [];

  while (tree || stack.length) {
    while (tree) {
      stack.push(tree);
      tree = tree.left || null;
    }
    const node = stack.pop();
    res.push(node.value);
    tree = node.right || null;
  }
  return res;
};
// test
const res22 = toTree22(tree);
console.log("二叉树深度遍历 - 中序 - 非递归", res22);

// 二叉树深度遍历 - 后序 - 递归
const toTree31 = (tree) => {
  const res = [];
  const traverse = (root) => {
    if (root) {
      traverse(root.left);
      traverse(root.right);
      res.push(root.value);
    }
  };
  traverse(tree);
  return res;
};
// test
const res31 = toTree31(tree);
console.log("二叉树深度遍历 - 后序 - 递归", res31);

// 二叉树深度遍历 - 后序 - 非递归
const toTree32 = (tree) => {
  const res = [];
  const stack = [];
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
};
// test
const res32 = toTree32(tree);
console.log("二叉树深度遍历 - 后序 - 非递归", res32);

// 二叉树广度遍历 - 层次遍历
const toTree4 = (tree) => {
  const res = [];
  const stack = [];
  stack.push(tree);
  while (stack.length) {
    const node = stack.shift();
    res.push(node.value);
    if (node.left) {
      stack.push(node.left);
    }
    if (node.right) {
      stack.push(node.right);
    }
  }
  return res;
};
// test
const res4 = toTree4(tree);
console.log("二叉树广度遍历 - 层次遍历", res4);
