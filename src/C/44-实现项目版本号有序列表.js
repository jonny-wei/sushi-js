/**
 * 实现 versions 项目版本号维护列表
 * @param {*} list
 * @returns
 * 思路 sort 排序，条件是根据前后字符串拆成数组，进行两个数组间的排序。
 */

function sortVersion(list) {
  return list.sort((a, b) => {
    let aa = a.split(".");
    let bb = b.split(".");
    let length = aa.length > bb.length ? aa.length : bb.length;
    for (var i = 0; i < length; i++) {
      let x = aa[i] || 0;
      let y = bb[i] || 0;
      if (x - y !== 0) return x - y;
    }
  });
}

sortVersion(["1.0.0", "1.2.3.4.5", "2.12.1", "0.18.1", "3.3.2", "0.18.1"]);
