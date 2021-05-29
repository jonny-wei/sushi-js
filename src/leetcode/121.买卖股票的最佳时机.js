/*
 * @lc app=leetcode.cn id=121 lang=javascript
 *
 * [121] 买卖股票的最佳时机
 */

// @lc code=start
/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function (prices) {
  let minprice = prices[0]; // 最低价格
  let maxprofit = 0; // 最大利润
  for (var i = 0; i < prices.length; i++) {
    if (prices[i] < minprice) {
      minprice = prices[i];
    } else if (prices[i] - minprice > maxprofit) {
      maxprofit = prices[i] - minprice;
    }
  }
  return maxprofit;
};

// 方法二 动态规划
let maxProfit = function (prices) {
  let max = 0,
    minprice = prices[0];
  for (let i = 1; i < prices.length; i++) {
    minprice = Math.min(prices[i], minprice);
    max = Math.max(max, prices[i] - minprice);
  }
  return max;
};
// @lc code=end
