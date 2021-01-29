/**
 * 洗牌算法
 *
 * 早前的 chrome 对于元素小于 10 的数组会采用插入排序，这会导致对数组进行的乱序并不是真正的乱序，
 * 即使最新的版本 chrome 采用了原地算法使得排序变成了一个稳定的算法，对于乱序的问题仍没有解决
 *
 * 通过洗牌算法可以达到真正的乱序，洗牌算法分为原地和非原地，
 * 原地的洗牌算法，不需要声明额外的数组从而更加节约内存占用率，
 * 原理是依次遍历数组的元素，将当前元素和之后的所有元素中随机选取一个，进行交换
 */

/**
 * 原地洗牌算法
 */
function shuffle(arr) {
  for (let i = 0; i < arr.length; i++) {
    let randomIndex = i + Math.floor(Math.random() * (arr.length - i));
    [arr[i], arr[randomIndex]] = [arr[randomIndex], arr[i]];
  }
  return arr;
}

/**
 * 非原地洗牌算法
 */
function shuffle2(arr) {
  let _arr = [];
  while (arr.length) {
    let randomIndex = Math.floor(Math.random() * arr.length);
    _arr.push(arr.splice(randomIndex, 1)[0]);
  }
  return _arr;
}
