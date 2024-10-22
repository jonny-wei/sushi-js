/**
 * 二分查找
 * 特点： 已排序的数组，分区间，缩小区间
 * 场景：查目标值，查目标值的区间，查目标值的边界
 */

/**
 * 基本的二分查找模板
 * @param {*} nums 
 * @param {*} target 
 * @returns 
 */
var search = function (nums, target) {
  let left = 0;
  let right = nums.length - 1; // 闭区间 [left, right] 所以结束条件是 left > right
  while (left <= right) {
    const mid = left + Math.floor((right - left) / 2); // 有效防止 left 和 right 太大，直接相加导致溢出的情况
    if (nums[mid] < target) {
      left = mid + 1;
    } else if (nums[mid] > target) {
      right = mid - 1;
    } else if (nums[mid] === target) {
      return mid;
    }
  }
  return -1;
};

/**
 * 寻找左侧边界
 * @param {*} nums 
 * @param {*} target 
 * @returns 
 */
var left_bound = function (nums, target) {
  let left = 0;
  let right = nums.length - 1;
  while (left <= right) {
    const mid = left + Math.floor((right - left) / 2);
    if (nums[mid] < target) {
      left = mid + 1;
    } else if (nums[mid] > target) {
      right = mid - 1;
    } else if (nums[mid] === target) {
      right = mid - 1; // 寻找的是左边界，需收缩右侧边界
    }
  }
  // 检查出界情况
  if (left < 0 || left >= nums.length) {
    return -1;
  }
  return nums[left] == target ? left : -1;;
};

/**
 * 寻找右侧边界
 * @param {*} nums 
 * @param {*} target 
 * @returns 
 */
var right_bound = function (nums, target) {
  let left = 0;
  let right = nums.length - 1;
  while (left <= right) {
    const mid = Math.floor(left + (right - left) / 2);
    if (nums[mid] < target) {
      left = mid + 1;
    } else if (nums[mid] > target) {
      right = mid - 1;
    } else if (nums[mid] === target) {
      left = mid + 1; // 寻找的是右边界，需收缩左侧边界
    }
  }
  // 检查出界情况
  if (right < 0 || right >= nums.length) {
    return -1;
  }
  return nums[right] == target ? right : -1;
};

/**
 * 边界范围
 * @param {*} nums 
 * @param {*} target 
 * @returns 
 */
var searchRange = function (nums, target) {
  return [left_bound(nums, target), right_bound(nums, target)];
};
