// 对象 反扁平化
// {a.b.c: 1, d.e[0]: 0, d.e[1]: 1} -> { a: { b: { c: 1 } }, d: { e: [0, 1] } }
// a.b.c -> [a,b,c] d.e[0] -> [d,e,0]
const unFlatObject = (object) => {
  let result = {};
  const regex = /\.?([^.\[\]]+)|\[(\d+)\]/g;
  for (const key in object) {
    let cur = result;
    let path = "";
    let m = null;
    while ((m = regex.exec(key))) {
      cur = cur[path] || (cur[path] = m[2] ? [] : {});
      path = m[2] || m[1];
    }
    cur[path] = object[key];
  }
  return result[""] || result;
};

const res = unFlatObject({ "a.b.c": 1, "d.e[0]": 0, "d.e[1]": 1 });
console.log(res);
