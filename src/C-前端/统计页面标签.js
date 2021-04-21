/**
 * 统计页面标签
 *
 * 如果让你统计一个页面中有多少种标签，每种多少个，最多的是那几个？
 */

// 获取当前页面的所有标签
let allTagsArr = document.getElementsByTagName("*"); // 注意是一个这是一个类数组

// 类数组转数组并返回标签集合
let allTagsNameArr = [...allTagsArr].map((item) => item.tagName);

//利用 new Set() 对数组去重 得到当前页面中有多少种标签
let size = new Set(allTagsNameArr).size;

/**
 * 如何获得每种标签有多少个呢 reduce 统计
 */
//reduce，初始化给出一个空对象，对每种标签进行计数
let allTagsCountObj = allTagsNameArr.reduce((acc, val) => {
  val in acc ? (acc[val] += 1) : (acc[val] = 1);
  return acc;
}, {});
// 排个序
let result = Object.entries(allTagsCountObj).sort((a, b) => b[1] - a[1]);
