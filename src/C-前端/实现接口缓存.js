/**
 * 实现 cacheRequest 保证发出多次同一 ajax 请求都能拿到数据
 * 而实际只发送了一次
 */

const request = (url, option) =>
  new Promise((res) => {
    setTimeout(() => {
      res({ data: option });
    }, 2000);
  });
const cache = new Map();
const cacheRequest = (url, option) => {
  let key = `${url}:${option.method}`;
  if (cache.has(key)) {
    if (cache.get(key).status === "pending") {
      return cache.get(key).myWait;
    }
    return Promise.resolve(cache.get(key).data);
  } else {
    // 无缓存，发起真实请求
    let requestApi = request(url, option);
    cache.set(key, { status: "pending", myWait: requestApi });
    return requestApi
      .then((res) => {
        // console.log(cache)
        cache.set(key, { status: "success", data: res });
        // console.log(cache)
        return Promise.resolve(res);
      })
      .catch((err) => {
        cache.set(key, { status: "fail", data: err });
        Promise.reject(err);
      });
  }
};
// 测试
cacheRequest("url1").then((res) => console.log(res));
cacheRequest("url1").then((res) => console.log(res));

setTimeout(() => {
  cacheRequest("url1").then((res) => console.log(res));
}, 4000);
