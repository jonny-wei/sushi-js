/**
 * 大数相乘
 *
 */
const stringNumberMultiply = (str1, str2) => {
  const len1 = str1.length;
  const len2 = str2.length;
  const maxLen = len1 + len2;
  const res = new Array(maxLen).fill(0);

  for (let i = len1 - 1; i >= 0; i--) {
    let n1 = +str1[i];
    for (let j = len2 - 1; j >= 0; j--) {
      let n2 = +str2[j];
      const multi = n1 * n2;
      const sum = multi + res[i + j + 1];
      res[i + j + 1] = sum % 10;
      res[i + j] += Math.floor(sum / 10);
    }
  }

  while (res[0] === 0) {
    res.shift();
  }
  return res.length ? res.join("") : "0";
};

// test string
const res = stringNumberMultiply("999", "88");
console.log(res, 999 * 88);
