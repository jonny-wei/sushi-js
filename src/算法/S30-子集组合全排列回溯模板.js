/**
 * 形式一、元素无重不可复选
 * 
 * 即 nums 中的元素都是唯一的，每个元素最多只能被使用一次
 * 子集问题和组合问题本质上是一样的，无非就是 base case 有一些区别
 * 
 * 如何保证不可复选(不出现重复) ？
 * 1. 组合/子集问题使用 start 变量保证元素 nums[start] 之后只会出现 nums[start+1..] 中的元素，通过固定元素的相对位置保证不出现重复的子集。
 * 2. 排列问题通过 used 剪枝。排列问题本身就是让你穷举元素的位置，nums[i] 之后也可以出现 nums[i] 左边的元素，所以之前的那一套玩不转了，需要额外使用 used 数组来标记哪些元素还可以被选择。
 */

/**
 * 子集
 * 无重复不可复选
 * 
 * 输入：nums = [1,2,3]
 * 输出：[[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]
 */
const subsets = function (nums) {
  const res = []
  const track = []
  const backtrack = (start) => {
    res.push([...track])  // 1. base case 每个节点的值都是一个子集，不需要任何条件
    for (let i = start; i < nums.length; i++) {
      track.push(nums[i])
      backtrack(i + 1)   // 2. base case start + 1，nums[start] 之后只会出现 nums[start+1..] 中的元素，通过固定元素的相对位置保证不出现重复的子集。
      track.pop()
    }
  }
  backtrack(0)
  return res
}

console.log('无重复不可复选 - 子集：', subsets([1, 2, 3]))

/**
 * 组合
 * 无重复不可复选
 * 
 * 给定两个整数 n 和 k，返回范围 [1, n] 中所有可能的 k 个数的组合。
 * 
 * 输入：n = 4, k = 2
 * 输出：[ [ 1, 2 ], [ 1, 3 ], [ 1, 4 ], [ 2, 3 ], [ 2, 4 ], [ 3, 4 ] ]
 * 
 * k 个数的组合就是过滤出长度为 k 的子集
 */
const combine = function (n, k) {
  const res = []
  const track = []
  const backtrack = (start) => {
    if (track.length === k) { // 1. base case 每个节点的值都是一个子集，过滤出符合条件的子集
      res.push([...track])
      return
    }
    for (let i = start; i <= n; i++) {
      track.push(i)
      backtrack(i + 1) // 2. base case start + 1，nums[start] 之后只会出现 nums[start+1..] 中的元素，通过固定元素的相对位置保证不出现重复的子集。
      track.pop()
    }
  }
  backtrack(1)
  return res
}

console.log('无重复不可复选 - 组合：', combine(4, 2))

/**
 * 排列
 * 无重复不可复选
 * 
 * 输入：nums = [1,2,3]
 * 输出：[[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]
 */

var permute = function (nums) {
  const res = []
  const track = []
  const used = new Array(nums.length).fill(false)
  const backtrack = () => {
    if (track.length === nums.length) { // 1. base case 每个节点的值都是一个子集，过滤出符合条件的子集 
      res.push([...track])
      return
    }
    for (let i = 0; i < nums.length; i++) {
      if (used[i]) {  // 2. base case  通过 used 剪枝 避免重复使用同一个元素
        continue
      }
      track.push(nums[i])
      used[i] = true
      backtrack()
      used[i] = false
      track.pop()
    }
  }
  backtrack()
  return res
}

console.log('无重复不可复选 - 排列：', permute([1, 2, 3]))

/**
 * 形式二、元素可重不可复选，
 * 
 * 即 nums 中的元素可以存在重复，每个元素最多只能被使用一次，其关键在于排序和剪枝
 * 
 * 1. 先排序，使得重复元素在一起
 * 2. 子集组合，如何重复元素只选一次 ---> i > start && nums[i] === nums[i - 1] 跳过重复元素
 * 3. 子集组合，如何使其不可复选 ---> start + 1 直接去下一层
 * 4. 排列特殊，如何重复元素只选一次 ---> i > 0 && nums[i] === nums[i - 1] && !used[i - 1] 跳过重复元素
 * 5. 排列特殊，如何重复元素只选一次 ---> used 剪枝
 * 
 */

/**
 * 子集 II
 * 重复不可复选
 * 
 * 输入：nums = [2,1,2]
 * 输出：[[],[1],[1,2],[1,2,2],[2],[2,2]]
 */
const subsetsWithDup = function (nums) {
  const res = []
  const track = []

  nums.sort((a, b) => a - b) // 3. base case 排序，重复元素放一起，用于后续前后判断是否重复

  const backtrack = (start) => {
    res.push([...track])  // 1. base case 每个节点的值都是一个子集，不需要任何条件
    for (let i = start; i < nums.length; i++) {
      if (i > start && nums[i] === nums[i - 1]) { // 4. base case 发现重复，跳过
        continue;
      }
      track.push(nums[i])
      backtrack(i + 1)   // 2. base case start + 1，nums[start] 之后只会出现 nums[start+1..] 中的元素，通过固定元素的相对位置保证不出现重复的子集(不可复选)。
      track.pop()
    }
  }
  backtrack(0)
  return res
}

console.log('重复不可复选 - 子集 II：', subsetsWithDup([2, 1, 2]))

/**
 * 组合 II
 * 重复不可复选
 * 
 * 给定一个候选人编号的集合 candidates 和一个目标数 target ，
 * 找出 candidates 中所有可以使数字和为 target的组合。
 * candidates 中的每个数字在每个组合中只能使用 一次 。
 * 
 * 输入：candidates = [10,1,2,7,6,1,5], target = 8
 * 输出：[[1, 1, 6], [1, 2, 5], [1, 7], [2, 6]]
 */
const combinationSum2 = function (nums, target) {
  const res = []
  const track = []
  let trackSum = 0

  nums.sort((a, b) => a - b) // 3. base case 排序，重复元素放一起，用于后续前后判断是否重复

  const backtrack = (start) => {
    if (trackSum === target) { // 1. base case 每个节点的值都是一个子集，过滤出符合条件的子集
      res.push([...track])
      return
    }
    if (trackSum > target) { // 5. base case 和大于目标值，直接中断
      return
    }
    for (let i = start; i < nums.length; i++) {
      if (i > start && nums[i] === nums[i - 1]) { // 4. base case 发现重复，跳过
        continue;
      }
      track.push(nums[i])
      trackSum += nums[i]
      backtrack(i + 1) // 2. base case start + 1，nums[start] 之后只会出现 nums[start+1..] 中的元素，通过固定元素的相对位置保证不出现重复的子集(不可复选)。
      trackSum -= nums[i]
      track.pop()
    }
  }
  backtrack(0)
  return res
}

console.log('重复不可复选 - 组合 II：', combinationSum2([10, 1, 2, 7, 6, 1, 5], 8))

/**
 * 排列 II
 * 重复不可复选
 * 
 * 输入：nums = [1,1,2]
 * 输出：[ [ 1, 1, 2 ], [ 1, 2, 1 ], [ 2, 1, 1 ] ]
 */

const permuteUnique = function (nums) {
  const res = []
  const track = []
  const used = new Array(nums.length).fill(false)

  nums.sort((a, b) => a - b)

  const backtrack = () => {
    if (track.length === nums.length) {
      res.push([...track])
      return
    }
    for (let i = 0; i < nums.length; i++) {
      if (used[i]) {
        continue
      }
      if (i > 0 && nums[i] === nums[i - 1] && !used[i - 1]) {
        continue
      }
      track.push(nums[i])
      used[i] = true
      backtrack()
      used[i] = false
      track.pop()
    }
  }
  backtrack()
  return res
}

console.log('重复不可复选 - 排列 II：', permuteUnique([1, 1, 2]))