/**
 * 找出数组中第k⼤和第m⼤的数字相加之和
 * 说明：实现⼀个⽅法，找出数组中第k⼤的和第m⼤的数字相加之和
 * 示例：
 *   let arr = [1,2,4,4,3,5], k = 2, m = 4
 *   findTopSum(arr, k, m); // 第2⼤的数是4，出现2次，第4⼤的是2，出现1次，所以
结果为10
 */
function findTopSum(arr, k, m) {
  
    // 先实现一个在数组中找第K大的数的函数
    // 在长度为n的排序无重复元素的数组中，第k大的数字的下标是n-k
    const findTopNum = (array, x) => {
      // 1. 数组排序
      let arr = array.sort((a, b) => a - b);
      
      // 2. 数组去重
      arr = [...new Set(arr)];
  
      // 3. 在长度为n的排序无重复元素的数组中，第k大的数字的下标是n-k
      return arr[arr.length - x]
    };
  
    return findTopNum(arr, k) + findTopNum(arr, m)
  }
  
  let arr = [1, 2, 4, 4, 3, 5];
  const res = findTopSum(arr, 2, 4);
  console.log(res);
  