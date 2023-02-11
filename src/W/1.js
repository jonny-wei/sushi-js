/**
 * 大数相加
 * 
 * 字符串相加
 * - (Math.pow(2, 53) - 1) --  Math.pow(2, 53) - 1
 * null undefined number string boolean symbol bigint
 */
const stringNumberAdd = (str1, str2) => {
    if(typeof str1 !== 'string' && typeof str2 !== 'string'){
        throw new Error('参数不合法')
    }
    const len1 = str1.length;
    const len2 = str2.length;
    const maxLen = Math.max(len1, len2);
    const s1 = str1.padStart(maxLen, '0');
    const s2 = str2.padStart(maxLen, '0');

    let r = 0; // 余数
    let res = new Array(maxLen).fill(0);
    for(let i = maxLen - 1; i >= 0; i--) {
        const n1 = +s1[i];
        const n2 = +s2[i];
        const sum = n1 + n2 + r;
        r = Math.floor(sum / 10);
        res[i] = sum % 10
    }

    if(r){
        res.unshift(r)
    }

    return res.join('');
}

// test
const res = stringNumberAdd('1', '99999999999999999999');
console.log(res);