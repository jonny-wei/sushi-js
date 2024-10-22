/**
 * 数组转树 arrayToTree
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
 * @param {*} input 
 * @param {*} parentId 
 * @returns 
 */
function arrayToTree1(input, parentId = null) {
  const childrenArray = [];

  // 定义 buildTree 为 arrayToTree 的内部函数
  function buildTree(arr, parentId) {
    arr.forEach((item) => {
      if (item.parentId === parentId) {
        // 为每个找到的子节点初始化 children 数组
        item.children = [];
        // 递归调用 buildTree，将当前节点的 id 作为下一个 parentId 参数
        buildTree(arr, item.id);
        // 将当前节点添加到结果数组中
        childrenArray.push(item);
      }
    });
  }

  // 从根节点（parentId 为 null）开始构建树
  buildTree(input, parentId);

  // 如果只有一个根节点，则直接返回该节点，否则返回所有根节点的数组
  return childrenArray.length === 1 ? childrenArray[0] : childrenArray;
}

/**
 * 方法二 非递归 （推荐）
 * @param {*} arr 
 * @param {*} config 
 * @returns 
 */
const arrayToTree2 = (arr, config = {}) => {
  const res = [];
  const {
    id = "id",
    parentId = "parentId",
    children = "children"
  } = config;

  // 首先，将所有节点存入map，并初始化children数组
  const map = new Map();
  arr.forEach((item) => {
    map.set(item[id], { ...item, [children]: [] });
  });

  // 然后，构建树形结构
  arr.forEach((item) => {
    const nodeId = item[id];
    const parentNode = map.get(item[parentId]);

    if (parentNode) {
      if (!parentNode[children]) {
        parentNode[children] = [];
      }
      parentNode[children].push(map.get(nodeId));
    } else {
      res.push(map.get(nodeId))
    }
  });

  return res;
};

/**
 * 方法三 
 * 拷贝的原理
 * @param {*} data
 * @param {*} config
 * @returns
 */
const arrayToTree3 = (data, config = {}) => {
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
  return {
    treeData,
    errorData
  }
};