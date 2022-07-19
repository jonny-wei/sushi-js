/**
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
 function convertString(str) {
    // your code goes here 请⽤正则实现
    const reg = /(\d+)\[([^\[\]]+)\]/g;
    const res = str.replace(reg, (match, p1, p2) => p2.repeat(p1));
    // 嵌套的规则 递归
    return reg.test(res) ? convertString(res) : res;
  }
  
  const res1 = convertString("3[x]2[y0.%&]");
  const res2 = convertString("3[x2[y]]");
  const res3 = convertString("2[xyz]3[ab]cd");
  console.log(res1, res2, res3);
  