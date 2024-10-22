/**
 * 将函数字符串转成函数，支持几种类型
 *   类型一：() => {} / val => {}
 *   类型二：setValue() {}
 *   类型三：function() {} / function setValue() {}
 */


/**
 * 方法一
 * 
 * new Function()
 */
const leadingFnRe = /^function/;
const leadingFnNameRe = /^\w+\s*\(/;

function transformStringToFunction(str) {
  if (typeof str !== "string") return str;

  let fn;
  if (leadingFnNameRe.test(str) && !leadingFnRe.test(str)) {
    str = `function ${str}`;
  }
  let fnBody = `
    return function() {
      const self = this;
      try {
        return (${str}).apply(self, arguments);
      } catch(e) {
        console.log('call function which parsed by lowcode failed: ', e);
        return e.message;
      }
    };
  `;
  try {
    fn = new Function(fnBody)();
  } catch (e) {
    console.error(str);
    console.error(e.message);
  }
  return fn;
}

/**
 * 简易版
 * @param {*} funcStr 
 * @returns 
 */
function stringToFunction(funcStr) {
  try {
    // 使用 Function 构造函数创建一个新的函数
    const func = new Function('return ' + funcStr)();
    return func;
  } catch (error) {
    console.error('无法将字符串转换为函数:', error);
    return null;
  }
}

/**
 * 简易版
 */
function stringToFunctionEval(funcStr) {
  try {
    // 使用 eval 执行函数字符串
    const func = eval('(' + funcStr + ')');
    return func;
  } catch (error) {
    console.error('无法将字符串转换为函数:', error);
    return null;
  }
}

// 示例函数字符串
const funcStr = 'function add(a, b) { return a + b; }';

// 将字符串转换为函数
const add = stringToFunctionEval(funcStr);

if (add) {
  console.log(add(2, 3)); // 输出: 5
}