// 对象扁平化
// {a:{b:{c: 1}}, d:{e:[0,1]}} -> {'a.b.c': 1, 'd.e[0]': 0, 'd.e[1]': 1}
const flatObject = (object) => {
  let res = {};
  const checkType = (target) => {
    return Object.prototype.toString.call(target).slice(8, -1).toLowerCase();
  };
  const flat = (obj, path = "") => {
    if (checkType(obj) === "object") {
      let isEmpty = true;
      for (const key in obj) {
        isEmpty = false;
        flat(obj[key], path ? `${path}.${key}` : key);
      }
      if (path && isEmpty) {
        res[path] = {};
      }
    } else if (checkType(obj) === "array") {
      if (obj.length) {
        obj.forEach((item, index) => {
          flat(item, path ? `${path}[${index}]`: index);
        });
      } else {
        res[path] = [];
      }
    } else {
      res[path] = obj;
    }
  };
  flat(object);
  return res;
};
// test
const res = flatObject({ a: { b: { c: 1 } }, d: { e: [0, 1] } });
console.log(res);
