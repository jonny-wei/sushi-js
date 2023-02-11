// 对象循环引用

const isCycleObject = (object, parent) => {
  let parentArr = parent || [object]; // 数组记录引用地址

  for (let key in object) {
    // 遍历对象 并在 记录中找 是否有相同的引用地址
    if (typeof object[key] === "object") {
      let flag = false;

      parentArr.forEach((obj) => {
        if (object[key] === obj) {
          flag = true;
        }
      });

      if (flag) return true;
      // 内嵌
      flag = isCycleObject(object[key], [...parentArr, object[key]]);

      if (flag) return true;
    }
  }

  return false;
};

const a = { b: { c: 1 } };
a.b.c = a;
console.log(isCycleObject(a));
