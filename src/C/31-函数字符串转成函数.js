const leadingFnRe = /^function/;
const leadingFnNameRe = /^\w+\s*\(/;
/**
 * 将函数字符串转成函数，支持几种类型
 *   类型一：() => {} / val => {}
 *   类型二：setValue() {}
 *   类型三：function() {} / function setValue() {}
 * @param str
 * @returns
 */
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
    // eslint-disable-next-line no-new-func
    fn = new Function(fnBody)();
  } catch (e) {
    console.error(str);
    console.error(e.message);
  }
  return fn;
}
