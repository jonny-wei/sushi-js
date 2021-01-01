/**
 * 浅拷贝与深拷贝
 *
 * 数组的浅拷贝：指复制引用的拷贝方法称之为浅拷贝。arr.slice(); arr.concat();
 * 对对象进行浅层次的复制，只复制一层对象的属性，并不包括对象里面的引用类型数据,
 * 当遇到有子对象的情况时，子对象就会互相影响 ，修改拷贝出来的子对象也会影响原有的子对象
 * 只拷贝对象和数组的引用，这样我们无论在新旧数组进行了修改，两者都会发生变化。
 *
 * 数组的深拷贝：指完全的拷贝一个对象，即使嵌套了对象，两者也相互分离，修改一个对象的属性，也不会影响另一个。
 *
 * 浅拷贝的实现原理：遍历对象，然后把获取属性和属性值并放到一个新对象中。
 * 深拷贝的实现原理：遍历对象，然后把获取属性和属性值并放到一个新对象中，但是在拷贝的时候需要判断属性值的类型是值类型还是引用类型，
 * 如果是引用类型需要递归调用深拷贝函数。
 * Object.assign(target, ...sources) 实现对象的浅拷贝，
 * JSON.parse( JSON.stringify(arr) ) 实现数组或对象的深拷贝，但无法拷贝函数。
 *
 * 继承属性和不可枚举属性是不能拷贝的
 *
 * 浅拷贝的几种方式
 * (1) 扩展运算符 cloneObj = {...obj}
 * (2) Object.assign()
 * (3) 数组：Array.prototype.slice.call(arr); Array.prototype.concat.call(arr);
 *
 * 深拷贝的方式
 * (1) JSON.parse(JSON.stringify()) 
 * 无法克隆函数，Symbol，RegExp，Date以及过滤了undefined。对于它不支持的数据都会直接忽略该属性。
 * (2) 深拷贝函数(用第二版)
 * (3) 浅拷贝+递归: 存在循环引用的问题,一些类型也无法拷贝
 */

/**
 * 第一版 深拷贝
 */
function deepClone1(target, hash = new WeakMap()) {
  if (typeof target !== "object" || target === null) {
    return target;
  }
  if (hash.has(target)) {
    // 哈希表中是否存在
    return hash.get(target);
  }
  const cloneTarget = Array.isArray(target) ? [] : {};
  hash.has(target, cloneTarget);
  // 针对Symbol属性
  const syskeys = Object.getOwnPropertySymbols(target);
  if (syskeys.length) {
    syskeys.forEach((syskey) => {
      if (typeof target[syskey] === "object" && target[syskey] !== null) {
        cloneTarget[syskey] = deepClone1(target[syskey]);
      } else {
        cloneTarget[syskey] = target[syskey];
      }
    });
  }
  for (const i in target) {
    if (Object.prototype.hasOwnProperty.call(target, i)) {
      if (typeof target[i] === "object" && target[i] !== null) {
        cloneTarget[i] = deepClone1(target[i], hash);
      } else {
        cloneTarget[i] = target[i];
      }
    }
  }
  return cloneTarget;
}

/**
 * 第二版 深拷贝
 * 强烈推荐
 */
function deepClone2(source, hash = new WeakMap()) {
  // 非引用类型或null 直接返回
  if (typeof source !== "object" || source === null) {
    return source;
  }
  if (hash.has(source)) {
    //如果缓存中已经有值则直接返回，解决循环调用的问题
    return hash.get(source);
  }
  // 开始做子类检测-> Function Array RegExp Date 都属于Object类型
  let target;
  if (source instanceof Array) {
    //判断数组的情况
    target = [];
  } else if (source instanceof Function) {
    //判断函数的情况
    target = function () {
      return source.apply(this, arguments);
    };
  } else if (source instanceof RegExp) {
    //判断正则表达式的情况
    target = source;
  } else if (source instanceof Date) {
    target = new Date(source);
  } else {
    //普通对象
    target = {};
  }
  // 将属性和拷贝后的值进行缓存
  hash.set(source, target);
  //开始做遍历递归调用
  for (let key in source) {
    if (source.hasOwnProperty(key)) { // 不拷贝原型链上的属性
      target[key] = deepClone2(source[key], hash);
    }
  }
  return target;
}

let obj = {
  a: [1, 2, 3],
  b: { bb: 123 },
  c: true,
  d: { dd: /a/ },
  e: { ee: null },
  f: { ff: undefined, fff: ["1", /a/, 3] },
  g: function () {},
  h: Symbol("h"),
};
let cloneObj1 = Object.assign({}, obj);
cloneObj1.b.bb = 111;
console.log("浅拷贝对象 ->", cloneObj1, obj);
// 结论：cloneObj1的改变影响了obj 属于浅拷贝

let cloneObj2 = JSON.parse(JSON.stringify(obj));
cloneObj2.b.bb = 222;
console.log("深拷贝 ->", cloneObj2, obj);
// 结论：cloneObj2的改变不影响obj 但是无法克隆函数，Symbol，RegExp，Date以及过滤了undefined。对于它不支持的数据都会直接忽略该属性。

let cloneObj3 = deepClone1(obj);
cloneObj3.b.bb = 333;
console.log("深拷贝 ->", cloneObj3, obj);
//结论：cloneObj3的改变不影响obj 但是不能克隆 正则类型

let cloneObj4 = deepClone2(obj);
cloneObj4.d.ee = false;
console.log("深拷贝 ->", cloneObj4, obj);