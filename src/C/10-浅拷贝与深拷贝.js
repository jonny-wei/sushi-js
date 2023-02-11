/**
 * 浅拷贝与深拷贝
 *
 * 浅拷贝
 * 指复制引用的拷贝方法称之为浅拷贝
 *
 * 深拷贝
 * 完全的拷贝一个对象，即使嵌套了对象，两者也相互分离，修改一个对象的属性，也不会影响另一个。
 *
 * 数组的浅拷贝：arr.slice(); arr.concat();
 * 如果数组元素是基本类型，就会拷贝一份，互不影响。
 * 而如果是对象或者数组，就会只拷贝对象和数组的引用，这样我们无论在新旧数组进行了修改，两者都会发生变化。
 *
 * 对对象进行浅层次的复制，只复制一层对象的属性，并不包括对象里面的引用类型数据,
 * 当遇到有子对象的情况时，子对象就会互相影响 ，修改拷贝出来的子对象也会影响原有的子对象
 * 只拷贝对象和数组的引用，这样我们无论在新旧数组进行了修改，两者都会发生变化。
 *
 *
 * 浅拷贝的实现原理：遍历对象，然后把获取属性和属性值并放到一个新对象中。
 * 深拷贝的实现原理：遍历对象，然后把获取属性和属性值并放到一个新对象中，但是在拷贝的时候需要判断属性值的类型是值类型还是引用类型，
 * 如果是引用类型需要递归调用深拷贝函数。
 *
 * 继承属性和不可枚举属性是不能拷贝的
 *
 * 浅拷贝的几种方式
 * (1) 扩展运算符 cloneObj = {...obj}
 * (2) Object.assign()
 * (3) 数组：Array.prototype.slice.call(arr); Array.prototype.concat.call(arr);
 *
 * 深拷贝的方式
 * (1) JSON.parse(JSON.stringify())序列化反序列化法, 对基本数据类型、对象和数组有效，无法拷贝函数。
 * 无法克隆function，Symbol，RegExp，Date以及过滤了undefined。对于它不支持的数据都会直接忽略该属性。
 * (2) 深拷贝函数(用第二版)
 * (3) 浅拷贝+递归: 存在循环引用的问题,一些类型也无法拷贝
 *
 * 循环引用的情况，即对象的属性间接或直接的引用了自身的情况
 *
 * 解决循环引用问题，我们可以额外开辟一个存储空间，来存储当前对象和拷贝对象的对应关系，
 * 当需要拷贝当前对象时，先去存储空间中找，有没有拷贝过这个对象，如果有的话直接返回，
 * 如果没有的话继续拷贝，这样就巧妙化解的循环引用的问题。
 * 这个存储空间，需要可以存储key-value形式的数据，且key可以是一个引用类型，我们可以选择Map或WeakMap这种数据结构：
 *
 * 弱引用与强引用相对，是指不能确保其引用的对象不会被垃圾回收器回收的引用。
 * 一个对象若只被弱引用所引用，则被认为是不可访问（或弱可访问）的，并因此可能在任何时刻被回收。
 *
 * 我们默认创建一个对象：const obj = {}，就默认创建了一个强引用的对象，
 * 我们只有手动将obj = null，它才会被垃圾回收机制进行回收，
 * 如果是弱引用对象，垃圾回收机制会自动帮我们回收。
 *
 * 如果我们要拷贝的对象非常庞大时，使用Map会对内存造成非常大的额外消耗，
 * 而且我们需要手动清除Map的属性才能释放这块内存，而WeakMap会帮我们巧妙化解这个问题。
 *
 * https://juejin.cn/post/6844903929705136141
 * https://github.com/mqyqingfeng/Blog/issues/32
 */

/**
 * 浅拷贝
 *
 */
let shallowCopy = function (obj) {
  // 只拷贝对象
  if (typeof obj !== "object") return;
  // 根据obj的类型判断是新建一个数组还是对象
  var newObj = obj instanceof Array ? [] : {};
  // 遍历obj，并且判断是obj的属性才拷贝
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) {
      newObj[key] = obj[key];
    }
  }
  return newObj;
};

/**
 * 浅拷贝
 * Object.assign()的实现
 */
const isComplexDataType = (obj) =>
  (typeof obj === "object" || typeof obj === "function") && obj !== null;

const seltAssign = function (target, ...source) {
  if (target == null) {
    throw new TypeError("connot convert undefined or null to object");
  }
  return source.reduce((acc, cur) => {
    isComplexDataType(acc) || (acc = new Object(acc));
    if (cur === null) return acc;
    [...Object.key(cur), ...Object.getOwnPropertySymbols(cur)].forEach(
      (key) => {
        acc[key] = cur[key];
      }
    );
    return acc;
  }, target);
};

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
 * 第二版 深拷贝（推荐）
 */
function deepClone2(source, hash = new WeakMap()) {
  // 非引用类型或null 直接返回
  if (typeof source !== "object" || source === null) {
    return source;
  }
  if (hash.has(source)) {
    //如果缓存中已经有值则直接返回，解决循环调用的问题
    // 如果被拷贝的对象存在循环引用，如果不hash.has不判断 那么就会造成栈溢出
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
    target = source; // new RegExp(source)
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
    // for...in 和 hasOwnProperty判断，确保只拿到本身的属性、方法（不包含继承的）
    if (source.hasOwnProperty(key)) {
      // 防止拷贝原型链上的属性
      target[key] = deepClone2(source[key], hash);
    } else {
      target[key] = source[key];
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
  i: { ii: new Date() },
};
let cloneObj1 = Object.assign({}, obj);
cloneObj1.b.bb = 111;
console.log("浅拷贝对象 ->", cloneObj1, obj);
// 结论：cloneObj1的改变影响了obj 属于浅拷贝

let cloneObj2 = JSON.parse(JSON.stringify(obj));
cloneObj2.b.bb = 222;
console.log("深拷贝 ->", cloneObj2, obj);
// 结论：cloneObj2的改变不影响obj 但是无法克隆函数，Symbol，RegExp，Date以及过滤了undefined。对于它不支持的数据都会直接忽略该属性。

obj.b.bb = obj.b; // 循环引用了 如果不hash.has不判断 那么就会造成栈溢出
let cloneObj3 = deepClone1(obj);
cloneObj3.b.bb = 333;
console.log("深拷贝 ->", cloneObj3, obj);
console.log("深拷贝 ->", cloneObj3, obj);
//结论：cloneObj3的改变不影响obj 但是不能克隆 正则类型

let cloneObj4 = deepClone2(obj);
cloneObj4.i.ii = false;
console.log("深拷贝 ->", cloneObj4, obj);

/**
 * 第三版 深拷贝（强烈推荐）
 */

// 可继续遍历的数据类型
const mapTag = "[object Map]";
const setTag = "[object Set]";
const arrayTag = "[object Array]";
const objectTag = "[object Object]";
const argsTag = "[object Arguments]";
// 不可继续遍历的数据类型
const boolTag = "[object Boolean]";
const dateTag = "[object Date]";
const numberTag = "[object Number]";
const stringTag = "[object String]";
const symbolTag = "[object Symbol]";
const errorTag = "[object Error]";
const regexpTag = "[object RegExp]";
const funcTag = "[object Function]";

const deepTag = [mapTag, setTag, arrayTag, objectTag, argsTag];

// 通用循环 while 相比 for > forEach > for...in 速度快
function forEach(array, iteratee) {
  let index = -1;
  const length = array.length;
  while (++index < length) {
    iteratee(array[index], index);
  }
  return array;
}

// 判断是否是引用类型数据
function isObject(target) {
  const type = typeof target;
  return target !== null && (type === "object" || type === "function");
}
// 获取数据类型
function getType(target) {
  return Object.prototype.toString.call(target);
}
// 初始化被克隆对象
function getInit(target) {
  const Ctor = target.constructor;
  return new Ctor();
}
// 克隆 Symbol
function cloneSymbol(targe) {
  return Object(Symbol.prototype.valueOf.call(targe));
}
// 克隆 正则
function cloneReg(targe) {
  const reFlags = /\w*$/;
  const result = new targe.constructor(targe.source, reFlags.exec(targe));
  result.lastIndex = targe.lastIndex;
  return result;
}
// 克隆 函数(普通函数与箭头函数判断区分)
function cloneFunction(func) {
  const bodyReg = /(?<={)(.|\n)+(?=})/m;
  const paramReg = /(?<=\().+(?=\)\s+{)/;
  const funcString = func.toString();
  if (func.prototype) {
    const param = paramReg.exec(funcString);
    const body = bodyReg.exec(funcString);
    if (body) {
      if (param) {
        const paramArr = param[0].split(",");
        return new Function(...paramArr, body[0]);
      } else {
        return new Function(body[0]);
      }
    } else {
      return null;
    }
  } else {
    return eval(funcString);
  }
}
// 克隆不可遍历类型
function cloneOtherType(targe, type) {
  const Ctor = targe.constructor;
  switch (type) {
    case boolTag:
    case numberTag:
    case stringTag:
    case errorTag:
    case dateTag:
      return new Ctor(targe);
    case regexpTag:
      return cloneReg(targe);
    case symbolTag:
      return cloneSymbol(targe);
    case funcTag:
      return cloneFunction(targe);
    default:
      return null;
  }
}

function clone(target, map = new WeakMap()) {
  // 克隆原始类型
  if (!isObject(target)) {
    return target;
  }

  // 初始化
  const type = getType(target);
  let cloneTarget;
  if (deepTag.includes(type)) {
    cloneTarget = getInit(target, type);
  } else {
    return cloneOtherType(target, type);
  }

  // 防止循环引用
  if (map.get(target)) {
    return map.get(target);
  }
  map.set(target, cloneTarget);

  // 克隆set
  if (type === setTag) {
    target.forEach((value) => {
      cloneTarget.add(clone(value, map));
    });
    return cloneTarget;
  }

  // 克隆map
  if (type === mapTag) {
    target.forEach((value, key) => {
      cloneTarget.set(key, clone(value, map));
    });
    return cloneTarget;
  }

  // 克隆对象和数组
  const keys = type === arrayTag ? undefined : Object.keys(target);
  forEach(keys || target, (value, key) => {
    if (keys) {
      key = value;
    }
    cloneTarget[key] = clone(target[key], map);
  });

  return cloneTarget;
}

module.exports = {
  clone,
};
