/**
 * 驼峰与下划线互转
 *
 */

// 下划线转驼峰
function toHunp(string) {
  return string.replace(/\_(\w)/g, (all, letter) => {
    return letter.toUpperCase();
  });
}

let a = "a_b2_345_c2345";
console.log(toHump(a));

// 连接符转驼峰
function toHunp(string){
  return string.replace(/\-(\w)/g, (all,letter)=>{
    return letter.toUpperCase();
  })
}

// 驼峰转下划线
function toLine(string) {
  return string.replace(/([A-Z])/g, "_$1").toLowerCase();
}
let b = "aBdaNf";
console.log(toLine(b));
