/**
 * 大数精度 与 大数运算
 *
 * BigInt 可以表示任意大的整数。可以使用 BigInt 计算整数的加减乘除，但浮点数无能为力
 * 它提供了一种方法来表示大于 Math.pow(2, 53) - 1) 的整数。
 * 它在某些方面类似于 Number ，但是也有几个关键的不同点：不能用于 Math 对象中的方法；
 * 不能和任何 Number 实例混合运算，两者必须转换成同一种类型。
 * 在两种类型来回转换时要小心，因为 BigInt 变量在转换成 Number 变量时可能会丢失精度。
 * 1. 因为 BigInt 都是有符号的， >>> （无符号右移）不能用于 BigInt
 * 2. BigInt 不支持单目 (+) 运算符
 * 3. BigInt 和 Number 不是严格相等的，但是宽松相等的。
 * 4. Number 和 BigInt 可以进行比较。
 *
 * 大数运算的核心就是：模拟，模拟我们日常用纸笔算数字的加减乘除流程，然后再根据计算机、编程语言等特性适当存储计算即可，
 * 不过，大数除法运算稍微特殊一点，和我们直接模拟的思维方式稍有不同。
 * 
 * 1. 后台传过来的就是浮点型，数字太大了，在传输到显示的过程中，哪怕不加任何运算，精度也会丢失;
 * 2. toFixed()方法造成的精度丢失;
 * 3. 浮点数加减法造成的精度丢失
 * 
 * 大数精度
 * 1. toFixed()方法造成的精度丢失;
 * 2. 浮点数加减法造成的精度丢失。0.1 + 0.2 !== 0.3
 * 数字一旦超过安全值，就开始变得不再精准，哪怕是简单的加法运算。
 * 产生这种问题的原因是js采用的是 IEEE 754 即IEEE二进制浮点数算术标准中的双精度浮点数
 * js的安全值范围是-(Math.pow(2, 53) - 1) ~ (Math.pow(2, 53) - 1)
 * ECMAScript 使用 64 位字节来储存一个浮点数
 * 
 * 1. toFixed() 精度丢失
 * (1.345).toFixed(2) // 1.34 -- 错误
 * 解决办法 重写 toFixed()
 *
 * 2. 浮点数加减
 * 我们经常会遇到这种问题，0.1 + 0.2 !== 0.3。这是因为js在运算的时候会先把数字转换为二进制，
 * 但是一些小数转为二进制是无限循环的，所以会造成结果的误差。小数转换二进制时的无限循环不可避免。
 * 所以将其转换为字符串，然后按小数点分割成两部分，每部分都一位一位算，最后再将两部分和小数点拼接起来，
 * 因为计算的时候都是18以内（为何是18？单位最大为9，9 + 9 = 18）的整数加减法，
 * 所以这样可以避免因为小数转二进制而造成的误差。
 * 
 * JS大数运算与精度
 * https://www.jianshu.com/p/c88a0faef373
 */

/**
 * 大数相加(只适用于正整数)
 * @param {*} a
 * @param {*} b
 * @returns
 */
const largeNumberAdd = function (a, b) {
  //取两个数字的最大长度
  let maxLength = Math.max(a.length, b.length);
  //用0去补齐长度
  a = a.padStart(maxLength, 0); //"0009007199254740991"
  b = b.padStart(maxLength, 0); //"1234567899999999999"
  //定义加法过程中需要用到的变量
  let t = 0;
  let f = 0; //"进位"
  let sum = "";
  for (let i = maxLength - 1; i >= 0; i--) {
    t = parseInt(a[i]) + parseInt(b[i]) + f;
    f = Math.floor(t / 10);
    sum = (t % 10) + sum;
  }
  if (f === 1) {
    sum = "1" + sum;
  }
  return sum;
};
// 方法二
const largeNumberAdd = function (num1, num2) {
  let lastIndex1 = num1.length - 1;
  let lastIndex2 = num2.length - 1;
  const num1Arr = num1.split('')
  const num2Arr = num2.split('');
  let remainder = 0 
  let result = []
  while(lastIndex1 >= 0 || lastIndex2 >= 0) {
    let n1 = lastIndex1 >= 0 ? (num1Arr[lastIndex1--] - 0) : 0;
    let n2 = lastIndex2 >= 0 ? (num2Arr[lastIndex2--] - 0) : 0;
    let num = n1 + n2 + remainder
    remainder = Math.floor(num / 10);
    result.unshift(num % 10);
  }

  if(remainder){
    result.unshift(remainder)
  }
 
  return result.join('')
};

largeNumberAdd("9007199254740991", "1234567899999999999");



