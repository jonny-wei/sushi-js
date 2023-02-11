/**
 * 实现千位分隔符
 */

// 方法一
function parseToMoney(num) {
  num = parseFloat(num.toFixed(3));
  let [integer, decimal] = String.prototype.split.call(num, ".");
  integer = integer.replace(/\d(?=(\d{3})+$)/g, "$&,");
  return integer + "." + (decimal ? decimal : "");
}

/**
 * 方法二 正则表达式
 * (运用了正则的前向声明和反前向声明)
 *
 */
function parseToMoney(str) {
  // 仅仅对位置进行匹配
  let re = /(?=(?!\b)(\d{3})+$)/g;
  return str.replace(re, ",");
}

// 测试
// 保留三位小数
parseToMoney(1234.56); // return '1,234.56'
parseToMoney(123456789); // return '123,456,789'
parseToMoney(1087654.321); // return '1,087,654.321'

// 方法三
var thousandSeparator = function (n) {
  if (n < 1000) {
    return `${n}`;
  }
  n = n.toString().split("");
  for (let i = n.length - 3; i > 0; i = i - 3) {
    n.splice(i, 0, ".");
  }
  return n.join("");
};

// 方法四
const thousandSeparator = (n) => {
  let num = n.toString();
  let len = num.length;
  if (len <= 3) {
    return num;
  } else {
    let temp = "";
    let remainder = len % 3;
    if (remainder > 0) {
      // 不是3的整数倍
      return (
        num.slice(0, remainder) +
        "," +
        num.slice(remainder, len).match(/\d{3}/g).join(",") +
        temp
      );
    } else {
      // 3的整数倍
      return num.slice(0, len).match(/\d{3}/g).join(",") + temp;
    }
  }
};
