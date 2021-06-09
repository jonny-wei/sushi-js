/**
 * 实现字符串转模板字符串
 *
 * 实现 sprintf('a: ${a+b},b: ${b}', {a: 1,b: 2}); // a:3,b:2
 *
 * eval 中的代码执行时的作用域为当前作用域。它可以访问到函数中的局部变量。
 * new Function 中的代码执行时的作用域为全局作用域，不论它的在哪个地方调用的。所以它访问的是全局变量
 */

/**
 * 方法一
 * @param {*} template 
 * @param {*} obj 
 * @returns 
 */
const sprintf = (template, obj) => {
  const names = Object.keys(obj);
  const vals = Object.values(obj);
  const fn = new Function(...names, `return \`${template}\`;`);
  return fn(...vals);
};
console.log(sprintf("a:${a+b},b:${b}", { a: 1, b: 2 }));

/**
 * 方法二 推荐
 * @param {*} template 
 * @param {*} obj 
 * @returns 
 */
const sprintf2 = (template, obj) => {
  const fn = new Function("obj", `with(obj){return \`${template}\`;}`);
  return fn(obj);
};
console.log(sprintf2("a:${a+b},b:${b}", { a: 1, b: 2 }));
