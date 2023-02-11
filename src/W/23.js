/**
 * deepEqual
 * 考察 valueOf 和 数据类型
 * 写⼀个 deepEqual 函数⽤来判断两个参数是否相等，使⽤效果如下：
 * a和b可能是原始类型，也可能是简单对象。不会有循环引⽤，不⽤⽐较原型链。
 */

const deepEqual = (a, b) => {
  // 排除掉 new Boolean(false), false 这种情况的比较
  if (typeof a !== typeof b) return false;

  // checkType(new Boolean(false)) 返回的是 boolean（[Object Boolean]） 所以值类型单独判断和返回
  const checkType = (target) => {
    return Object.prototype.toString.call(target).slice(8, -1).toLowerCase();
  };

  return (
    checkType(a) === checkType(b) && JSON.stringify(a) === JSON.stringify(b)
  );
};

function deepEqual2(a, b) {
  const isObject = (obj) => typeof obj == "object";
  if (a === b) return true;
  if (isObject(a) && a != null && isObject(b) && b != null) {
    // deepEqual([1,2], {0:1,1:2})
    if (Array.isArray(a) !== Array.isArray(b)) return false;

    // deepEqual([1,2], [1,2,3])
    if (Object.keys(a).length !== Object.keys(b).length) return false;

    let result = Object.keys(a).every((key) => {
      return deepEqual(a[key], b[key]);
    });

    // deepEqual(Number(1), Number(2))
    if (
      a.valueOf &&
      !isObject(a.valueOf()) &&
      b.valueOf() &&
      !isObject(b.valueOf())
    ) {
      result = result && a.valueOf() === b.valueOf();
    }

    return result;
  }
  return false;
}

const res1 = deepEqual({ a: 1, b: 2 }, { a: 1, b: 2 }); // true
const res2 = deepEqual([1, 2], [1, 2]); // true
const res3 = deepEqual(Number(1), Number(1)); // true, 注意
const res4 = deepEqual([1, 2], [1, 2, 3]); // false
const res5 = deepEqual([1, 2], { 0: 1, 1: 2 }); // false
const res6 = deepEqual(new Boolean(false), false); // false 前者对象类型，后者布尔类型
const res7 = deepEqual(Boolean(false), false); // true 注意
console.log(res1, res2, res3, res4, res5, res6, res7);
