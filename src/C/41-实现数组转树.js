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

/**
 * 方法三 - 推荐
 * 拷贝的原理
 * @param {*} data
 * @param {*} config
 * @returns
 */
const buildTree = (data, config = {}) => {
  if (!data || !Array.isArray(data)) return "错误的数据类型";
  const len = data.length;
  if (!len) return "空数组";
  const id = (config && config.id) || "id";
  const pid = (config && config.pid) || "parentId";
  const children = (config && config.children) || "children";

  // 把所有的ID映射为一个map 方便查询
  const idMap = {};
  // 找到父节点的放入 treeData
  const treeData = [];
  // 节点包含 pid 属性, 并且父节点不存在的放入 errorData
  const errorData = [];

  data.forEach((v) => {
    v && (idMap[v[id]] = v);
  });

  data.forEach((v) => {
    if (v) {
      let parent = idMap[v[pid]];
      if (parent) {
        !parent[children] && (parent[children] = []);
        parent[children].push(v || []);
      } else if (!parent && v.hasOwnProperty(pid)) {
        errorData.push(v);
      } else {
        treeData.push(v);
      }
    }
  });
  // 树结构 错误数据同时返回
  // return {
  //   treeData,
  //   errorData
  // }
  // 只返回树结构
  return treeData;
};

const arrayToTree = (arr, config = {}) => {
  const res = [];

  const configMap = {
    id: config?.id || "id",
    parentId: config?.parentId || "parentId",
    children: config?.children || "children",
  };

  const map = new Map();
  arr.map((item) => {
    map.set(item[configMap.id], item);
  });

  arr.forEach((item) => {
    if (item) {
      const parentId = item[configMap.parentId];
      if (map.has(parentId)) {
        const node = map.get(parentId) || {}; // 找到当前item节点的父节点，插入其children
        !node[configMap.children] && (node[configMap.children] = []);
        node[configMap.children].push(item || []);
      } else {
        res.push(item);
      }
    }
  });

  return res;
};
