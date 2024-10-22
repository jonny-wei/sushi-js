/**
 * 重写 trim
 * 
 * 解题思路
 * 使用正则表达式替换字符串前后空格
 */

// MDN 兼容性写法
String.prototype.trim = function () {
  return this.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
};

// 方法二
String.prototype.trim = function () {
  return s.replace(/^\s+|\s+$/g, "");
};

// 方法三
String.prototype.trim = function () {
  return s.replace(/^\s*|\s*$/g, "");
};
