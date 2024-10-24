/**
 * 实现千位分隔符
 */

/**
 * 方法一 
 * Intl.NumberFormat()
 * @param {*} number 
 * @param {*} separator 
 * @returns 
 */
function formatNumberWithCustomSeparator(number, separator) {
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2, // 设置保留的小数位数
    maximumFractionDigits: 2,
    useGrouping: true,
    numberingSystem: 'latn', // 使用拉丁数字系统
    currency: 'USD', // 货币符号（可选）
    style: 'decimal', // 数字风格（可选）
    currencyDisplay: 'symbol', // 货币显示方式（可选）
    minimumIntegerDigits: 1,
    integerSeparator: separator,
    groupSeparator: separator
  }).format(number);
}

console.log(formatNumberWithCustomSeparator(1234567890.11111, ','));// 输出: '1,234,567,890.11'

/**
 * 方法二 
 * 
 * 正则表达式
 * \B：一个单词边界，表示它前后的字符不是单词字符（即不是字母、数字或下划线）和单词字符之间的位置。在这里，它用于确保我们不在数字的开头或结尾匹配。
 * (?=...)：正向前瞻断言，表示匹配的字符后面必须跟随括号内的模式，但这部分不包括在最终的匹配结果中。
 * (\d{3})+：匹配三个数字（\d{3}），并且由于有 + 号，所以匹配的是三个或三个以上的数字序列。这意味着它会匹配如 123、1234、12345 等。
 * (?!\d)：负向前瞻断言，表示匹配的字符后面不能紧跟一个数字。这是为了确保我们不在数字序列的中间匹配，而是在数字序列的末尾匹配。
 * 
 */
function formatNumber(str) {
  return str.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

// 测试
console.log(formatNumber("1234.56")); // 输出: '1,234.56'
console.log(formatNumber("123456789")); // 输出: '123,456,789'
console.log(formatNumber("1087654.321")); // 输出: '1,087,654.321'

/**
 * 方法三
 * 
 * 简易版
 * @param {*} n 
 * @returns 
 */
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

/**
 * 方法四
 *
 * @param {*} n 
 * @returns 
 */
var thousandSeparator = function (n) {
  // 检查数字是否为负数，并保留符号
  let isNegative = n < 0;
  // 将数字转换为字符串，并分离整数和小数部分
  let str = isNegative ? n.toString().substring(1) : n.toString();
  let parts = str.split('.');
  let integerPart = parts[0];
  let decimalPart = parts.length > 1 ? '.' + parts[1] : '';
  
  // 如果整数部分小于1000，直接返回原数字（考虑负数和小数情况）
  if (integerPart.length <= 3) {
    return isNegative ? '-' + integerPart + decimalPart : integerPart + decimalPart;
  }
  
  // 使用数组存储整数部分的字符串，方便插入分隔符
  let arr = integerPart.split('');
  let length = arr.length;
  // 从整数部分的末尾开始，每三个字符添加一个分隔符
  for (let i = length - 3; i > 0; i -= 3) {
    arr.splice(i, 0, ',');
  }
  // 将数组重新组合成字符串，并添加回负号和小数部分（如果需要）
  return isNegative ? '-' + arr.join('') + decimalPart : arr.join('') + decimalPart;
};

// 使用示例
console.log(thousandSeparator(123456789.22)); // 输出: "123.456.789"
console.log(thousandSeparator(-123456789.22)); // 输出: "-123.456.789"
console.log(thousandSeparator(123)); // 输出: "123"
console.log(thousandSeparator("1087654.321")); // 1,087,654.321
