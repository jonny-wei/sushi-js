/**
 * 模拟 AJAX
 *
 * readyState 属性返回一个 XMLHttpRequest  代理当前所处的状态。
 * 0    UNSENT	代理被创建，但尚未调用 open() 方法。
 * 1	OPENED	open() 方法已经被调用。
 * 2	HEADERS_RECEIVED	send() 方法已经被调用，并且头部和状态已经可获得。
 * 3	LOADING	下载中； responseText 属性已经包含部分数据。
 * 4	DONE	下载操作已完成。
 *
 * responseText 在一个请求被发送后，从服务器端返回文本。
 *
 * response 返回一个 ArrayBuffer、Blob、Document，或 DOMString，
 * 具体是哪种类型取决于 XMLHttpRequest.responseType 的值。其中包含整个响应实体（response entity body）。
 *
 * responseType 属性是一个枚举类型的属性，返回响应数据的类型。
 * 它允许我们手动的设置返回数据的类型。如果我们将它设置为一个空字符串，它将使用默认的"text"类型。
 *
 * status 返回了XMLHttpRequest 响应中的数字状态码。status 的值是一个无符号短整型。
 * 在请求完成前，status的值为0。值得注意的是，如果 XMLHttpRequest 出错，浏览器返回的 status 也为0。
 *
 * onreadystatechange
 * 只要 readyState 属性发生变化，就会调用相应的处理函数。这个回调函数会被用户线程所调用。
 * XMLHttpRequest.onreadystatechange 会在 XMLHttpRequest 的readyState 属性发生改变时触发 readystatechange 事件的时候被调用。
 *
 * setRequestHeader() 是设置HTTP请求头部的方法。
 * setRequestHeader(header, value)
 * 此方法必须在  open() 方法和 send()   之间调用。
 * 如果多次对同一个请求头赋值，只会生成一个合并了多个值的请求头。
 *
 * xhrReq.open(method, url, async, user, password);
 *
 * https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest
 */
const getJSON = function (url) {
  return new Promise((resolve, reject) => {
    const xhr = XMLHttpRequest
      ? new XMLHttpRequest()
      : new ActiveXObject("Microsoft.XMLHTTP");
    xhr.open("GET", url, false);
    xhr.responseType = "json";
    xhr.setRequestHeader("Accept", "application/json");
    xhr.onreadystatechange = () => {
      if (xhr.readyState !== 4) {
        return;
      }
      if (xhr.status === 200 || xhr.status === 304) {
        resolve(xhr.response);
      } else {
        reject(new Error(xhr.responseText));
      }
    };
    xhr.send();
  });
};

/**
 * 发送请求超过 5s 后没有返回数据 则请求超时，中断请求，提示错误
 * @param {*} url 
 * @param {*} timeout 
 * @returns 
 */
const getJSON = function (url, timeout = 5000) {
  return new Promise((resolve, reject) => {
    const xhr = XMLHttpRequest
      ? new XMLHttpRequest()
      : new ActiveXObject("Microsoft.XMLHTTP");
    let isTimeout = false;
    const timer = setTimeout(() => {
      isTimeout = true;
      xhr.abort();
      reject("request is timeout");
    }, timeout);
    xhr.open("GET", url, false);
    xhr.responseType = "json";
    xhr.setRequestHeader("Accept", "application/json");
    xhr.onreadystatechange = () => {
      if (xhr.readyState !== 4 || isTimeout) {
        return;
      }
      clearTimeout(timer);
      if (xhr.status === 200 || xhr.status === 304) {
        resolve(xhr.response);
      } else {
        reject(new Error(xhr.responseText));
      }
    };
    xhr.send();
  });
};
