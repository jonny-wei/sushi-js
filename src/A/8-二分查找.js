/**
 * 二分查找
 *
 * 二分查找算法（Binary Search Algorithm），也称 折半搜索算法（Half-interval Search Algorithm）、
 * 对数搜索算法（Logarithmic Search Algorithm），是一种在 有序数组(不一定非要有序) 中查找某一特定元素的搜索算法。
 *
 * 算法原理
 *
 * 搜索过程从数组的中间元素开始，如果中间元素正好是要查找的元素，则搜索过程结束；
 * 如果某一特定元素大于或者小于中间元素，则在数组大于或小于中间元素的那一半中查找，
 * 而且跟开始一样从中间元素开始比较。如果在某一步骤数组为空，则代表找不到。
 * 这种搜索算法每一次比较都使搜索范围缩小一半。
 *
 * 二分查找法的思想不仅仅可以用在有序数组里元素的查找上。如果是一个问题，待查找的数是整数，且知道范围，
 * 大概就可以通过逐步排查，缩小问题的规模的方式找到，这种算法也是二分查找算法。
 * 二分查找实现的最简单情况就是有序数组中不存在重复元素，我们在其中用二分查找值等于给定值的数据。
 *
 * 平均时间复杂度O(log2 n)折半查找法
 *
 * 并不是什么情况下都可以用二分查找，它的应用场景是有很大局限性的：
 * 1. 二分查找依赖的是顺序表结构，简单点说就是数组。主要原因是二分查找算法需要按照下标随机访问元素，所以不能是链表
 * 2. 二分查找针对的是有序数据。数据必须是有序的。如果数据没有序，我们需要先排序。
 * 3. 数据量太小不适合二分查找
 * 4. 数据量太大也不适合二分查找
 *
 * 常见变形题
 * 1. 查找 第一个值等于 给定值的元素
 * 2. 查找 最后一个值等于 给定值的元素
 * 3. 查找 第一个大于等于 给定值的元素
 * 4. 查找 最后一个小于等于 给定值的元素
 */

// 二分查找前提是有序数组

/**
 * 查找第一个值等于给定值的元素
 * @param {*} arr
 * @param {*} target
 * @returns
 */
const binarySearch = function (arr, target) {
  if (arr.length === 0) return -1;
  let mid,
    start = 0,
    end = arr.length - 1;
  while (start <= end) {
    mid = Math.floor((start + end) / 2);
    if (arr[mid] > target) {
      // 目标值在左半区
      end = mid - 1;
    } else if (arr[mid] < target) {
      // 目标值在右半区
      start = mid + 1;
    } else {
      /**
       * 此时 arr[mid] === target 但是不是第一个等于target的元素需要进一步确认
       * 如果 mid = 0 说明目标值已经是数组的第一个值了就是要找的
       * 如果 mid !== 0 但是 arr[mid] 的前一个值也等于目标值，即arr[mid -1] === target
       * 那么说明目标值索引小于mid，即目标值在左半区，所以要 end = mid - 1
       * 否则 arr[mid] 就是要找的
       */
      if (mid === 0 || arr[mid - 1] !== target) {
        return mid;
      } else {
        end = mid - 1;
      }
    }
  }
  return -1;
};

/**
 * 查找最后一个值等于给定值的元素
 * @param {*} arr
 * @param {*} target
 * @returns
 */
const binarySearch = function (arr, target) {
  if (arr.length === 0) return -1;
  let mid,
    start = 0,
    end = arr.length - 1;
  while (start <= end) {
    mid = Math.floor((start + end) / 2);
    if (arr[mid] > target) {
      // 目标值在左半区
      end = mid - 1;
    } else if (arr[mid] < target) {
      // 目标值在右半区
      start = mid + 1;
    } else {
      /**
       * 与查找第一个值等于给定值的元素相反
       * 此时 arr[mid] === target 但是不是最后一个值等于target的元素需要进一步确认
       * 如果 mid = arr.length - 1 说明目标值已经是数组的最后一个值了就是要找的
       * 如果 mid !== arr.length - 1 但是 arr[mid] 的后一个值也等于目标值，即arr[mid + 1] === target
       * 那么说明目标值索引大于mid，即目标值在右半区，所以要 start = mid + 1
       * 否则 arr[mid] 就是要找的
       */
      if (mid === arr.length - 1 || arr[mid + 1] !== target) {
        return mid;
      } else {
        start = mid + 1;
      }
    }
  }
  return -1;
};

/**
 * 查找第一个大于等于给定值的元素
 * @param {*} arr
 * @param {*} target
 * @returns
 */
const binarySearch = function (arr, target) {
  if (arr.length === 0) return -1;
  let mid,
    start = 0,
    end = arr.length - 1;
  while (start <= end) {
    mid = Math.floor((start + end) / 2);
    if (arr[mid] >= target) {
      // 目标值在左半区
      if (mid === 0 || arr[mid - 1] < target) {
        return mid;
      } else {
        end = mid - 1;
      }
    } else {
      // 目标值在右半区
      start = mid + 1;
    }
  }
  return -1;
};

/**
 * 查找 最后一个小于等于 给定值的元素
 * @param {*} arr
 * @param {*} target
 * @returns
 */
const binarySearch = function (arr, target) {
  if (arr.length === 0) return -1;
  let mid,
    start = 0,
    end = arr.length - 1;
  while (start <= end) {
    mid = Math.floor((start + end) / 2);
    if (arr[mid] > target) {
      // 目标值在左半区
      end = mid - 1;
    } else {
      // 目标值在右半区
      if (mid === 0 || arr[mid - 1] < target) {
        return mid;
      } else {
        start = mid + 1;
      }
    }
  }
  return -1;
};
