/**
 * 重写forEach
 *
 * forEach() 方法对数组的每个元素执行一次给定的函数。
 * forEach(callback(currentValue,index,array),thisArg)
 * 除了抛出异常以外，没有办法中止或跳出 forEach() 循环。
 * 返回值：undefined
 * 按升序为数组中含有效值的每一项执行一次 callback 函数，那些已删除或者未初始化的项将被跳过(稀疏数组)
 */
Array.prototype.forEach = function (callback, thisArg) {
  if (this == null) {
    throw new TypeError(" this is null or not defined");
  }
  if (typeof callback !== "function") {
    throw new TypeError(callback + " is not a function");
  }
  const obj = Object(this);
  const len = obj.length >>> 0;
  for (let index = 0; index < len; index++) {
    if (index in obj) {
      callback.call(thisArg, obj[index], index, obj);
    }
  }
};

// 回顾数组扁平化 forEach+isArray+push+递归
function flatten(arr) {
  const result = [];

  arr.forEach((i) => {
    if (Array.isArray(i)) result.push(...flatten(i));
    else result.push(i);
  });

  return result;
}

const problem = [1, ,[2, [3, [{ a: [4] }, 5, ['',null,undefined]]]], 6];
console.log("重写forEach ->", flatten(problem));
