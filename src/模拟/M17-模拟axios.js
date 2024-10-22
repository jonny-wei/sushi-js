/**
 * 模拟 Axios、AJAX
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
/**
 * 第一版 简易版 AJAX
 * @param {*} url 
 * @returns 
 */
var getJSON = function (url) {
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
 * 第二版 请求超时
 * 
 * 发送请求超过 5s 后没有返回数据 则请求超时，中断请求，提示错误
 * @param {*} url 
 * @param {*} timeout 
 * @returns 
 */
var getJSON = function (url, timeout = 5000) {
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


/**
 * 第三版 简易版 Axios
 * 
 */
class SimpleAxios {
  constructor(baseURL) {
    if (!baseURL) {
      throw new Error('baseURL must be provided');
    }
    this.baseURL = baseURL;
    this.defaults = {
      headers: {
        'Content-Type': 'application/json'
      },
      timeout: 5000,
      retry: 3,
      retryDelay: 1000
    };
  }

  async get(url, config = {}) {
    return this.request({ ...config, method: 'GET', url });
  }

  async post(url, data, config = {}) {
    return this.request({ ...config, method: 'POST', url, data });
  }

  async request(config) {
    const { retry, retryDelay, timeout } = { ...this.defaults, ...config };
    let attempts = 0;

    while (attempts < retry) {
      try {
        const response = await this.sendRequest({ ...config, timeout });
        return response;
      } catch (error) {
        if (error.message === 'Request timed out') {
          attempts++;
          if (attempts < retry) {
            console.log(`Attempt ${attempts} failed, retrying in ${retryDelay}ms`);
            await new Promise(resolve => setTimeout(resolve, retryDelay));
          } else {
            throw new Error(`Request failed after ${retry} attempts`);
          }
        } else {
          throw error;
        }
      }
    }
  }

  sendRequest(config) {
    return new Promise((resolve, reject) => {
      const { url, method, headers, data, timeout } = config;
      const xhr = new XMLHttpRequest();
      xhr.open(method.toUpperCase(), this.baseURL + url, true);

      for (let key in headers) {
        xhr.setRequestHeader(key, headers[key]);
      }

      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          if (xhr.status >= 200 && xhr.status < 300 || xhr.status === 0) {
            resolve(xhr.responseText);
          } else {
            reject(new Error(`Request failed with status: ${xhr.status}`));
          }
        }
      };

      xhr.timeout = timeout;
      xhr.ontimeout = () => {
        reject(new Error('Request timed out'));
      };

      xhr.send(data);
    });
  }
}

// 使用示例
const simpleAxios = new SimpleAxios('https://api.example.com');

simpleAxios.get('/data')
  .then(data => console.log(data))
  .catch(error => console.error(error));

simpleAxios.post('/data', { key: 'value' })
  .then(data => console.log(data))
  .catch(error => console.error(error));

simpleAxios.get('/data', {
  timeout: 2000, // 设置超时时间为2000毫秒
  retry: 5, // 设置重试次数为5
  retryDelay: 2000 // 设置重试间隔为2000毫秒
})
  .then(data => console.log('Data received:', data))
  .catch(error => {
    if (error.message === 'Request timed out') {
      console.error('Request timed out after retries');
    } else {
      console.error('Request failed:', error.message);
    }
  });

/**
 * 第四版 较完整实现 Axios
 */
class AxiosCancelToken {
  constructor(executor) {
    if (typeof executor !== 'function') {
      throw new Error('executor must be a function.');
    }
    this.promise = new Promise((resolve, reject) => {
      this.resolve = resolve;
      this.reject = reject;
      executor(this.reject);
    });
  }
}

class AxiosCancelTokenSource {
  constructor() {
    this.token = new AxiosCancelToken((cancel) => {
      this.cancel = cancel;
    });
  }
}

class Axios {
  constructor(baseURL) {
    if (!baseURL) {
      throw new Error('baseURL must be provided')
    }

    this.baseURL = baseURL
    this.defaults = {
      headers: {
        'Content-Type': 'application/json'
      },
      timeout: 5000,
      retry: 3,       // 默认重试次数为3
      retryDelay: 1000 // 默认重试间隔为1000毫秒
    }
    this.interceptors = {
      request: [],
      response: []
    }
  }

  get(url, config) {
    return this.request({ ...config, method: 'GET', url })
  }

  post(url, data, config) {
    return this.request({ ...config, method: 'POST', url, data })
  }

  async request(config) {
    const finalConfig = { ...this.defaults, ...config };
    let chain = [this.handleRequest(finalConfig), undefined];

    this.interceptors.request.forEach(interceptor => {
      chain.unshift(interceptor.fulfilled, interceptor.rejected);
    });

    let promise = Promise.resolve(finalConfig);

    while (chain.length) {
      promise = promise.then(chain.shift(), chain.shift());
    }

    return promise;
  }

  async handleRequest(config) {
    try {
      const response = await this.withRetry(config);
      return response;
    } catch (error) {
      throw error;
    }
  }

  async withRetry(config) {
    let attempts = 0;
    const { retry, retryDelay } = config;

    while (attempts < retry) {
      try {
        const response = await this.sendRequest(config);
        return response;
      } catch (error) {
        if (error.message === 'Request timed out' || error.message === 'Request failed') {
          attempts++;
          if (attempts < retry) {
            console.log(`Attempt ${attempts} failed, retrying in ${retryDelay}ms`);
            await new Promise(resolve => setTimeout(resolve, retryDelay));
          } else {
            throw new Error(`Request failed after ${retry} attempts`);
          }
        } else {
          throw error;
        }
      }
    }
  }

  sendRequest(config) {
    return new Promise((resolve, reject) => {
      const { url, method, headers, data, timeout } = config;

      const xhr = new XMLHttpRequest();
      xhr.open(method.toUpperCase(), this.baseURL + url, true);

      for (let key in headers) {
        xhr.setRequestHeader(key, headers[key]);
      }

      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          if (xhr.status >= 200 && xhr.status < 300 || xhr.status === 0) {
            resolve(xhr.responseText);
          } else {
            reject(new Error(`Request failed with status: ${xhr.status}`));
          }
        }
      };

      xhr.timeout = timeout;
      xhr.ontimeout = () => {
        reject(new Error('Request timed out'));
      };


      if (config.cancelToken) {
        config.cancelToken.promise.then(reason => {
          reject(new Error('Request canceled: ' + reason));
          xhr.abort();
        });
      }

      xhr.send(data);
    });
  }


  cancelTokenSource() {
    return new AxiosCancelTokenSource();
  }

  isCancel(value) {
    return !!(value && value.message && value.message.includes('Request canceled'));
  }

  useRequestInterceptor(fulfilled, rejected) {
    this.interceptors.request.push({ fulfilled, rejected });
  }

  useResponseInterceptor(fulfilled, rejected) {
    this.interceptors.response.push({ fulfilled, rejected });
  }
}

class AxiosCancelTokenSource {
  constructor() {
    this.token = new AxiosCancelToken((cancel) => {
      this.cancel = cancel;
    });
  }
}

class AxiosCancelToken {
  constructor(executor) {
    if (typeof executor !== 'function') {
      throw new Error('executor must be a function.');
    }
    this.promise = new Promise((resolve, reject) => {
      this.resolve = resolve;
      this.reject = reject;
      executor(this.reject);
    });
  }
}

// 测试用例
const axios = new Axios('https://api.example.com');

axios.useRequestInterceptor(function (fulfilled) {
  console.log('Request:', fulfilled);
  return fulfilled;
}, function (rejected) {
  console.log('Request failed:', rejected);
  return Promise.reject(rejected);
});

axios.useResponseInterceptor(function (fulfilled) {
  console.log('Response:', fulfilled);
  return fulfilled;
}, function (rejected) {
  console.log('Response failed:', rejected);
  return Promise.reject(rejected);
});

axios.get('/data', {
  cancelToken: axios.cancelTokenSource().token
}).then(data => console.log(data))
  .catch(error => {
    if (axios.isCancel(error)) {
      console.log('Request canceled', error.message);
    } else {
      console.error(error);
    }
  });

axios.post('/data', { key: 'value' }, {
  cancelToken: axios.cancelTokenSource().token
}).then(data => console.log(data))
  .catch(error => {
    if (axios.isCancel(error)) {
      console.log('Request canceled', error.message);
    } else {
      console.error(error);
    }
  });


// 测试 取消请求
const source = axios.cancelTokenSource();

axios.get('/data', { cancelToken: source.token })
  .then(response => {
    console.log(response);
  })
  .catch(error => {
    if (axios.isCancel(error)) {
      console.log('Request canceled', error.message);
    } else {
      console.error('Error:', error);
    }
  });

// 取消请求
source.cancel('Operation canceled by the user.');

// 测试重试
const axios2 = new Axios('https://api.example.com', {
  retry: 5, // 设置重试次数为5
  retryDelay: 2000 // 设置重试间隔为2000毫秒
});

axios2.get('/data')
  .then(response => {
    console.log(response);
  })
  .catch(error => {
    console.error('Request failed after retries:', error);
  });

// 测试超时
const axios3 = new Axios('https://api.example.com', {
  timeout: 1000
});

axios3.get('/data')
  .then(response => {
    console.log(response);
  })
  .catch(error => {
    if (error.message === 'Request timed out') {
      console.error('Request timed out after 10 seconds');
    } else {
      console.error('Request failed:', error);
    }
  });  