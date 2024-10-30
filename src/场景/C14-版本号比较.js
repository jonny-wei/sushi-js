/**
 * 版本号比较与排序
 * 
 * 语义化版本号（SemVer），其格式为 MAJOR.MINOR.PATCH，并可能包含预发布标识和构建元数据
 * 
 * localeCompare 是 JavaScript 字符串对象的一个方法，用于比较两个字符串。它返回一个数字，表示两个字符串在字典顺序上的相对位置。这个方法非常适用于需要按字母顺序对字符串进行排序的场景，特别是在处理包含非数字字符的版本号时。
 */

/**
 * 简单的版本号排序与比较
 * 
 * 思路 sort 排序，条件是根据前后字符串拆成数组，进行两个数组间的排序。
 * @param {*} versions 
 * @returns 
 */
function sortVersion(versions) {
  return versions.sort((versionA, versionB) => {
    const partsA = versionA.split('.').map(Number);
    const partsB = versionB.split('.').map(Number);
    const maxLength = Math.max(partsA.length, partsB.length);

    for (let i = 0; i < maxLength; i++) {
      const partA = i < partsA.length ? partsA[i] : 0;
      const partB = i < partsB.length ? partsB[i] : 0;

      if (partA !== partB) {
        return partA - partB;
      }
    }

    // 如果主版本号相同，按字符串顺序比较
    return versionA.localeCompare(versionB);
  });
}

// 示例
const versions = ['1.2.3', '1.0.0', '1.2.4', '1.1.0', '2.0.0', '1.2.3-beta', '1.2.3-alpha'];
const sortedVersions = sortVersion(versions);
console.log(sortedVersions);
// 输出: ['1.0.0', '1.1.0', '1.2.3-alpha', '1.2.3-beta', '1.2.3', '1.2.4', '2.0.0']


var compareVersion = function (versions) {
  return versions.sort((version1, version2) => {
    let s1 = version1.split('.').map(Number)
    let s2 = version2.split('.').map(Number)

    for (let i = 0; i < s1.length || i < s2.length; i++) {
      const v1 = s1[i] || 0
      const v2 = s2[i] || 0
      if (v1 !== v2) {
        return v1 - v2;
      }
    }

    return version1.localeCompare(version2)
  })
}