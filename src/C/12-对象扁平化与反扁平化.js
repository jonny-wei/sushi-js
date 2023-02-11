/**
 * 对象扁平化与反扁平化
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
  let result = {};
  const checkType = function (source) {
    return Object.prototype.toString.call(source).slice(8, -1).toLowerCase();
  };
  const flat = function (object, path = "") {
    if (checkType(object) === "object") {
      let isEmpty = true;
      for (const key in object) {
        isEmpty = false;
        flat(object[key], path ? `${path}.${key}` : key);
      }
      if (isEmpty && path) {
        result[path] = {};
      }
    } else if (checkType(object) === "array") {
      let len = object.length;
      if (len > 0) {
        object.forEach((item, index) => {
          flat(item, path ? `${path}[${index}]` : index);
        });
      } else {
        result[path] = [];
      }
    } else {
      result[path] = object;
    }
  };

  flat(obj);
  return result;
};
// 测试
objectFlatten2({ a: { b: { c: 1 } }, d: { e: [0, 1] } }); // {a.b.c: 1, d.e[0]: 0, d.e[1]: 1}

/**
 * 对象反扁平化
 * 方法一 正则 (推荐)
 * 
 * regex.exec(key) 将 a[0].b.c 解析成类似 [a,0,b,c]
 * 这儿只不过是正则解析的数组
 * 然后 while 循环这个数组构造对象
 */
const objectUnFlatten1 = function (data) {
  if (Object(data) !== data || Array.isArray(data)) return data;
  let regex = /\.?([^.\[\]]+)|\[(\d+)\]/g;
  let result = {};
  for (const key in data) {
    let cur = result;
    let path = "";
    let m = null;
    while ((m = regex.exec(key))) {
      cur = cur[path] || (cur[path] = m[2] ? [] : {});
      path = m[2] || m[1];
    }
    cur[path] = data[key];
  }
  return result[""] || result; // result[""] 关键
};
// 测试
objectUnFlatten1({ "a.b.c": 1, "d.e[0]": 0, "d.e[1]": 1 });

/**
 * 对象反扁平化
 * 方法二 字符串处理（有误）
 * 
 * indexOf 以path路径的'.'查找idx 下标
 * 再用substring(last,idx) 截取作为 key 
 *
 * String.prototype.indexOf(searchValue, fromIndex)
 * fromIndex 开始查找的位置
 *
 * String.prototype.substring(indexStart, indexEnd)
 * 返回一个字符串在开始索引到结束索引之间的一个子集, 或从开始索引直到字符串的末尾的一个子集。
 */
const objectUnFlatten = function (data) {
  if (Object(data) !== data || Array.isArray(data)) return data;
  let result = {};
  let cur, path, idx, last, temp;
  for (let key in data) {
    cur = result;
    path = "";
    last = 0;
    do {
      idx = key.indexOf(".", last);
      temp = key.substring(last, idx !== -1 ? idx : undefined);
      cur = cur[path] || (cur[path] = !isNaN(parseInt(temp)) ? [] : {});
      path = temp;
      last = idx + 1;
    } while (idx >= 0);
    cur[path] = data[key];
  }
  return result[""];
};
// 测试
objectUnFlatten({ "a.b.c": 1, "d.e[0]": 0, "d.e[1]": 1 });