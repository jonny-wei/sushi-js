/**
 *  v8 排序源码
 *
 * 1. 当 n<=10 时，采用插入排序；
 * 2. 当 n>10 时，采用三路快速排序；
 * 3. 10<n <=1000，采用中位数作为哨兵元素；third_index = from + ((to - from) >> 1);
 * 4. n>1000，每隔 200~215 个元素挑出一个元素，放到一个新数组中，然后对它排序，找到中间位置的数，以此作为中位数。
 *
 * 如果当 n 足够小的时候，最好的情况下，插入排序的时间复杂度为 O(n) 要优于快速排序的 O(nlogn)，
 * 因此就解释了这里当 V8 实现 JS 数组排序算法时，数据量较小的时候会采用插入排序的原因了。
 * 当 n 足够大，使用快速排序明显优于插入排序。
 * 
 * 快速排序的关键点就在于基准的选择，选取不同的基准时，会有不同性能表现。
 * 
 * https://github.com/mqyqingfeng/Blog/issues/52
 */

/**
 * 插入排序
 *
 * 将第一个元素视为有序序列，遍历数组，将之后的元素依次插入这个构建的有序序列中。
 * 最好情况：数组升序排列，时间复杂度为：O(n)
 * 最坏情况：数组降序排列，时间复杂度为：O(n²)
 * 插入排序是稳定的算法。
 * 优势：
 * 当数组是快要排序好的状态或者问题规模比较小的时候，插入排序效率更高。
 * 这也是为什么 v8 会在数组长度小于等于 10 的时候采用插入排序。
 */
function insertionSort(arr) {
  for (var i = 1; i < arr.length; i++) {
    var element = arr[i];
    for (var j = i - 1; j >= 0; j--) {
      var tmp = arr[j];
      var order = tmp - element;
      if (order > 0) {
        arr[j + 1] = tmp;
      } else {
        break;
      }
    }
    arr[j + 1] = element;
  }
  return arr;
}

var arr = [6, 5, 4, 3, 2, 1];
console.log(insertionSort(arr));

/**
 * 快速排序
 *
 * 1. 选择一个元素作为"基准"
 * 2. 小于"基准"的元素，都移到"基准"的左边；大于"基准"的元素，都移到"基准"的右边。
 * 3. 对"基准"左边和右边的两个子集，不断重复第一步和第二步，直到所有子集只剩下一个元素为止。
 * 
 * 快速排序是不稳定的排序。例如： [1, 2, 3, 3, 4, 5]
 * 而原地排序中基准取最左边的元素。快速排序的关键点就在于基准的选择，选取不同的基准时，会有不同性能表现。
 * 
 */

// 然而这种实现方式需要额外的空间用来储存左右子集，所以还有一种原地(in-place)排序的实现方式。
var quickSort = function (arr) {
  if (arr.length <= 1) {
    return arr;
  }
  // 取数组的中间元素作为基准
  var pivotIndex = Math.floor(arr.length / 2);
  var pivot = arr.splice(pivotIndex, 1)[0];

  var left = [];
  var right = [];

  for (var i = 0; i < arr.length; i++) {
    if (arr[i] < pivot) {
      left.push(arr[i]);
    } else {
      right.push(arr[i]);
    }
  }
  return quickSort(left).concat([pivot], quickSort(right));
};

// 原地快排
function quickSort(arr) {
  // 交换元素
  function swap(arr, a, b) {
    var temp = arr[a];
    arr[a] = arr[b];
    arr[b] = temp;
  }

  function partition(arr, left, right) {
    var pivot = arr[left];
    var storeIndex = left;

    for (var i = left + 1; i <= right; i++) {
      if (arr[i] < pivot) {
        swap(arr, ++storeIndex, i);
      }
    }

    swap(arr, left, storeIndex);

    return storeIndex;
  }

  function sort(arr, left, right) {
    if (left < right) {
      var storeIndex = partition(arr, left, right);
      sort(arr, left, storeIndex - 1);
      sort(arr, storeIndex + 1, right);
    }
  }

  sort(arr, 0, arr.length - 1);

  return arr;
}

console.log(quickSort(6, 7, 3, 4, 1, 5, 9, 2, 8));
