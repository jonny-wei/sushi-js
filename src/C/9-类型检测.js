/**
 * 数据类型检测
 * 1. typeof：只能检测出一些基本类型数据和 function，null和除 function的其他引用类型数据都返回 'object'
 * typeof function fn() {} === 'function'
 * typeof null === 'object'
 *
 * 2. instanceof：基于原型链进行查询，如果查询结果在原型链中，就会返回true。
 * /a/ instanceof Object -> true
 * /a/ instanceof RegExp -> true
 *
 * 3. isNaN() 函数用于检查其参数是否是非数字值。
 *
 * 4. isArray()  检测数组
 *
 * 5. 使用特有的原型链上的方法都可以检测例如 push
 *
 * 6. 使用正则表达式 eg: /\d+/.test(val) 检测是否是 Number 类型
 *
 * 7. 通用的 Object.prototype.toString.call(val).slice(8, -1).toLowerCase()
 * 任何一个对象调用 Object 原生的 toString 方法都会返回 "[object type]"，其中 type 是对象的类型
 *
 * https://github.com/mqyqingfeng/Blog/issues/30
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
 * 判断是否是一个引用类型数据 - isObject
 * 布尔对象（Boolean）
 * 数字对象（Number）
 * 字符串对象（String）
 * 函数对象（Function）
 * 数组对象（Array）
 * 日期对象（Date）
 * 正则对象（RegExp）
 * 错误对象（Error）
 */

function isObject(val) {
  const type = typeof val;
  return val !== null && (type === "object" || type === "function");
}

/**
 * 可靠的数据类型检测 - checkType
 * 标本兼治
 * 调用 Object 原型上的 toString() 方法
 * Object.prototype.toString.call(val).slice(8, -1).toLowerCase()
 * 不推荐将这个函数用来检测可能会产生包装类型的基本数据类型上,
 * 因为 call 始终会将第一个参数进行装箱操作，导致基本类型和包装类型无法区分
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
 * Object.is 和 ===,== 的区别
 *
 * (1) 与== 运算不同。
 * 使用==时会发生隐式类型转化
 * == 运算符在判断相等前对两边的变量(如果它们不是
 * 同一类型) 进行强制转换 (这种行为的结果会将 "" == false 判断为 true),
 * 而 Object.is不会强制转换两边的值。
 * console.log(1 + true) // +是算术运算符,true被Number(true)->1,打印出2
 * console.log(1 + undefined) // 1 + Number(undefined) -> 1 + NaN, 打印NaN
 * console.log(1 + null) // 1 + Number(null) -> 1 + 0,打印出1
 * [] == ![] // true  [] -> 0; ![] -> false -> 0 -->  0 == 0 true
 *
 * (2) 与=== 运算也不相同。
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
 * +0 === -0  // true 但是1/+0 = +Infinity， 1/-0 = -Infinity, 是不一样的
 * NaN === NaN // false NaN === NaN 是 false,这是不对的
 */

// 实现 Object.is
// 方法1
const is = (x, y) => {
  if (x === y) {
    // +0和-0应该不相等
    return x !== 0 || y !== 0 || 1 / x === 1 / y;
  } else {
    // NaN和NAN是相等的
    return x !== x && y !== y;
  }
};

// 方法2（推荐）
Object.defineProperty(Object, "myIs", {
  writable: true,
  configurable: true,
  enumerable: false,
  value: (x, y) => {
    if (x === y) {
      // Object.is() 认为 +0 与 -0; +Infinity 与 -Infinity 是不相等的，而 === 认为相等
      return x !== 0 || y !== 0 || 1 / x === 1 / y;
    } else {
      // Object.is() 认为 NaN 与 NaN 是相等的，而 === 认为不等
      return x !== x && y !== y;
    }
  },
});
