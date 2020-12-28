/**
 * 类数组转数组
 * 类数组与数组的qubie
 * 类数组：有length属性 但不能使用数组方法
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
 * 方法3
 * Array.prototype.concat.apply()
 */
const transform4 = Array.prototype.concat.apply([],arrLike)
console.log("方法4->", transform4);