//  数组扁平化

const arr = [1, , [2, [3, [{ a: [4] }, 5, ["", null, undefined]]]], 6];

const res1 = arr.flat(Infinity);
console.log("数组flat1", res1);

const flatArray = (arr, depth = 1) => {
  return depth > 0
    ? arr.reduce(
        (acc, cur) =>
          acc.concat(Array.isArray(cur) ? flatArray(cur, depth - 1) : cur),
        []
      )
    : arr;
};

const flatArray2 = (arr, depth = 1) => {
  let result = [];
  for (let item of arr) {
    if (Array.isArray(item) && depth > 0) {
      result.push(...flatArray(item, depth - 1));
    } else {
      result.push(item);
    }
  }
  return result;
};
