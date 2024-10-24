/**
 * 判断同花顺
 * 
 * 用0-51表示这52张牌，按照顺序，♠A-♠K为0-12，♥A-♥K为13-25，♣A-♣K为26-38，◆A-◆K为39-51
 * 一副牌，发出7张牌，存于数组arr中，实现一个函数返回true或false判断是否有同花顺
 * 
 * 核心是：判断5个数字是否是连续并且属于同意色系组的
 * 
 * (1) 判断数组是否为顺子，则要进行去重，排序，首先去重排序后的数组要满足长度 >=5。其次判断是否顺子：数组中只要有一个数字 num+4 等于其在此数组中的下标 i+4，即 arr[i] + 4 = arr[i+4]
 * (2) 然后判断是否同花：
 * 0<=arr[i]<=12   spade
 * 13<=arr[i]<=25  heart
 * 26<=arr[i]<=38  club
 * 39<=arr[i]<=51  diamond
 */

function isSpade(item) {
  return item >= 0 && item <= 12;
}

function isHeart(item) {
  return item >= 13 && item <= 25;
}

function isClub(item) {
  return item >= 26 && item <= 38;
}

function isDiamond(item) {
  return item >= 39 && item <= 51;
}

function isSameSuitAndConsecutive(arr) {
  // 去重并排序
  const uniqueSortedArr = Array.from(new Set(arr)).sort((a, b) => a - b);

  if (uniqueSortedArr.length < 5) return false;

  for (let i = 0; i <= uniqueSortedArr.length - 5; i++) {
    const subArray = uniqueSortedArr.slice(i, i + 5);
    const isConsecutive = subArray.every((val, idx) => val === subArray[0] + idx);
    const isSameSuit = subArray.some(isSpade) || subArray.some(isHeart) || subArray.some(isClub) || subArray.some(isDiamond);

    if (isConsecutive && isSameSuit) {
      return true;
    }
  }

  return false;
}

// 测试案例
console.log(isSameSuitAndConsecutive([0, 1, 2, 3, 4, 5, 6])); // true (♠A, ♠2, ♠3, ♠4, ♠5)
console.log(isSameSuitAndConsecutive([13, 14, 15, 16, 17, 18, 19])); // true (♥A, ♥2, ♥3, ♥4, ♥5)
console.log(isSameSuitAndConsecutive([26, 27, 28, 29, 30, 31, 32])); // true (♣A, ♣2, ♣3, ♣4, ♣5)
console.log(isSameSuitAndConsecutive([39, 40, 41, 42, 43, 44, 45])); // true (◆A, ◆2, ◆3, ◆4, ◆5)
console.log(isSameSuitAndConsecutive([0, 13, 26, 39, 4, 5, 6])); // false (不同花色)
