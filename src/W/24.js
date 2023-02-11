/**
 * @param {string} s
 * @param {string} t
 * @return {string}
 * 滑动窗口
 */
var minWindow = function (s, t) {
  // 记录 t 中字符出现次数 - 需要凑齐的字符
  let need = new Map();
  for (let c of t) {
    need.set(c, need.has(c) ? need.get(c) + 1 : 1);
  }
  // 把索引左闭右开区间 [left, right) 称为一个「窗口」。
  // 记录「窗口」中的相应字符的出现次数
  let window = new Map();
  let left = 0;
  let right = 0;
  // valid 变量表示窗口中满足 need 条件的字符个数，
  // 如果 valid 和 need.size 的大小相同，则说明窗口已满足条件，已经完全覆盖了串 t。
  let valid = 0;
  // 通过子串起始位置和长度，得到结果
  let start = 0;
  let len = Infinity;
  while (right < s.length) {
    // 先不断地增加 right 指针扩大窗口 [left, right)，
    // 直到窗口中的字符串符合要求（包含了 t 中的所有字符）
    let char = s.charAt(right); // 即将移入窗口的字符
    // 增大窗口
    right++;
    // 进行窗口内数据的一系列更新
    if (need.has(char)) {
      window.set(char, window.has(char) ? window.get(char) + 1 : 1);
      if (window.get(char) === need.get(char)) {
        valid++;
      }
    }
    console.log(left, right,start, len,window, char,valid);
    // 不断增加 left 指针缩小窗口 [left, right)，
    // 直到窗口中的字符串不再符合要求（不包含 T 中的所有字符了）。
    // 同时，每次增加 left，我们都要更新一轮结果。
    // 判断左侧窗口是否要收缩
    while (valid === need.size) {
      //  在这里更新最小覆盖子串
      if (right - left < len) {
        start = left;
        len = right - left;
      }
      console.log('left',left, right, start, len);
      // 移除移出窗口的字符
      let dChar = s.charAt(left);
      // 左移窗口
      left++;
      // 进行窗口内数据的一系列更新
      if (need.has(dChar)) {
        if (window.get(dChar) === need.get(dChar)) {
          valid--;
        }
        window.set(dChar, window.has(dChar) ? window.get(dChar) - 1 : 1);
      }
      console.log('left window',left, right,start, len, window, dChar);
    }
  }
  return len === Infinity ? "" : s.substring(start, start + len);
};


console.log('res', minWindow('ADOBECODEBANC', 'ABC'))