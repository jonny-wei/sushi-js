/**
 * 实现16进制颜色10进制颜色
 * 
 * #fff => rgb(255,255,255)
 */

function colorToRgb(color) {
  const reg = /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/;
  const colorLower = color.toLowerCase();
  if (reg.test(colorLower)) {
    let newColor = colorLower;
    // 扩展三位十六进制颜色值
    if (newColor.length === 4) {
      newColor = `#${newColor.slice(1).split('').map(char => char.repeat(2)).join('')}`;
    }
    // 转换为RGB格式
    const rgbValues = newColor.slice(1).match(/.{2}/g).map(hex => parseInt(hex, 16));
    return `rgb(${rgbValues.join(',')})`;
  } else {
    return color;
  }
};

console.log(colorToRgb("#fffff0")); // 输出: rgb(255,255,240)
console.log(colorToRgb("#fff")); // 应该输出 rgb(255,255,255)
console.log(colorToRgb("#000")); // 应该输出 rgb(0,0,0)
console.log(colorToRgb("#123")); // 应该输出 rgb(17,34,51)
console.log(colorToRgb("#abcdef")); // 应该输出 rgb(171,205,239)
console.log(colorToRgb("#FFF")); // 应该输出 rgb(255,255,255)，不区分大小写


function colorToRgb(color) {
  let reg = /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/;
  color = color.toLowerCase();
  if (reg.test(color)) {
    // 如果只有3位颜色值，需先变为6位再处理 eg：#fef -> #ffeeff
    if (color.length === 4) {
      let newColor = "#";
      for (let i = 1; i < 4; i++) {
        newColor += color.charAt(i).repeat(2);
      }
      color = newColor;
    }
    // 处理6位颜色值，转rgb
    let colorChange = [];
    for (let i = 1; i < 7; i += 2) {
      colorChange.push(parseInt(color.slice(i, i + 2), 16));
    }
    return `rgb(${colorChange.join(",")})`;
  } else {
    return color;
  }
};

console.log(colorToRgb("#fffff0"));
