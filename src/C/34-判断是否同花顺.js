/**
 * 用0-51表示这52张牌，按照顺序，♠A-♠K为0-12，♥A-♥K为13-25，♣A-♣K为26-38，◆A-◆K为39-51
一副牌，发出7张牌，存于数组arr中，实现一个函数返回true或false判断是否有同花顺
 * @param {*} item 
 * @returns

判断数组是否为顺子，则要进行去重，排序，
首先去重排序后的数组要满足长度>=5
其次判断是否顺子：
    数组中只要有一个数字 num+4 等于其在此数组中的下标 i+4，即 arr[i] + 4 = arr[i+4]
然后判断是否同花：
    0<=arr[i]<=12  spade
    13<=arr[i]<=25  heart
    26<=arr[i]<=38  club
    39<=arr[i]<=51  diamand
 */

function spade(item) {
  return item >= 0 && item <= 8;
}
function heart(item) {
  return item >= 13 && item <= 21;
}
function club(item) {
  return item >= 26 && item <= 34;
}
function diamand(item) {
  return item >= 39 && item <= 47;
}

function judge(arr) {
  let result = Array.from(new Set(arr)).sort((a, b) => a - b);

  if (result.length < 5) return false;
  for (let i = 0; i < result.length; i++) {
    if (result[i] + 4 === result[i + 4]) {
      /** 判断是否为同花 */

      // if (result[i] <= 12 && result[i] > 0 && result[i + 4] <= 12 && result[i + 4] >= 0) {
      //     return true
      // } else if (result[i] <= 25 && result[i] > 13 && result[i + 4] <= 25 && result[i + 4] >= 13) {
      //     return true
      // } else if (result[i] <= 38 && result[i] > 26 && result[i + 4] <= 38 && result[i + 4] >= 26) {
      //     return true
      // } else if (result[i] <= 51 && result[i] > 39 && result[i + 4] <= 51 && result[i + 4] >= 39) {
      //     return true
      // }

      // 或 || 只要有一个是true，则返回的值都为true
      return (
        spade(result[i]) ||
        heart(result[i]) ||
        club(result[i]) ||
        diamand(result[i])
      );
    }
  }
  return false;
}

let arr = [9, 5, 6, 7, 7, 8, 0, 11];
let arr1 = [0, 4, 6, 7, 8, 9, 9, 11];
let arr2 = [0, 5, 2, 3, 6, 4, 8];
console.log(judge(arr)); //true
console.log(judge(arr1)); //false
console.log(judge(arr2)); //true
