/**
 * 重写 fill
 * 数组填充
 * fill(value,start,end): [] 返回修改后的数组，不改变数组长度，但盖改变了原数组里的值
 * start < 0 : start 是个负数, 则开始索引会被自动计算成为 length+start
 * end < 0: end 是个负数, 则结束索引会被自动计算成为 length+end。
 * start > arr.length: start = arr.length
 * end > arr.length: end = arr.length
 * start end 相等但不等于0 返回原数组
 * start === end === 0 填充所有元素
 * 该方法不要求 this 是数组对象
 * [].fill.call({ length: 3 }, 4);  // {0: 4, 1: 4, 2: 4, length: 3}
 */

Object.defineProperty(Array.prototype, "fill", {
  value: function (value) {
    if (this == null) {
      throw new TypeError("this is null or not defined");
    }
    const obj = Object(this);
    const len = obj.length >>> 0;
    // start 参数处理
    const start = arguments[1];
    const relativeStart = start >> 0; // 转化为 number 类型
    let k =
      relativeStart < 0
        ? Math.max(len + relativeStart, 0)
        : Math.min(relativeStart, len);
    // end 参数处理
    const end = arguments[2];
    const relativeEnd = end === undefined ? len : end >> 0;
    let final =
      relativeEnd < 0
        ? Math.max(len + relativeEnd, 0)
        : Math.min(relativeEnd, len);

    while (k < final) {
      obj[k] = value;
      k++;
    }
    return obj;
  },
});

const arr = [1, 2, 3];
console.log("重写fill ->", arr.slice().fill(4)); // [4,4,4]
console.log("重写fill ->", arr.slice().fill(4, 4, 4)); // [1,2,3]
console.log("重写fill ->", arr.slice().fill(4, -3, -2)); // [4,1,2]
console.log("重写fill ->", [].fill.call({ length: 4 }, 4)); // 填充一个长度为 4 的数组