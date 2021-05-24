/**
 * 两个日期中间的有效日期
 *
 */
function rangeDay(day1, day2) {
  const result = [];
  const dayTimes = 24 * 60 * 60 * 1000;
  const startTime = day1.getTime();
  const range = day2.getTime() - startTime;
  let total = 0;

  while (total <= range && range > 0) {
    result.push(
      new Date(startTime + total).toLocaleDateString().replace(/\//g, "-")
    );
    total += dayTimes;
  }
  return result;
}
rangeDay(new Date("2015-02-08"), new Date("2015-03-03"));
