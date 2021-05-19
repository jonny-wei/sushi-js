/**
 * 手写数组转树
 */

let input = [
  {
    id: 1,
    val: "学校",
    parentId: null,
  },
  {
    id: 2,
    val: "班级1",
    parentId: 1,
  },
  {
    id: 3,
    val: "班级2",
    parentId: 1,
  },
  {
    id: 4,
    val: "学生1",
    parentId: 2,
  },
  {
    id: 5,
    val: "学生2",
    parentId: 3,
  },
  {
    id: 6,
    val: "学生3",
    parentId: 3,
  },
];

/**
 * 方法一 递归
 * @param {*} arr
 * @param {*} parentId
 * @param {*} childrenArray
 */
function buildTree(arr, parentId, childrenArray) {
  arr.forEach((item) => {
    if (item.parentId === parentId) {
      item.children = [];
      buildTree(arr, item.id, item.children);
      childrenArray.push(item);
    }
  });
}
function arrayToTree(input, parentId) {
  const array = [];
  buildTree(input, parentId, array);
  return array.length > 0 ? (array.length > 1 ? array : array[0]) : {};
}
const obj = arrayToTree(input, null);
console.log(obj);

/**
 * 非递归版本
 * @param {*} arr
 * @returns
 */
function convert(list) {
  const map = list.reduce((acc, item) => {
    acc[item.id] = item;
    return acc;
  }, {});
  const result = [];
  for (const key in map) {
    const item = map[key];
    if (item.parentId === null) {
      result.push(item);
    } else {
      const parent = map[item.parentId];
      if (parent) {
        parent.children = parent.children || [];
        parent.children.push(item);
      } else {
        result.push(item); // 要加上else，否则，5，7就被抛弃了
      }
    }
  }
  return result;
}
// 或者
const arrayToTree = (arr = []) => {
  let map = {};
  let tree = [];
  for (let i in arr) {
    map[arr[i].id] = arr[i];
  }
  for (let i in map) {
    if (map[i].parentId) {
      if (!map[map[i].parentId].children) {
        map[map[i].parentId].children = [];
      }
      if (map[map[i].parentId].children) {
        map[map[i].parentId].children.push(map[map[i].id]);
      }
    } else {
      tree.push(map[i]);
    }
  }
  return tree;
};

/**
 * 排序数组转二叉搜索树
 * @param {*} nums
 * @returns
 */
var sortedArrayToBST = function (nums) {
  if (!nums.length) {
    return null;
  }
  const root = new TreeNode(null);

  if (nums.length > 1) {
    root.left = sortedArrayToBST(nums.splice(0, nums.length / 2));
  }
  root.val = nums[0];
  root.right = sortedArrayToBST(nums.splice(1));
  return root;
};
