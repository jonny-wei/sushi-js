/**
 * JSONP
 *
 * script标签不遵循同源协议，可以用来进行跨域请求，优点就是兼容性好但仅限于GET请求
 * 
 * JSONP 是一种非正式传输协议，允许用户传递一个callback给服务端，
 * 然后服务端返回数据时会将这个callback 参数作为函数名来包裹住 JSON 数据，
 * 这样客户端就可以随意定制自己的函数来自动处理返回数据了。
 * 当GET请求从后台页面返回时，可以返回一段JavaScript代码，
 * 这段代码会自动执行，可以用来负责调用后台页面中的一个callback函数。
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
