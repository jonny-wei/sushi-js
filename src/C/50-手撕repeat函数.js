/**
 * 手撕 repeat 函数
 *
 * _.repeat([string=''], [n=1])：String
 * _.repeat('abc', 2); => 'abcabc'
 */

// 方法一 递归实现
function repeat(src, n) {
  return n > 0 ? src.concat(repeat(src, --n)) : "";
}

// 方法二 迭代
function repeat(src, n) {
    var s = src,
      total = "";
    while (n > 0) {
      if (n % 2 == 1) {
        total += s;
      }
      if (n == 1) {
        break;
      }
      s += s;
      n = n / 2;
    }
    return total;
  }

// 方法三 数组实现
function repeat(src, n) {
  return new Array(n + 1).join(src);
}

