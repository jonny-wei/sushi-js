/**
 * 字符串转化为特定的结构化数据 normalize
 *
 * 示例一: 'abc' --> {value: 'abc'}
 * 示例二：'[abc[bcd[def]]]' --> {value: 'abc', children: {value: 'bcd', children: {value: 'def'}}}
 */

const normalize = (str) => {
  let result = {};
  let cur = result;
  const arr = str.split(/[\[\]]/g).filter(Boolean);

  arr.forEach((item, index) => {
    if (index !== 0) {
      cur.children = {};
      cur.children.value = item;
      cur = cur.children;
    } else {
      result.value = item;
      cur = result;
    }
  });

  return result;
};

// 测试
normalize("[abc[bcd[def]]]");
// {value: 'abc', children: {value: 'bcd', children: {value: 'def'}}}
