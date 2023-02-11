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

  console.log(res);
};

arrayToTree(input);
