/**
 * 实现 JSON.parse
 *
 * JSON.parse(text[, reviver])
 */

/**
 * 方法一 evel实现
 *
 * let obj = eval("(" + json + ")");
 *
 * 直接调用 eval 会存在安全问题，如果数据中可能不是 json 数据，而是可执行的 JavaScript 代码，那很可能会造成 XSS 攻击。
 * 因此，在调用 eval 之前，需要对数据进行校验。
 */
var rx_one = /^[\],:{}\s]*$/;
var rx_two = /\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g;
var rx_three = /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g;
var rx_four = /(?:^|:|,)(?:\s*\[)+/g;

if (
  rx_one.test(
    json.replace(rx_two, "@").replace(rx_three, "]").replace(rx_four, "")
  )
) {
  var obj = eval("(" + json + ")");
}

/**
 * new Function 实现
 */
var jsonStr = '{ "age": 20, "name": "jack" }';
var json = new Function("return " + jsonStr)();
