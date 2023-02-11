/**
 * 求嵌套数组的最大深度
 *
 */
 const recursiveMax = (arr) => {
    let flag = false;
    let num = [];
    for (var i = 0; i < arr.length; i++) {
      let item = arr[i];
      if (item instanceof Array) {
        flag = true;
        num.push(recursiveMax(item));
      }
    }
    console.log('num', num)
    if (flag) {
      return Math.max.apply(null, num) + 1;
    } else {
      return 1;
    }
  };
  console.log(recursiveMax([55, [33, [1], [2, 3], [[3, 5], [8]], [], []]]));
  