/**
 * 判断是否是身份证号码
 *
 */
function isCardNo(number) {
  var regx = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
  return regx.test(number);
}
