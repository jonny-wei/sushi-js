/**
 * 实现一个 normalize 函数，能将输入的特定的字符串转化为特定的结构化数据
 *
 * 示例一: 'abc' --> {value: 'abc'}
 * 示例二：'[abc[bcd[def]]]' --> {value: 'abc', children: {value: 'bcd', children: {value: 'def'}}}
 */
let normalize = (str) => {
  let result = {};
  let c;
  // 字符串转化为数组
  let arr = str.split(/[\[\]]/g).filter(Boolean);
  // 生成结构化数据
  arr.forEach((item, index) => {
    if (index != 0) {
      c.children = {};
      c.children.value = item;
      c = c.children;
    } else {
      result.value = item;
      c = result;
    }
  });
  return result;
};
let str = "[abc[bcd[def]]]";
normalize(str);
// {value: 'abc', children: {value: 'bcd', children: {value: 'def'}}}
