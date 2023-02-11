const isCycleObject = (obj, parent) => {
  let parentArr = parent || [obj];

  for (let key in obj) {
    let flag = false;

    if (typeof obj[key] === "object") {
      parentArr.forEach((pObj) => {
        if ((pObj === obj[key])) {
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

const isCycleObject2 = (obj, parent) => {
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

let obj = { a: { b: 1 }, c: 2 };

obj.a.b = obj.a;

console.log(isCycleObject(obj), obj);
