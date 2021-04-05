/**
 * 堆排序 Heap Sort
 *
 * 利用堆这种数据结构所设计的一种排序算法。堆积是一个近似完全二叉树的结构，并同时满足堆积的性质：
 * 即子结点的键值或索引总是小于（或者大于）它的父节点。
 * 堆排序可以说是一种利用堆的概念来排序的选择排序。分为两种方法：
 * 1. 大顶堆：每个节点的值都大于或等于其子节点的值，在堆排序算法中用于升序排列；
 * 2. 小顶堆：每个节点的值都小于或等于其子节点的值，在堆排序算法中用于降序排列；
 *
 * 算法原理
 * 1. 先将初始的 Heap[0...n-1] 建立成最大堆，此时是无序堆，而堆顶是最大元素
 * 2. 再将堆顶 Heap[0] 和无序区的最后一个记录 Heap[n-1] 交换，
 * 由此得到新的 无序区 Heap[0...n-2] 和 有序区 Heap[n-1]，
 * 且满足 Heap[0...n-2].keys <= Heap[n-1].key
 * 3. 由于交换后新的根 Heap[1] 可能违反堆性质，故应将当前无序区 Heap[1..n-1] 调整为堆。
 * 然后再次将 Heap[1..n-1] 中关键字最大的记录 Heap[1] 和该区间的最后一个记录 Heap[n-1] 交换，
 * 由此得到新的无序区 Heap[1..n-2] 和有序区 Heap[n-1..n]，
 * 且仍满足关系 Heap[1..n-2].keys≤R[n-1..n].keys，同样要将 Heap[1..n-2] 调整为堆。
 * 4. 直到无序区只有一个元素为止。
 *
 * 算法复杂度
 * 平均时间复杂度 O(nlogn)
 * 空间复杂度 O(n)
 * 稳定性：不稳定
 */

const heapSort = function (arr) {
  // 建堆
  let size = arr.length;
  for (let i = Math.floor(size / 2) - 1; i >= 0; i--) {
    heapify(arr, i, size);
  }
  // 堆排序
  for (let j = size - 1; j >= 1; j--) {
    [arr[0], arr[j]] = [arr[j], arr[0]];
    heapify(arr, 0, --size);
  }
  return arr;
};
function heapify(arr, index, len) {
  let leftIndex = index * 2 + 1;
  let rightIndex = index * 2 + 2;
  let largest = index;
  if (leftIndex < len && arr[leftIndex] > arr[largest]) {
    largest = leftIndex;
  }
  if (rightIndex < len && arr[rightIndex] > arr[largest]) {
    largest = rightIndex;
  }
  if (largest !== index) {
    [arr[index], arr[largest]] = [arr[largest], arr[index]];
    heapify(arr, largest, len);
  }
}
