/**
 * 通用 nSum 问题模板
 * @param {*} nums
 * @param {*} n
 * @param {*} start
 * @param {*} target
 * @returns
 */

const nSumTarget = (nums, n, start, target) => {
  let res = [];
  let size = nums.length;

  // 处理边界条件 不是两数或以上，
  // 或s数组大小小于n(表示无解，4数之和起码数组中元素的个数要大于等于4个)
  if (n < 2 || size < n) return res;

  if (n === 2) {
    // base case 转为基本的 2Sum 问题递归求解
    // 双指针求解 2Sum 问题
    let left = start;
    let right = size - 1;
    while (left < right) {
      const leftValue = nums[left];
      const rightValue = nums[right];
      const sum = leftValue + rightValue;
      if (sum < target) {
        // 和小了，左指针右移，增大
        // while 去重，题目要求不重复的四元组
        while (left < right && nums[left] === leftValue) left++;
      } else if (sum > target) {
        // 和大了, 右指针左移，减小
        // while 去重，题目要求不重复的四元组
        while (left < right && nums[right] === rightValue) right--;
      } else {
        res.push([leftValue, rightValue]);
        while (left < right && nums[left] === leftValue) left++;
        while (left < right && nums[right] === rightValue) right--;
      }
    }
  } else {
    for (let i = start; i < size; i++) {
      let sub = nSumTarget(nums, n - 1, i + 1, target - nums[i]);
      for (let arr of sub) {
        // (n-1)Sum 加上 nums[i] 就是 nSum
        arr.push(nums[i]);
        res.push(arr);
      }
      while (i < size - 1 && nums[i] === nums[i + 1]) i++;
    }
  }
  return res;
};

var fourSum = function (nums, n, target) {
  // 递增有序数组排序后，用通用的 nSum 问题解法
  nums.sort((a, b) => a - b);
  // 参数：递增有序数组，4sum问题，从0索引开始，目标和是target
  return nSumTarget(nums, n, 0, target);
};

fourSum([1, 6, 3, 8, 3, 5, 1, 4, 2], 4, 13);
