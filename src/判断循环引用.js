/**
 * 判断循环引用对象
 *
 * 循环引用对象本来没有什么问题，序列化的时候才会发生问题，
 * 比如调用 JSON.stringify() 对该类对象进行序列化，
 * 就会报错: Converting circular structure to JSON.
 * 比如发起一个ajax请求提交一个对象就需要对对象进行序列化。
 * 可以通过JSON扩展包的 var c = JSON.decycle(a) 和 var a = JSON.retrocycle(c) 来处理
 */

const isCycleObject = (obj, parent) => {
  const parentArr = parent || [obj];
  // 遍历一层对象
  for (let key in obj) {
    // 判断是否是对象
    if (typeof obj[key] === "object") {
      let flag = false; // flag 初始化为 false 非循环引用对象
      /**
       * 遍历数组中每一项一层对象 判断是否与 obj[key] 相等
       * 相等，循环引用了 返回 true 结束循环
       * 否则 递归继续比较下一层
       * 需注意的是 parentArr = [...parentArr, obj[key]] 包含每一层的对象
       */
      parentArr.forEach((pObj) => {
        if (pObj === obj[key]) {
          flag = true;
        }
      });
      if (flag) return true;
      flag = isCycleObject(obj[key], [...parentArr, obj[key]]);
      if (flag) return true;
    }
  }
  return false;
};
const a = { b: { c: 1 } };
a.b.c = a;
console.log(isCycleObject(a));
