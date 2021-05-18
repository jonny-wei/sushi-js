/**
 * 斐波那契数列及其优化
 *
 * 0、1、1、2、3、5、8、13、21、34
 * F(0)=0，F(1)=1, F(n)=F(n - 1)+F(n - 2)（n ≥ 2，n ∈ N*）
 *
 * 最传统的做法就是使用递归，但是我们知道，若递归深度过大，就会导致栈溢出。
 * 为了解决该问题，我们可以使用动态规划，将每次前两数之和存起来，便于下次直接使用
 * 这样就把一个栈溢出的问题，变为了单纯的数学加法，大大减少了内存的压力
 *
 * 利用函数记忆与闭包，将之前运算过的结果保存下来，对于频繁依赖之前结果的计算能够节省大量的时间，
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
    if (obj[n] === undefined) obj[n] = fn(n);
    return obj[n];
  };
};

// fibonacci = memory(fibonacci);

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
function fibonacci3(n) {
  let pre1 = 1;
  let pre2 = 1;
  let current = 2;
  if (n <= 2) {
    return current;
  }
  for (let i = 2; i < n; i++) {
    pre1 = pre2;
    pre2 = current;
    current = pre1 + pre2;
  }
  return current;
}
// 或者(答案需要取模 1e9+7（1000000007），如计算初始结果为：1000000008，请返回 1。)
function fibonacci_DP(n) {
  if (n === 0) return 0;
  if (n === 1) return 1;
  let n1 = 0,
    n2 = 1,
    sum;
  for (let i = 0; i < n; i++) {
    sum = (n1 + n2) % 1000000007;
    n1 = n2;
    n2 = sum;
  }
  return n1;
}

// 测试 普通fibonacci性能 < memory(fibonacci)性能 < fibonacci_DP(n)性能
console.time("time1");
console.log(fibonacci(20));
console.timeEnd("time1");

console.time("time2");
fibonacci = memory(fibonacci);
console.log(fibonacci(20));
console.timeEnd("time2");

console.time("time3");
console.log(fibonacci_DP(20));
console.timeEnd("time3");
