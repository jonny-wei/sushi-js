/**
 * 对象扁平化
 */

const objectFlat = (obj) => {
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

objectFlat({a:{b:{c:1},d:2}})
// {a.b.c: 1, a.d: 2}