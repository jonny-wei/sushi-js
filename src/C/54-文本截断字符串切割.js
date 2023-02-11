const canvas = document.createElement('canvas')
const ctx = canvas.getContext('2D')
// 测量文本的宽度
const result = ctx.measureText('abcd')
result.width // 22.77

/**
 * 给出一个限定宽度，把一个长字符串分割成 n 个部分
 * 1. 每个部分的宽度都要小于这个最大宽度
 * 2. 让 n 保持尽可能的小
 * @param {string} 原始长字符串
 * @param {number} 最大宽度
 * @return {string[]} 切分后的多行文本
 */
function BreakText (myStr, width) {
	const canvas = document.createElement('canvas')
	const ctx = canvas.getContext('2D')
	const result = ctx.measureText(myStr);
	const myStrWidth = result.width;
	// const res = [];
	// const sum = 0;
	// let start = 0;
	// let last = 0;
	// while(sum <= myStrWidth){
	// 	// start, last
	// 	last = 
	// 	const str = myStr.splice(start, last)
	// 	 const strWidth = ctx.measureText(str);
	// 	 sum += strWidth
	// }
	
}