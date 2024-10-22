/**
 * JSONP
 *
 * 一种跨域请求的解决方案，它利用了 <script> 标签可以加载跨域 JavaScript 脚本的特性。JSONP 通过动态创建一个 <script> 标签，并将该标签的 src 属性设置为一个远程 URL，这个 URL 会返回一个被调用的函数，该函数的参数包含了所需的数据。
 * 
 * script标签不遵循同源协议，可以用来进行跨域请求，优点就是兼容性好但仅限于GET请求
 * 
 * jsonp 返回的是一个 Promise
 * 
 * 1. 服务端需要识别 JSONP 请求，并返回一个特定格式的响应。这个响应是一个函数调用，函数名由请求的查询参数指定，并将数据作为参数传递给这个函数。例如，如果客户端请求https://example.com/api?callback=myCallback，服务端可能返回 myCallback({"name": "John", "age": 30});。
 * 2. 客户端在HTML页面中定义一个回调函数，然后通过<script>标签发起JSONP请求。例如：
 */

/**
 * ⼿动实现⼀个JSONP⽅法
 * @param {string} url   JSONP请求地址，返回⼀个js⽂件
 * @param {Object} params JSONP请求中的url参数，key为字符串，value为数字或者字
符串
 */
function JSONP(url, _params = {}) {
  const callbackName = params.callbackName || "callback";
  let params = Object.keys(_params).map((key) => `${key}=${_params[key]}`);

  let script = document.createElement("script");
  script.src = `${url}?${params.join("&")}`;
  document.body.appendChild(script);
  
  return new Promise((resolve, reject) => {
    window[callbackName] = (result) => {
      try {
        resolve(result);
      } catch (e) {
        reject(e);
      } finally {
        script.parentNode.removeChild(script);
      }
    };
  });
}

// ⽤例
const result = await JSONP("http://xxx.alipay.com/jsonp", {
  user: "xxx",
  callbackName: "callback",
});
console.log(JSON.stringify(result)); // "{"input":{"user":"xxx"},"output":{"test":1}}"

// http://xxx.alipay.com/jsonp
// 返回⼀个js⽂件，内容如下
callback({
  input: {
    user: "xxx",
  },
  output: {
    test: 1,
  },
});
