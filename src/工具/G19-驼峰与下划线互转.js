/**
 * 驼峰与下划线互转
 *
 */

/**
 * 下划线转驼峰
 * @param {*} str 
 * @returns 
 */
function underscoreToCamelCase(str) {
  return str.replace(/_([a-z])/g, (match, letter) => letter.toUpperCase());
}

let a = "a_b2_345_c2345";
console.log(underscoreToCamelCase(a));

/**
 * 驼峰转下划线
 * @param {*} str 
 * @returns 
 */
function camelCaseToUnderscore(str) {
  return str.replace(/([A-Z])/g, "_$1").toLowerCase();
}
let b = "aBdaNf";
console.log(camelCaseToUnderscore(b));

/**
 * 连接符转驼峰
 * @param {*} string 
 * @returns 
 */
function kebabToCamelCase(string){
  return string.replace(/\-(\w)/g, (all,letter)=>{
    return letter.toUpperCase();
  })
}


/**
 * 连接符命名（如使用连字符 -、下划线 _ 或其他非字母数字字符）转换为驼峰命名
 * @param {*} str 
 * @returns 
 */
function toCamelCase(str) {
  return str
    .replace(/([-_][a-z])/ig, (group) => group.toUpperCase().replace(/[-_]/, ''))
    .replace(/^([A-Z])/, (match) => match.toLowerCase());
}

// 示例使用
const kebabStr = "my-function-name";
const camelCaseKebab = toCamelCase(kebabStr);
console.log(camelCaseKebab); // 输出 "myFunctionName"

const snakeStr = "my_function_name";
const camelCaseSnake = toCamelCase(snakeStr);
console.log(camelCaseSnake); // 输出 "myFunctionName"

