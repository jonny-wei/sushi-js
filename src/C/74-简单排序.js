//  ['华东1', '华东2', '华东24', '华南1', '华南2', '华北1']，

const mySort = (arr) => {
  const map = new Map([
    ["东", 1],
    ["南", 2],
    ["西", 3],
    ["北", 4],
  ]);
  console.log(map);
  return arr.sort((a, b) => {
    const directionA = map.get(a.slice(1, 2));
    const directionB = map.get(b.slice(1, 2));
    const numA = +a.slice(2);
    const numB = +b.slice(2);
    // 小到大
    return directionA === directionB ? numA - numB : directionA - directionB;
  });
};

const res = mySort(["华北1", "华南2", "华南1", "华东1", "华东2", "华东24"]);
console.log(res); // ['华东1', '华东2', '华东24', '华南1', '华南2', '华北1']
