var permute = function (nums) {
  let res = [];
  let visited = new Array(nums.length).fill(false);
  let track = [];

  // 路径：记录在 track 中
  // 选择列表：nums 中不存在于 track 的那些元素
  // 结束条件：nums 中的元素全都在 track 中出现
  function backtrack(nums, track, visited) {
    // 一次递归后，若符合一组全排列，存入 res 中
    if (track.length === nums.length) {
      res.push(track.slice());
      return;
    }
    for (let i = 0; i < nums.length; i++) {
      // 已经访问过了，剪枝
      if (visited[i]) {
        continue
      }
      // 做选择
      track.push(nums[i]);
      visited[i] = true;
      // 进入下一次决策树
      backtrack(nums, track, visited);
      // 撤销选择
      track.pop();
      visited[i] = false;
    }
  }

  backtrack(nums, track, visited);

  return res
}

console.log(permute([1, 2, 3])); // [[1, 2, 3], [1, 3, 2], [2, 1, 3], [2, 3, 1], [3, 1, 2], [3, 2, 1]]


/**
 * 分割回文串应用
 * 
 * 给你一个字符串 s，请你将 s 分割成一些子串，使每个子串都是 回文串 返回 s 所有可能的分割方案。
 * 
 * 回溯 + 回文串判断
 */

const partition = (s) => {
  // 判断是否是回文串
  const isPalindrome = (str) => {
    let left = 0
    let right = str.length - 1

    while (left < right) {
      if (str[left] !== str[right]) {
        return false
      }
      left++
      right--
    }

    return true
  }

  // 回溯 - 分割字符串 - 找所有可分割方案
  const backtrack = (s, start, track, res) => {
    if (start === s.length) {
      res.push(track.slice())
      return
    }
    for (let i = start; i < s.length; i++) {
      const subStr = s.substring(start, i + 1)
      if (isPalindrome(subStr)) {
        track.push(subStr)
        backtrack(s, i + 1, track, res)
        track.pop()
      }
    }
  }

  let res = []
  backtrack(s, 0, [], res)
  return res
}

console.log(partition('aab'))

