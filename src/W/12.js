// 循环引用

const isCycleObject = (object, parent) => {
  let parentArr = parent || [object];

  for (const key in object) {
    if (typeof object[key] === "object") {
      let flag = false;

      parentArr.forEach((obj) => {
        if (object[key] === obj) {
          flag = true;
        }
      });

      if (flag) return true;
      flag = isCycleObject(object[key], [...parentArr, object[key]]);
      if (flag) return true;
    }
  }
  
  return false;
};

const a = { b: { c: 1 } };
a.b.c = {};
console.log(isCycleObject(a));
