/**
 * 大数精度 与 大数运算 -- 字符串加法、乘法
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
 * 所以这样可以避免因为小数转二进制而造成的误差。双精度浮点数的小数部分最多支持 52 位，
 * 所以两者相加之后得到这么一串0.0100110011001100110011001100110011001100…因浮点数小数位的限制而截断的二进制数字，
 * 这时候，再把它转换为十进制，就成了0.30000000000000004。对于保证浮点数计算的正确性，有两种常见方式：
 * 1. 先升幂再降幂
 * 2. 大数相加
 *
 * JS大数运算与精度
 * https://www.jianshu.com/p/c88a0faef373
 * https://juejin.cn/post/6946404150422798372#heading-2
 */

/**
 * 重写 toFixed
 * @param {*} f
 * @returns
 */
Number.prototype.toFixed = function (f) {
  let params = Number(f);
  const num = this;
  if (isNaN(num)) return `${num}`; // 处理NaN返回
  if (isNaN(params)) params = 0; // 处理参数NaN情况
  if (params > 100 || params < 0)
    throw new RangeError("toFixed() digits argument must be between 0 and 100"); // 处理参数大小问题
  let temp = num * Math.pow(10, params); //  这里是为了使得需要保留的放在整数位，需要舍去的放在小数位
  const tempInteger = temp.toString().split(".")[0]; // temp的整数位
  const judgeInteger = (temp + 0.5).toString().split(".")[0]; // temp + 0.5的整数位
  const tempArr = tempInteger.split("");
  tempArr.splice(tempArr.length - f, 0, ".");
  const judgeArr = judgeInteger.split("");
  judgeArr.splice(judgeArr.length - f, 0, ".");
  // 判断temp + 0.5之后是否大于temp，大于则说明尾数需要进位，相等则代表不需要
  return judgeInteger > tempInteger
    ? `${judgeArr.join("")}`
    : `${tempArr.join("")}`;
};

/**
 * 浮点数相加(先升幂再降幂)
 * @param {*} num1
 * @param {*} num2
 * @returns
 */
const floatNumberAdd = function (num1, num2) {
  let d1 = num1.toString().split(".")[1].length;
  let d2 = num2.toString().split(".")[1].length;
  let m = Math.pow(10, Math.max(d1, d2));
  return (num1 * m + num2 * m) / m;
};

/**
 * 浮点数相加(大数相加)
 * @param {*} num1
 * @param {*} num2
 * @returns
 */
const floatNumberAdd = function (num1, num2) {
  let d1 = num1.toString().split(".");
  let d2 = num2.toString().split(".");
  let len1 = d1[1].length;
  let len2 = d2[1].length;
  let len3 = d1[0].length;
  let len4 = d2[0].length;
  let maxLength1 = Math.max(len1, len2);
  let maxLength2 = Math.max(len3, len4);
  let n1 = d1[1].padEnd(maxLength1, 0);
  let n2 = d2[1].padEnd(maxLength1, 0);
  let n3 = d1[0].padStart(maxLength2, 0);
  let n4 = d2[0].padStart(maxLength2, 0);
  num1 = n3 + n1;
  num2 = n4 + n2;
  let remainder = 0;
  let result = [];
  for (let i = maxLength1 + maxLength2 - 1; i >= 0; i--) {
    // parseInt 将字符串转数字
    let num = parseInt(num1[i]) + parseInt(num2[i]) + remainder;
    // Math.floor() 向下取整 Math.ceil()向上取整 计算进位
    remainder = Math.floor(num / 10);
    // 将 余数 从队头压入
    result.unshift(num % 10);
  }
  if (remainder) {
    result.unshift(remainder);
  }
  let s = result.join("");
  return s.slice(0, s.length - maxLength1) + "." + s.slice(-maxLength1);
};

/**
 * 大数相加(只适用于正整数)
 * @param {*} a
 * @param {*} b
 * @returns
 */
const largeNumberAdd = function (num1, num2) {
  if (isNaN(num1) || isNaN(num2)) return "";
  if (num1 === "0" || num2 === "0") {
    return num1 === "0" ? num2 : num1;
  }
  //取两个数字的最大长度
  let maxLength = Math.max(num1.length, num2.length);
  //用0去补齐长度
  num1 = num1.padStart(maxLength, 0); //"0009007199254740991"
  num2 = num2.padStart(maxLength, 0); //"1234567899999999999"
  //定义加法过程中需要用到的变量
  let t = 0;
  let f = 0; //"进位"
  let sum = "";
  for (let i = maxLength - 1; i >= 0; i--) {
    t = parseInt(num1[i]) + parseInt(num2[i]) + f;
    f = Math.floor(t / 10);
    sum = (t % 10) + sum;
  }
  if (f === 1) {
    sum = "1" + sum;
  }
  return sum;
};
/**
 * 方法二 易理解(只适用于正整数)
 * @param {*} num1
 * @param {*} num2
 * @returns
 * 对于加法，我们需要将两个数 num1 和 num2 上下对齐，然后从个位开始计算两个数对应位的和，循环到最高位，
 * 将每一次运算的结果保存到一个数组 result 中去，最终用 Array.prototype.join() 方法还原成一个数组。
 */
const largeNumberAdd = function (num1, num2) {
  let lastIndex1 = num1.length - 1;
  let lastIndex2 = num2.length - 1;
  const num1Arr = num1.split("");
  const num2Arr = num2.split("");
  let remainder = 0;
  let result = [];
  while (lastIndex1 >= 0 || lastIndex2 >= 0) {
    let n1 = lastIndex1 >= 0 ? num1Arr[lastIndex1--] - 0 : 0;
    let n2 = lastIndex2 >= 0 ? num2Arr[lastIndex2--] - 0 : 0;
    let num = n1 + n2 + remainder;
    remainder = Math.floor(num / 10);
    result.unshift(num % 10);
  }

  if (remainder) {
    result.unshift(remainder);
  }

  return result.join("");
};

largeNumberAdd("9007199254740991", "1234567899999999999");

/**
 * 正负整数与浮点数大数加减运算
 * @param {String} a
 * @param {String} b
 * @param {String} mthood 运算方式
 */
const addLargeNumber = (a = "", b = "", methood = "+") => {
  // 传小数进行计算在toString的时候就会丢失精度，太大的时候一拿到就已经没有精度了。。
  if (Number.isNaN(Number(a)) || Number.isNaN(Number(b))) return a + b;
  if (methood === "-") {
    b = b.includes("-") ? b.split("-")[1] : `-${b}`;
  }
  let calMethood = true; // 运算方式,true为加法运算,false为减法运算
  let allAegative = false; // 是否需要加负号
  let subtracted = a; // 被减数,默认为a
  let minus = b; // 减数,默认为b

  if (a.includes("-") && b.includes("-")) {
    // 全是负数时，计算方法同全正数计算，只需要在最后的结果将负号加上即可，所以在此处将负号删去
    allAegative = true;
    calMethood = true;
    subtracted = a.split("-")[1];
    minus = b.split("-")[1];
  } else if (a.includes("-") || b.includes("-")) {
    // a为负数或b为负数时,执行减法运算,绝对值小的为减数
    // 减法运算总是大的减小的
    calMethood = false;
    let tempX = a.split("-")[0] ? a.split("-")[0] : a.split("-")[1];
    let tempY = b.split("-")[0] ? b.split("-")[0] : b.split("-")[1];
    console.log(+tempX, +tempY, +tempX > +tempY);
    if (+tempX > +tempY) {
      subtracted = tempX;
      minus = tempY;
      allAegative = a.includes("-");
    } else {
      // 默认为x - y，如果改为y - x需要给结果添加负号
      subtracted = tempY;
      minus = tempX;
      allAegative = b.includes("-");
    }
  }
  let integerA = subtracted.split(".")[0].split("").reverse(); // 被减数的整数部分的反转数组，方便遍历时从个位开始计算
  let decimalA = []; // 被减数的小数部分的反转数组
  let integerB = minus.split(".")[0].split("").reverse(); // 减数的整数部分的反转数组
  let decimalB = []; // 减数的小数部分的反转数组

  let flag = 0; // 进位标志，当当前位计算大于9时，需要进位，加法进位只可能为0或1
  let sum = ""; // 和

  if (a.includes(".")) {
    // 是小数再去计算小数部分的数组
    decimalA = subtracted.split(".")[1].split("");
  }
  if (b.includes(".")) {
    decimalB = minus.split(".")[1].split("");
  }

  // 根据小数的特殊性，需要根据两个数字的最长长度去给另一个填充0
  for (let i = 0; i < Math.max(decimalA.length, decimalB.length); i++) {
    decimalA[i] = +decimalA[i] || 0;
    decimalB[i] = +decimalB[i] || 0;
  }
  decimalA = decimalA.reverse();
  decimalB = decimalB.reverse();
  const decimalAns = arrSum(decimalA, decimalB, sum, flag);
  sum = decimalAns.sum.replace(/0*$/, ""); // 去除小数部分末尾的0
  flag = decimalAns.flag;
  // 小数部分计算不为空,则添加小数点
  if (sum !== "") sum = `.${sum}`;
  const integerAns = arrSum(integerA, integerB, sum, flag);
  sum = integerAns.sum;
  flag = integerAns.flag;
  if (flag !== 0) {
    sum = `${flag}${sum}`;
  }
  sum = sum.replace(/^0*/, "") || "0"; // 去除最左侧的0，同时避免因结果是0而产生空串
  /**
   *
   * @param {Array} arr1 被减数转换的数组
   * @param {Array} arr2 减数转换的数组
   * @param {String} sum 和
   * @param {Number} flag 进位标志
   */
  function arrSum(arr1, arr2, sum, flag) {
    for (let i = 0; i < Math.max(arr1.length, arr2.length); i++) {
      if (calMethood) {
        // 加法
        const temp = (+arr1[i] || 0) + (+arr2[i] || 0) + flag;
        if (temp < 10) {
          sum = `${temp}${sum}`;
          flag = 0;
        } else {
          sum = `${temp - 10}${sum}`;
          flag = 1;
        }
      } else {
        // 减法
        let temp = (+arr1[i] || 0) - (+arr2[i] || 0) + flag;
        if ((arr1[i] || 0) < (arr2[i] || 0)) {
          // 被减数太小,需要借位
          temp += 10;
          flag = -1;
        } else {
          flag = 0;
        }
        sum = `${temp}${sum}`;
      }
    }
    return {
      sum,
      flag,
    };
  }
  return allAegative ? `-${sum}` : sum;
};

/**
 * 大数相乘(字符串乘法)(只适用于正整数)
 *
 * 如果 num1 和 num2 都不是 0，则可以通过模拟「竖式乘法」的方法计算乘积。
 * 从右往左遍历乘数，将乘数的每一位与被乘数相乘得到对应的结果，再将每次得到的结果累加。
 * 
 * 1. 0乘以任何数 = 0
 * 2. 两数相乘，乘积的长度一定 <= 两数长度之和
 * 3. 被乘数的一位 与 乘数的每一位相乘，乘积不会超过 9 x 9 = 81，不超过两位
 * 4. 每次只考虑两位，乘积 与 个位 相加
 *    个位保留余数
 *    十位保留取整，取整直接舍弃小数点，用0 |效率，高于parseInt
 * 5. while循环，删除多余的0（因为shift可以改变原数组）
 * 
 * 数组存储每一位结果(pos[i+j]存储乘积的个位数，pos[i+j+1]存储乘积的十位数也就是进位数)
 */
const multiply = (num1, num2) => {
  if (isNaN(num1) || isNaN(num2)) return "";
  if (num1 === "0" || num2 === "0") {
    return  "0" ;
  }
  const len1 = num1.length;
  const len2 = num2.length;
  const pos = new Array(len1 + len2).fill(0);

  for (let i = len1 - 1; i >= 0; i--) {
    const n1 = +num1[i]; // 可以写成 parseInt(num1[i])
    for (let j = len2 - 1; j >= 0; j--) {
      const n2 = +num2[j];
      const multi = n1 * n2;
      const sum = pos[i + j + 1] + multi;
      pos[i + j + 1] = sum % 10;
      pos[i + j] += (sum / 10) | 0; // res[i + j] = Math.floor(sum / 10);
    }
  }
  while (pos[0] === 0) {
    pos.shift();
  }
  return pos.length ? pos.join("") : "0";
};
