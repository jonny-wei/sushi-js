/**
 * 判断是否是邮箱
 *
 */
function isEmail(email) {
  var regx = /^([a-zA-Z0-9_\-])+@([a-zA-Z0-9_\-])+(\.[a-zA-Z0-9_\-])+$/;
  return regx.test(email);
}

var isEmail = function (val) {
  var pattern = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
  var domains = [
    "qq.com",
    "163.com",
    "vip.163.com",
    "263.net",
    "yeah.net",
    "sohu.com",
    "sina.cn",
    "sina.com",
    "eyou.com",
    "gmail.com",
    "hotmail.com",
    "42du.cn",
  ];
  if (pattern.test(val)) {
    var domain = val.substring(val.indexOf("@") + 1);
    for (var i = 0; i < domains.length; i++) {
      if (domain == domains[i]) {
        return true;
      }
    }
  }
  return false;
};
// 输出 true
isEmail("cn42du@163.com");
