// reduce
// reduce(callback(acc, cur, index, array), initialValue) : array;

Array.prototype.myreduce = function (callback, initialValue) {
  if (this == undefined) {
    throw new TypeError("this is null or not undefined");
  }
  if (typeof callback !== "function") {
    throw new TypeError(callback + "is not a function");
  }
  const obj = Object(this); //数组
  const len = obj.length >>> 0; // 数组长度

  

  let k = 0;
  let accumulator = initialValue;

  if (arguments.length >= 2) {
    accumulator = arguments[1]; // 如果提供了initialValue, accumulator取值为initialValue
  } else {
    while (k < len && !(k in obj)) {
      k++;
    }

    console.log('k', k)

    // 如果是一个空数组且没提供初始值initialValue 抛出异常
    if (k >= len) {
      throw new TypeError("Reduce of empty array " + "with no initial value");
    }

    accumulator = obj[k++]; // 如果没提供initialValue 那么accumulator取数组中的第一个值
  }

  while (k < len) {
    accumulator = callback(accumulator, obj[k], k, obj);
    k++;
  }
  return accumulator;

//   console.log(obj, len);
};

console.log([1, 2, 3, 4].myreduce((a, b) => a + b))
