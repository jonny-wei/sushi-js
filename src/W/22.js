// 通用的数组去重
function removeDeplicates(arr) {
  let obj = {};
  return arr.filter((item) => {
    if (obj[typeof item + JSON.stringify(item)]) {
      return false;
    } else {
      obj[typeof item + JSON.stringify(item)] = true;
      return true;
    }
  });
}
const arr = [
  0,
  0,
  1,
  2,
  undefined,
  2,
  "a",
  null,
  { a: 1 },
  { a: 2 },
  { a: 3 },
  null,
  "a",
  [],
  undefined,
  { a: 1 },
  [],
  NaN,
  true,
  new Date(),
  NaN,
  /a/,
  new Date(),
  true,
  /a/,
];
const deplicates2 = removeDeplicates(arr);
console.log("方法2 ->", deplicates2);
