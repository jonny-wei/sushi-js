/**
 * 接口数据缓存 cacheRequest 
 * 
 * 保证发出多次同一 ajax 请求都能拿到数据
 * 而实际只发送了一次
 */

class CacheRequest {
  constructor() {
    this.cache = new Map();
  }

  // 生成唯一的缓存键
  getCacheKey(url, options = {}) {
    const { method = 'GET', body = null, headers = {} } = options;
    const query = new URLSearchParams(headers).toString();
    return `${url}:${method}:${query}:${body ? JSON.stringify(body) : ''}`;
  }

  request(url, options = {}) {
    const key = this.getCacheKey(url, options);

    if (this.cache.has(key)) {
      const cachedEntry = this.cache.get(key);
      if (cachedEntry.status === 'pending') {
        console.log(`等待缓存中的请求完成：${key}`);
        return cachedEntry.promise;
      }
      console.log(`从缓存中获取：${key}`);
      return Promise.resolve(cachedEntry.data);
    }

    console.log(`发送新请求：${key}`);
    const promise = fetch(url, options)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        this.cache.set(key, { status: 'success', data });
        return data;
      })
      .catch(error => {
        console.error(`请求失败：${key}`, error);
        this.cache.set(key, { status: 'error', data: error });
        throw error;
      });

    this.cache.set(key, { status: 'pending', promise });
    return promise;
  }

  clearCache(url) {
    if (url) {
      const keysToRemove = [];
      this.cache.forEach((value, key) => {
        if (key.startsWith(url)) {
          keysToRemove.push(key);
        }
      });
      keysToRemove.forEach(key => this.cache.delete(key));
    } else {
      this.cache.clear();
    }
  }
}

// 使用示例
const cacheRequest = new CacheRequest();

cacheRequest.request('https://api.example.com/data1')
  .then(data => console.log('请求1结果:', data));

cacheRequest.request('https://api.example.com/data2')
  .then(data => console.log('请求2结果:', data));

// 重复请求，应该从缓存中获取
cacheRequest.request('https://api.example.com/data1')
  .then(data => console.log('请求1结果（从缓存）:', data));

// 清除特定 URL 的缓存
cacheRequest.clearCache('https://api.example.com/data1');

// 重复请求，应该重新发送请求
cacheRequest.request('https://api.example.com/data1')
  .then(data => console.log('请求1结果（重新发送）:', data));

// 清除所有缓存
cacheRequest.clearCache();
