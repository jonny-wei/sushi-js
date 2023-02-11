/**
 * JSONP
 *
 * script标签不遵循同源协议，可以用来进行跨域请求，优点就是兼容性好但仅限于GET请求
 *
 * JSONP 是一种非正式传输协议，允许用户传递一个callback的参数给服务端，
 * 然后服务端返回数据时会将这个callback 参数作为函数名来包裹住 JSON 数据，
 * 这样客户端就可以随意定制自己的函数来自动处理返回数据了。
 * 当GET请求从后台页面返回时，可以返回一段JavaScript代码，
 * 这段代码会自动执行，可以用来负责调用后台页面中的一个callback函数。
 * jsonp 返回的是一个 Promise
 */
const jsonp = ({ url, params, callbackName }) => {
  const generateUrl = () => {
    let dataSrc = "";
    for (let key in params) {
      if (Object.prototype.hasOwnProperty.call(params, key)) {
        dataSrc += `${key}=${params[key]}&`;
      }
    }
    dataSrc += `callback=${callbackName}`;
    return `${url}?${dataSrc}`;
  };
  return new Promise((resolve, reject) => {
    const scriptEle = document.createElement("script");
    scriptEle.src = generateUrl();
    document.body.appendChild(scriptEle);
    window[callbackName] = (data) => {
      resolve(data);
      document.removeChild(scriptEle);
    };
  });
};

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
