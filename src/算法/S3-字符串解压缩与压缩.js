/**
 * 解码字符串
 * 
 * 说明：给定⼀个编码字符，按编码规则进⾏解码，输出字符串
 * 编码规则是`count[content]`，将 content 的内容 count 次输出，
 * count是 >=0 的整数，content是任意内容(不含'['或']')
 * 示例：
 * const s = '3[x]2[y0.%&]'; convertString(str); // 返回'xxxy0.%&y0.%&'
 * const s = '3[x2[y]]'; convertString(str); // 返回'xyyxyyxyy'
 * const s = '2[xyz]3[ab]cd'; convertString(s); // 返回'xyzxyzabababcd'
 *
 * 有点字符串编码，字符串压缩后反压缩，解码的意思
 */

/**
 * 方法一
 * 
 * 递归处理嵌套的压缩模式
 * @param {*} str 
 * @returns 
 */
function convertString(str) {
  // your code goes here 请⽤正则实现
  const reg = /(\d+)\[([^\[\]]+)\]/g;
  const res = str.replace(reg, (match, p1, p2) => p2.repeat(p1));
  // 嵌套的规则 递归
  return reg.test(res) ? convertString(res) : res;
}

console.log(convertString('3[x]2[y0.%&]')); // 返回'xxxy0.%&y0.%&'
console.log(convertString('3[x2[y]]')); // 返回'xyyxyyxyy'
console.log(convertString('2[xyz]3[ab]cd')); // 返回'xyzxyzabababcd'

/**
 * 方法二
 * 
 * 优化
 * @param {*} str 
 * @returns 
 */
function convertString(str) {
  let result = str;
  const reg = /(\d+)\[([^\[\]]+)\]/g;

  // 使用循环代替递归，避免栈溢出
  while (true) {
    const newResult = result.replace(reg, (match, count, content) => content.repeat(parseInt(count, 10)));
    if (newResult === result) {
      break; // 没有更多匹配项，退出循环
    }
    result = newResult;
  }

  return result;
}

/**
 * 压缩
 * 
 * @param {*} str 
 * @returns 
 */
function compressString(str) {
  const result = [];
  let i = 0;

  function findPattern(start) {
      for (let length = 1; length <= (str.length - start) / 2; length++) {
          const pattern = str.slice(start, start + length);
          let count = 1;
          let j = start + length;

          while (j < str.length && str.slice(j, j + length) === pattern) {
              count++;
              j += length;
          }

          if (count > 1) {
              return { pattern, count, next: j };
          }
      }

      return null;
  }

  while (i < str.length) {
      const patternInfo = findPattern(i);

      if (patternInfo) {
          // 如果找到了重复模式，添加压缩后的形式到结果中
          result.push(`${patternInfo.count}[${compressString(patternInfo.pattern)}]`);
          i = patternInfo.next; // 移动索引到模式之后的位置
      } else {
          // 如果没有找到重复模式，直接添加当前字符
          result.push(str[i]);
          i++;
      }
  }

  return result.join('');
}

// 测试案例
console.log(compressString('xxxy0.%&y0.%&')); // 输出: "3[x]2[y0.%&]"
console.log(compressString('xyyxyyxyy')); // 输出: "3[x2[y]]"
console.log(compressString('abcabcabc')); // 输出: "3[abc]"
console.log(compressString('aabbccdd')); // 输出: "2[a2[b]2[c]2[d]]"
console.log(compressString('aabbccddeeffgg')); // 输出: "2[a2[b]2[c]2[d]2[e]2[f]2[g]]"
console.log(compressString('abababab')); // 输出: "4[ab]"
console.log(compressString('aaaaa')); // 输出: "5[a]"
console.log(compressString('abcde')); // 输出: "abcde" (没有重复模式)
console.log(compressString('a')); // 输出: "a" (单个字符)
console.log(compressString('')); // 输出: "" (空字符串)
console.log(compressString('ababababcabcabc')); // 输出: "3[ababab]3[abc]"