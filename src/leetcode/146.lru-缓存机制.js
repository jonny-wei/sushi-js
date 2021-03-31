/*
 * @lc app=leetcode.cn id=146 lang=javascript
 *
 * [146] LRU 缓存机制
 */

// @lc code=start

/**
 * 方法一
 * 
 * 基于数组(栈)的维护 key 的顺序，将用过的数据的 key 放在数组最后(push), 
 * 数组最前的就是最近时间最少使用的数据
 * 
 * 缺点：算法复杂度O(n) 空间复杂度O(n)
 *
 * Object.hasOwnProperty.call(this.cache, key) 与 this.cache[key]
 *
 * 当 this.cache[key] = 0 或 this.cache[key] = false 等
 * 通过 if(this.cache[key]) 判断是有误的
 */
 var LRUCache = function (capacity) {
  this.max = capacity;
  this.keys = [];
  this.cache = Object.create(null);
};

LRUCache.prototype.get = function (key) {
  if (Object.hasOwnProperty.call(this.cache, key)) {
    remove(this.keys, key);
    this.keys.push(key);
    return this.cache[key];
  }
  return -1;
};

LRUCache.prototype.put = function (key, value) {
  if (Object.hasOwnProperty.call(this.cache, key)) {
    this.cache[key] = value;
    remove(this.keys, key);
    this.keys.push(key);
  } else {
    this.cache[key] = value;
    this.keys.push(key);
    if (this.keys.length > this.max) {
      const firstKey = this.keys[0]
      remove(this.keys, firstKey);
      delete this.cache[firstKey];
    }
  }
};

const remove = function (keys, key) {
  if (keys.length > 0) {
    const index = keys.indexOf(key);
    index > -1 && keys.splice(index, 1);
  }
};

/**
 * 方法二
 *
 * 方法一是用 keys 数组(栈)来维护 key 的顺序，维护最近最少使用的页面，
 * 算法复杂度O(n) 空间复杂度O(n)
 *
 * 可以利用 Map 既能保存键值对，并且能够记住键的原始插入顺序
 * 中间变量 temp 交换擦插入顺序
 */
class LRUCache {
  constructor(capacity) {
    this.max = capacity;
    this.cache = new Map();
  }

  get(key) {
    if(this.cache.has(key)) {
      // 存在则先删除后加入，更新插入顺序
      const temp = this.cache.get(key);
      this.cache.delete(key);
      this.cache.set(key,temp);
      return temp;
    }
    return -1;
  }

  put(key, value) {
    if(this.cache.has(key)){
      // 存在则先删除后加入，更新插入顺序
      this.cache.delete(key);
    }else{
      /**
       * 不存在判断 cache 的大小是否小于最大容量
       * 当等于最大容量时，删除第一个然后加入，更新插入顺序
       * this.cache.keys() 是一个迭代器
       * this.cache.keys().next().value 获取 Map 中的第一个key
       */
      if(this.cache.size >= this.max){
        this.cache.delete(this.cache.keys().next().value)
      }
    }
    this.cache.set(key,value);
  }
}


/**
 * 方法二 优化(推荐)
 * 
 * cache = this.cache 利用局部变量提升性能
 */
class LRUCache{
  constructor(capacity){
    this.max = capacity;
    this.cache = new Map();
  }

  get(key){
    let cache = this.cache;
    if(cache.has(key)){
      const temp = cache.get(key);
      cache.delete(key);
      cache.set(key,temp);
      return temp;
    }
    return -1;
  }

  put(key,value){
    let cache = this.cache;
    if(cache.has(key)){
      cache.delete(key)
    }else if(cache.size >= this.max){
      cache.delete(cache.keys().next().value)
    }
    cache.set(key,value)
  }
}




/**
 * Your LRUCache object will be instantiated and called as such:
 * var obj = new LRUCache(capacity)
 * var param_1 = obj.get(key)
 * obj.put(key,value)
 */
// @lc code=end

lRUCache = new LRUCache(2);
lRUCache.put(1, 0); // 缓存是 {1=1}
lRUCache.put(2, 2); // 缓存是 {1=1, 2=2}
lRUCache.get(1); // 返回 1
lRUCache.put(3, 3); // 该操作会使得关键字 2 作废，缓存是 {1=1, 3=3}
lRUCache.get(2); // 返回 -1 (未找到)
lRUCache.put(4, 4); // 该操作会使得关键字 1 作废，缓存是 {4=4, 3=3}
lRUCache.get(1); // 返回 -1 (未找到)
lRUCache.get(3); // 返回 3
lRUCache.get(4); // 返回 4
