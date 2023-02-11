/**
二分查找

特点 升序的数组，分区间，缩小区间

以下二分查找是最基本的模板，闭区间。
然而，比如说给你有序数组 nums = [1,2,2,2,3]，target 为 2，此算法返回的索引是 2，没错。
但是如果我想得到 target 的左侧边界，即索引 1，或者我想得到 target 的右侧边界，
即索引 3，这样的话此算法是无法处理的。

这需要寻找左侧边界的二分搜索，寻找右侧边界的二分搜索
 */

// 基本的二分查找
var search = function (nums, target) {
  let left = 0;
  let right = nums.length - 1;
  // 注意用的是闭区间 [left, right]
  while (left <= right) {
    const mid = Math.floor(left + (right - left) / 2);
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
 * 搜索左右边界的二分查找 - 数组中有重复元素
 *  特点：非递减排序的数组，有重复元素，要开始和结束位置，所以不能用普通的二分查找的模板
 找左侧边界的二分查找，找右侧边界的二分查找
 */

// 寻找左侧边界
var left_bound = function (nums, target) {
  let left = 0;
  let right = nums.length - 1;
  while (left <= right) {
    const mid = Math.floor(left + (right - left) / 2);
    if (nums[mid] < target) {
      left = mid + 1;
    } else if (nums[mid] > target) {
      right = mid - 1;
    } else if (nums[mid] === target) {
      right = mid - 1; // 收缩右侧边界  注意与普通二分查找的区别
    }
  }
  // 检查出界情况
  if (left >= nums.length || nums[left] !== target) {
    return -1;
  }
  return left;
};
// 寻找右侧边界
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
      left = mid + 1; // 收缩左侧边界 注意与普通二分查找的区别
    }
  }
  // 检查出界情况
  if (right < 0 || nums[right] !== target) {
    return -1;
  }
  return right;
};
var searchRange = function (nums, target) {
  return [left_bound(nums, target), right_bound(nums, target)];
};
