/**
 * 归并排序 Merge sort
 *
 * 建立在归并操作上的一种有效的排序算法。该算法是采用分治法（Divide and Conquer）的一个非常典型的应用。
 * 作为一种典型的分而治之思想的算法应用，归并排序的实现由两种方法：
 * 1. 自上而下的递归（所有递归的方法都可以用迭代重写，所以就有了第 2 种方法）
 * 2. 自下而上的迭代
 *
 * 算法原理
 * 归并排序是用分治思想，分治模式在每层递归上有三个步骤：
 * 1. 分解（Divide）：将 n 个元素分成含 n / 2 个元素的子序列
 * 2. 解决（Comquer）：用合并排序法对两个子序列递归的排序
 * 3. 合并（Combine）：合并两个已排序的子序列已得到排序结果
 *
 * 迭代法
 * 1. 申请临时空间，使其大小为两个已经排序序列之和，该空间用来存放合并后的序列
 * 2. 设定两个指针，最初位置分别为两个已经排序序列的起始位置
 * 3. 比较两个指针所指向的元素，选择相对小的元素放入到合并空间，并移动指针到下一位置
 * 4. 重复步骤 3 直到某一指针达到序列尾
 * 5. 将另一序列剩下的所有元素直接复制到合并序列尾
 *
 * 递归法
 * 1. 将序列每相邻两个数字进行归并操作，形成 Math.floor(n / 2) 个序列，排序后每个序列包含两个元素
 * 2. 将上述序列再次归并，形成 Math.floor(n / 4) 个序列，每个序列包含四个元素
 * 3. 重复步骤 2，直到所有元素排序完毕
 *
 * 算法复杂度
 *
 * 平均时间复杂度：O(nlogn)
 * 空间复杂度：O(n) 不属于原地排序
 * 稳定性：稳定
 * 排序方式：In-place
 *
 * 不管元素在什么情况下都要做这些步骤，所以花销的时间是不变的，
 * 所以该算法的最优时间复杂度和最差时间复杂度及平均时间复杂度都是一样的为：O( nlogn )
 *
 * 归并排序算法中，归并最后到底都是相邻元素之间的比较交换，并不会发生相同元素的相对位置发生变化，故是稳定性算法。
 */

/**
 * 采用自上而下的递归
 *
 */

// 分（切割）
const mergeSort = function (arr) {
  let len = arr.length;

  // 当分裂到数组元素仅存一个或没有时，表示无法再分裂了，返回数组进行归并
  if (len <= 1) {
    return arr;
  }
  // 计算切割点
  let mid = Math.floor(len / 2);
  let left = mergeSort(arr.slice(0, mid));
  let right = mergeSort(arr.slice(mid));

  return merge(left, right);
};

// 治（归并）
const merge = function (left, right) {
  let sorted = [];
  while (left.length && right.length) {
    if (left[0] <= right[0]) {
      /**
       * 左边数组的首元素比右边数组的首元素小
       *  将左边数组首元素弹出，并压入已排序数组中
       * arr.shift() 会改变数组长度
       */
      sorted.push(left.shift());
    } else {
      sorted.push(right.shift());
    }
  }

  /**
   * 走到这说某一边数组已空
   * 所以如果另一边数组还有一个元素，则直接推出原数组，并推入已排序数组
   */
  while (left.length) {
    sorted.push(left.shift());
  }
  while (right.length) {
    sorted.push(right.shift());
  }
  return sorted;
};
