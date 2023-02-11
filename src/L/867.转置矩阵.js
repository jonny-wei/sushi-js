67/*
 * @lc app=leetcode.cn id=867 lang=javascript
 *
 * [867] 转置矩阵
 */

// @lc code=start
/**
 * @param {number[][]} matrix
 * @return {number[][]}
 */
 var transpose = function (matrix) {
    const m = matrix.length, n = matrix[0].length;
    const arr = new Array(n).fill(0).map(() => new Array(m).fill(0));
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            arr[j][i] = matrix[i][j]
        }
    }
    return arr
};

// 方法二
var transpose = function (A) {
  return A[0].map((_, idx) => {
    return A.map((row) => row[idx]);
  });
};
// @lc code=end

