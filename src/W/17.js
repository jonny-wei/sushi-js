/**
 * 对一个 DOM 元素进行广度优先遍历，输出每个遍历的节点的 tagName 和 className
<ul>
    <li class="xxx"><a><span></span></a></li>
    <li><small class="yyyy"></small></li>
</ul>

本质是多叉树的BFS遍历

二叉树的广度遍历 BFS

            ul
        li       li
    a           small
span


ul
li
li
a
small
span

document.getElementsByTagName(tagName);//获取标签
document.getElementsByClassName(className); // 获取类名className的元素
*/

const tree = {
    tagName: "ul",
    className: "xxx",
    children: [
      {
        tagName: "li",
        className: "xxx",
        children: [
          {
            tagName: "a",
            className: null,
            children: [
              {
                tagName: "span",
                className: null,
                children: [],
              },
            ],
          },
        ],
      },
      {
        tagName: "li",
        className: null,
        children: [
          {
            tagName: "small",
            className: "yyyy",
            children: [],
          },
        ],
      },
    ],
  };
  
  const domTreeBFS = (tree) => {
    let res = [];
    let stack = [];
    stack.push(tree);
    while (stack.length) {
      let node = stack.shift();
      const { tagName = null, className = null, children = [] } = node;
      res.push({ tagName, className });
      children.forEach((child) => {
        stack.push(child);
      });
    }
  
    return res;
  };
  
  console.log(domTreeBFS(tree));
  