/**
 * 广度优先搜索
 *
 * 广度优先搜索算法（Breadth-First Search，缩写为 BFS），又译作宽度优先搜索，或横向优先搜索，是一种图形搜索算法。
 * 简单的说，BFS 是从根节点开始，沿着树的宽度遍历树的节点。如果所有节点均被访问，则算法中止。
 * 广度优先搜索的实现一般采用 open-closed 表。
 *
 * 算法思路
 * 1. 创建 nodeList 存储最终结果
 * 2. 创建一个队列存放
 * 3. 当队列不为空，获取队列第一个元素，存入 nodeList
 * 4. 遍历所有子节点，存进队尾
 * 5. 队列为空时退出循环结束
 */

// 递归
const bfs = function (node) {
  let nodeList = [];
  let index = 0;
  if (node !== null) {
    nodeList.push(node);
    nodeList.push();
  }
  return nodeList;
};
