/**
 * 统计页面标签 countTagsOnPage
 *
 * 如果让你统计一个页面中有多少种标签，每种多少个，最多的是那几个？
 * 统计页面中所有标签的数量，并返回一个按数量从多到少排序的结果
 */

/**
 * 统计页面中所有标签的数量，并返回一个按数量从多到少排序的结果
 * @returns {Array} 一个包含标签名和数量的数组
 */
function countTagsOnPage() {
  // 获取当前页面的所有标签
  const allTagsArr = document.getElementsByTagName("*"); // 注意这是一个类数组

  // 类数组转数组并返回标签集合
  const allTagsNameArr = [...allTagsArr].map((item) => item.tagName);

  // 利用 new Set() 对数组去重，得到当前页面中有多少种标签
  const size = new Set(allTagsNameArr).size;

  // reduce，初始化给出一个空对象，对每种标签进行计数
  const allTagsCountObj = allTagsNameArr.reduce((acc, val) => {
      acc[val] = (acc[val] || 0) + 1;
      return acc;
  }, {});

  // 排个序
  const result = Object.entries(allTagsCountObj).sort((a, b) => b[1] - a[1]);

  // 返回结果
  return {
      totalTagTypes: size,
      tagCounts: result
  };
}

// 示例使用
const tagStats = countTagsOnPage();
console.log("Total number of different tags:", tagStats.totalTagTypes);
console.log("Tag counts:", tagStats.tagCounts);