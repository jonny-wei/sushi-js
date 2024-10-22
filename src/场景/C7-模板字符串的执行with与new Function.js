/**
 * 模板字符串的执行 sprintf
 *
 * 实现 sprintf('a: ${a+b},b: ${b}', {a: 1,b: 2}); // a:3,b:2
 *
 * eval 中的代码执行时的作用域为当前作用域。它可以访问到函数中的局部变量。
 * new Function 中的代码执行时的作用域为全局作用域，不论它的在哪个地方调用的。所以它访问的是全局变量
 * 
 * with的作用：改变标识符的查找优先级，优先从with指定对象的属性中查找
 * new Function的作用：使用字符串，在最外层词法作用域，创建一个函数。
 * 
 * 使用 Function 构造函数比 eval 更安全，因为 Function 构造函数不会访问外部作用域，从而减少了潜在的安全风险。然而，仍然要确保输入的数据是可信的，特别是在处理用户输入时。
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
  // 创建一个函数，该函数使用 with 语句将 obj 的属性暴露给模板字符串
  const fn = new Function("obj", `with(obj){return \`${template}\`;}`);
  return fn(obj);
};
console.log(sprintf2("a:${a+b},b:${b}", { a: 1, b: 2 }));
