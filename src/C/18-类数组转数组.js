/**
 * 类数组转数组
 * 类数组与数组的区别
 * 类数组：用于一个 length 属性和若干索引属性的对象。
 * 类数组对象可以进行读写，获取长度，遍历3个方面，但不能使用数组的方法。如果非要使用数组的方法可以通过 call() 函数
 * (a) Array.prototype.slice.call(arrayLike);
 * (b) Array.prototype.splice.call(arrayLike, 0); 
 * (c) Array.from(arrayLike);
 * (d) Array.prototype.concat.apply([], arrayLike)
 * (e) ES6的 ... 运算符
 * 
 * 转换后的数组长度由 length 属性决定。索引不连续时转换结果是连续的，会自动补位。
 */

 const arrLike = document.querySelectorAll('div')

/**
 * 方法1
 * Array.from()
 */
const transform1 = Array.from(arrLike)
console.log("方法1 ->", transform1);

/**
 * 方法2
 * 解构
 */
const transform2 = [...arrLike]
console.log("方法2 ->", transform2);

/**
 * 方法3
 * Array.prototype.slice.call()
 */
const transform3 = Array.prototype.slice.call(arrLike)
console.log("方法3 ->", transform3);

/**
 * 方法4
 * Array.prototype.concat.apply()
 */
const transform4 = Array.prototype.concat.apply([],arrLike)
console.log("方法4->", transform4);

/**
 * 方法5
 * Array.prototype.splice.call()
 */
const transform5 = Array.prototype.splice.call(arrLike,0)
console.log("方法5->", transform5);