/**
 * 日期范围 rangeDay
 * 
 * 
 * @param {*} day1 
 * @param {*} day2 
 * @returns 
 */

function rangeDay(day1, day2) {
  const result = [];
  const currentDate = new Date(day1);
  const endDate = new Date(day2);

  while (currentDate <= endDate) {
    result.push(currentDate.toISOString().split('T')[0]);
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return result;
}

// 测试案例
console.log(rangeDay(new Date("2015-02-08"), new Date("2015-03-03"))); // 从2月8日到3月3日
//   console.log(rangeDay(new Date("2023-01-01"), new Date("2023-01-05"))); // 从1月1日到1月5日
//   console.log(rangeDay(new Date("2023-12-25"), new Date("2024-01-01"))); // 从12月25日到次年的1月1日
//   console.log(rangeDay(new Date("2024-02-28"), new Date("2024-03-01"))); // 从2月28日到3月1日（闰年）
//   console.log(rangeDay(new Date("2023-02-28"), new Date("2023-03-01"))); // 从2月28日到3月1日（非闰年）
//   console.log(rangeDay(new Date("2023-01-01"), new Date("2023-01-01"))); // 同一天
//   console.log(rangeDay(new Date("2023-01-05"), new Date("2023-01-01"))); // 日期倒序
//   console.log(rangeDay(new Date("2023-01-01"), new Date("2023-01-01"))); // 同一天
//   console.log(rangeDay(new Date("2023-01-01"), new Date("2023-01-31"))); // 从1月1日到1月31日
//   console.log(rangeDay(new Date("2023-01-01"), new Date("2023-12-31"))); // 从1月1日到12月31日