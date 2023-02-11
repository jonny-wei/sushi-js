// 深比较
const deepEqual = (t1, t2) => {
  if (typeof t1 !== typeof t2) return false;

  const checkType = (t) => {
    return Object.prototype.toString.call(t).slice(8, -1).toLowerCase();
  };

  return (
    checkType(t1) === checkType(t2) && JSON.stringify(t1) === JSON.stringify(t2)
  );
};

const res1 = deepEqual({ a: 1, b: 2 }, { a: 1, b: 2 }); // true
const res2 = deepEqual([1, 2], [1, 2]); // true
const res3 = deepEqual(Number(1), Number(1)); // true, 注意
const res4 = deepEqual([1, 2], [1, 2, 3]); // false
const res5 = deepEqual([1, 2], { 0: 1, 1: 2 }); // false
const res6 = deepEqual(new Boolean(false), false); // false 前者对象类型，后者布尔类型
const res7 = deepEqual(Boolean(false), false); // true 注意
console.log(res1, res2, res3, res4, res5, res6, res7);
