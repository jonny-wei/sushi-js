/**
 * 驼峰与下划线互转
 *
 */

// 下划线转驼峰
function toHump(name) {
  return name.replace(/\_(\w)/g, function (all, letter) {
    return letter.toUpperCase();
  });
}

var f = function (s) {
  return s.replace(/-\w/g, function (x) {
    return x.slice(1).toUpperCase();
  });
};

let a = "a_b2_345_c2345";
console.log(toHump(a));

// 驼峰转下划线
function toLine(name) {
  return name.replace(/([A-Z])/g, "_$1").toLowerCase();
}
let b = "aBdaNf";
console.log(toLine(b));
