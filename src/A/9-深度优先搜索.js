/**
 * 深度优先搜索
 *
 * 算法原理
 * 1. 创建数组存放结果
 * 2. 当节点不为空将节点push到数组
 * 3. 获取当前节点的子节点，递归遍历子节点
 * 4. 递归
 */

let nodeList = [];

const dfs = function (node, nodeList) {
  if (node) {
    nodeList.push(node);
    const children = node.children;
    for (let i = 0; i < children.length; i++) {
      bfs(children[i], nodeList);
    }
  }
  return nodeList;
};

dfs(root, nodeList);
