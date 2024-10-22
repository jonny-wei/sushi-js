/**
 * 求嵌套数组的最大深度 recursiveMax
 *
 */
const recursiveMax1 = (arr) => {
  let depth = [];
  let flag = false;
  arr.forEach((item) => {
    if (Array.isArray(item)) {
      flag = true;
      depth.push(recursiveMax(item));
    }
  });
  if (flag) {
    return Math.max(...depth) + 1;
  } else {
    return 1;
  }
};

/**
 * 方法二 （推荐）
 * @param {*} arr 
 * @returns 
 */
const recursiveMax = (arr) => {
  if (!Array.isArray(arr)) {
    return 0;
  }

  // 初始化最大深度为1，因为至少是一层数组
  let maxDepth = 1;

  // 遍历数组中的每个元素
  for (let i = 0; i < arr.length; i++) {
    // 如果元素是数组，则递归调用自身，并更新最大深度
    if (Array.isArray(arr[i])) {
      let depth = 1 + recursiveMax(arr[i]);
      maxDepth = Math.max(maxDepth, depth);
    }
  }

  return maxDepth
}

// 测试
console.log(recursiveMax([55, [33, [1], [2, 3], [[3, 5], [8]], [], []]])); // 4
