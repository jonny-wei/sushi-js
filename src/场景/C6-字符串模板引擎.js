/**
 * 字符串模板解析 render
 *
 */

/**
 * 方法一（推荐）
 * @param {*} template 
 * @param {*} data 
 * @returns 
 */
function render(template, data) {
  return template.replace(/\{\{(\w+)\}\}/g, (match, key) => {
    return data[key] !== undefined ? data[key] : match;
  });
}

/**
 * 方法二
 * @param {*} template 
 * @param {*} data 
 * @returns 
 */
const render = (template, data) => {
  const regex = /\{\{(.*?)\}\}/g;
  template = template.replace(regex, (match,key) =>{
    return data[key.trim()]
  })
  return template
}

// 测试
let template = "我是{{name}}，年龄{{age}}，性别{{sex}}";
let person = {
  name: "布兰",
  age: 12,
};
render(template, person); // 我是布兰，年龄12，性别undefined
