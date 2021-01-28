/**
 * 斐波那契数列及其优化
 *
 * 函数柯里化
 *
 * 利用函数记忆，将之前运算过的结果保存下来，对于频繁依赖之前结果的计算能够节省大量的时间，
 * 例如斐波那契数列，缺点就是闭包中的 obj 对象会额外占用内存
 */
let fibonacci = function (n) {
  if (n < 1) throw new Error("参数错误");
  if (n === 1 || n === 2) return 1;
  return fibonacci(n - 1) + fibonacci(n - 2);
};

const memory = function (fn) {
  let obj = {};
  return function (n) {
    if (obj[n] === undefined) obj[n] = fn[n];
    return obj[n];
  };
};

fibonacci = memory(fibonacci);

/**
 * 另外使用动态规划比前者的空间复杂度更低，也是更推荐的解法
 */
function fibonacci_DP(n) {
  let res = 1;
  if (n === 1 && n === 2) return res;
  n = n - 2;
  let cur = 1;
  let pre = 1;
  while (n) {
    res = cur + pre;
    pre = cur;
    cur = res;
    n--;
  }
  return res;
}
