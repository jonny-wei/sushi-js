/**
 * 查找字符串中出现最多的字符和个数
 *
 * 例: abbcccddddd -> 字符最多的是d，出现了5次
 */
const maxChar = (str) => {
  const map = new Map();
  let max = {
      char: null,
      count: 0,
  };
  for (let char of str) {
      if (map.has(char)) {
          map.set(char, map.get(char) + 1);
      } else {
          map.set(char, 1);
      }

      max.char = map.get(char) === max.count ? max.char : char;
      max.count = Math.max(max.count, map.get(char));
  }

  return max;
};

console.log(maxChar("abbcccddddd")) // { char: 'd', count: 5 }

/**
 * 字符串压缩
 * 
 * @param {*} str 
 * @returns 
 */
const slowStr = (str) => {
  const map = new Map();
  let res = "";

  for (let char of str) {
    if (map.has(char)) {
      map.set(char, map.get(char) + 1);
    } else {
      map.set(char, 1);
    }
  }

  for (let [key, value] of map.entries()) {
    res += `${value}${key}`;
  }

  return res;
};

// 测试案例
console.log(slowStr("aabbc")); // 输出: "2a2b1c"
console.log(slowStr("hello")); // 输出: "1h1e2l1o"
console.log(slowStr("")); // 输出: ""
console.log(slowStr("a")); // 输出: "1a"
console.log(slowStr("abcabc")); // 输出: "2a2b2c"


/**
 * 判断字符串 a 是否被包含在字符串 b 中，并返回第一次出现的位置（找不到返回 -1）
 */
function isContain(a, b) {
  for (let i in b) {
    if (a[0] === b[i]) {
      let tmp = true;
      for (let j in a) {
        if (a[j] !== b[~~i + ~~j]) {
          tmp = false;
        }
      }
      if (tmp) {
        return i;
      }
    }
  }
  return -1;
}
// 测试
a = "34";
b = "1234567"; // 返回 2
a = "35";
b = "1234567"; // 返回 -1
a = "355";
b = "12354355"; // 返回 5
isContain(a, b);