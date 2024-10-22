/**
 * 文本切割 BreakText
 * 
 * 给出一个限定宽度，把一个长字符串分割成 n 个部分
 * 1. 每个部分的宽度都要小于这个最大宽度
 * 2. 让 n 保持尽可能的小
 * @param {string} 原始长字符串
 * @param {number} 最大宽度
 * @return {string[]} 切分后的多行文本
 */
function BreakText(myStr, maxWidth) {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  // 测量文本宽度的辅助函数
  function measureTextWidth(text) {
    return ctx.measureText(text).width;
  }

  // 分割文本的主要函数
  function breakTextIntoLines(text, maxWidth) {
    const lines = [];
    let currentLine = '';

    for (let i = 0; i < text.length; i++) {
      const char = text[i];
      const nextChar = text[i + 1];
      const testLine = currentLine + char + (nextChar ? nextChar : '');

      if (measureTextWidth(testLine) <= maxWidth) {
        currentLine += char;
      } else {
        lines.push(currentLine);
        currentLine = char;
      }
    }

    if (currentLine.length > 0) {
      lines.push(currentLine);
    }

    return lines;
  }

  return breakTextIntoLines(myStr, maxWidth);
}

// 使用示例
const myStr = "这是一个很长的字符串，需要被分割成多个部分，每个部分的宽度都不能超过给定的最大宽度。";
const maxWidth = 100;

const lines = BreakText(myStr, maxWidth);
lines.forEach((line, index) => {
  console.log(`Line ${index + 1}: ${line}`);
});