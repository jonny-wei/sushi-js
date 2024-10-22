/**
 * 对象扁平化与反扁平化 objectFlatten objectUnFlatten
 *
 * lodash.get 函数的味道
 */

/**
 * 方法一：简单对象扁平化
 * 
 * 简单的对象扁平化只考虑了普通对象类型
 *
 * {a:{b:{c:1},d:2}}  -> {a.b.c: 1, a.d: 2}
 */
const objectFlatten1 = (obj) => {
  const res = {};
  function flat(item, preKey = "") {
    Object.entries(item).forEach(([key, val]) => {
      const newKey = preKey ? `${preKey}.${key}` : key;
      if (val && Object.prototype.toString.call(val) === "[object Object]") {
        flat(val, newKey);
      } else {
        res[newKey] = val;
      }
    });
  }
  flat(obj);
  return res;
};

objectFlatten1({ a: { b: { c: 1 }, d: 2 } }); // {a.b.c: 1, a.d: 2}

/**
 * 对象扁平化(推荐)
 * 
 * 其实就是递归拼接 path 路径
 */
const objectFlatten2 = function (obj) {
  let res = {};

  const checkType = (source) => {
    return Object.prototype.toString.call(source).slice(8, -1).toLowerCase();
  };

  const flat = function (obj, path = '') {
    if (checkType(obj) === 'object' && Object.keys(obj).length) {
      for (let key in obj) {
        flat(obj[key], path ? `${path}.${key}` : key);
      }
    } else if (checkType(obj) === 'array' && obj.length) {
      for (let key in obj) {
        flat(obj[key], path ? `${path}[${key}]` : key);
      }
    } else {
      res[path] = obj;
    }
  };

  flat(obj);

  return res;
};
// 测试
objectFlatten2({ a: { b: { c: 1 } }, d: { e: [0, 1] } }); // {a.b.c: 1, d.e[0]: 0, d.e[1]: 1}

/**
 * 对象反扁平化
 * 
 * regex.exec(key) 将 a[0].b.c 解析成类似 [a,0,b,c]
 * 
 * exec 用于在目标字符串中执行一个搜索匹配
 * 
 * (1) \.?：匹配零个或一个点.字符。点号在正则表达式中通常表示任意字符，所以这里需要用反斜杠\进行转义
 * (2) ([^.\[\]]+)：这是一个捕获组，匹配并捕获一个或多个不是点.、开方括号[或闭方括号]的字符序列。这用于捕获对象属性的名称。
 * (3) \[(\d+)\]：这是另一个捕获组，用于匹配方括号内的数字序列，即数组的索引。方括号需要用反斜杠\进行转义，\d+表示匹配一个或多个数字字符，+表示匹配前面的表达式一次或多次。
 * a.b.c  => [ 'a', 'a', undefined, index: 0, input: 'a.b.c', groups: undefined ]
 * a.b.c => [ '.b', 'b', undefined, index: 1, input: 'a.b.c', groups: undefined ]
 * d.e[0] => [ '[0]', undefined, '0', index: 3, input: 'd.e[0]', groups: undefined ]
 */
const objectUnFlatten1 = function (data) {
  // 如果不是对象或者本身就是数组，直接返回
  if (Object(data) !== data || Array.isArray(data)) return data;

  let result = {};
  let regex = /\.?([^.\[\]]+)|\[(\d+)\]/g;

  for (const key in data) {
    let cur = result;
    let path = "";
    let m = null;
    while ((m = regex.exec(key))) {
      if (!cur.hasOwnProperty(path)) {
        // 如果当前路径上没有属性，初始化为数组或对象
        cur[path] = m[2] ? [] : {};
      }
      cur = cur[path];
      path = m[2] || m[1]
    }
    cur[path] = data[key];
  }
  return result[""] || result; // result[""] 关键
};
// 测试
objectUnFlatten1({ "a.b.c": 1, "d.e[0]": 0, "d.e[1]": 1 });