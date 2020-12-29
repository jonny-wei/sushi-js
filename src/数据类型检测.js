/**
 * 数据类型检测
 * typeof：只能检测出一些基本类型数据和function，null和除function的其他引用类型数据都返回 'object'
 * typeof function fn() {} = 'function'
 * instanceof：基于原型链进行查询，如果查询结果在原型链中，就会返回true。
 * /a/ instanceof Object -> true
 * /a/ instanceof RegExp -> true
 */
const arr = [
  null,
  undefined,
  1,
  NaN,
  "a",
  true,
  Symbol(1),
  { a: 1 },
  [1, 2, 3],
  function a() {},
  () => {},
  new Date(),
  /a/,
];
/**
 * 数据类型检测
 * 标本兼治
 * 调用Object原型上的toString()方法
 * Object.prototype.toString.call(val).slice(8, -1).toLowerCase()
 */
function checkType(arr) {
  const result = new Map();
  arr.forEach((val) => {
    result.set(
      val,
      Object.prototype.toString.call(val).slice(8, -1).toLowerCase()
    );
  });
  return result;
}
console.log("可靠的数据类型检查 ->", checkType(arr));
/**
 * Object.is和===,==的区别
 * 
 * (1)与== 运算不同。  
 * 使用==时会发生隐式类型转化
 * == 运算符在判断相等前对两边的变量(如果它们不是
 * 同一类型) 进行强制转换 (这种行为的结果会将 "" == false 判断为 true), 
 * 而 Object.is不会强制转换两边的值。
 * console.log(1 + true) // +是算术运算符,true被Number(true)->1,打印出2
 * console.log(1 + undefined) // 1 + Number(undefined) -> 1 + NaN, 打印NaN
 * console.log(1 + null) // 1 + Number(null) -> 1 + 0,打印出1
 * (2)与=== 运算也不相同。 
 * === 运算符 (也包括 == 运算符) 将数字 -0 和 +0 视为相等 ，而将Number.NaN 与NaN视为不相等.
 * Object.is([], []);           // false
 * var foo = { a: 1 };
 * var bar = { a: 1 };
 * Object.is(foo, foo);         // true
 * Object.is(foo, bar);         // false 
 * Object.is(null, null);       // true
 * // 特例
 * Object.is(0, -0);            // false
 * Object.is(0, +0);            // true
 * Object.is(-0, -0);           // true
 * Object.is(NaN, 0/0);         // true
 * 
 * Object.is解决的主要是这两个问题：
 * +0 === -0  // true
 * NaN === NaN // false
 */
const is = (x, y) => {
  if (x === y) {
    // +0和-0应该不相等
    return x !== 0 || y !== 0 || 1/x === 1/y;
  } else {
    return x !== x && y !== y;
  }
}