/**
 * keep-alive LRU 最近最少使用缓存策略 (推荐方法三)
 * 
 * 
 * 设计和实现一个 LRU (最近最少使用) 缓存机制。
 * 它应该支持以下操作： 获取数据 get 和写入数据 put
 * 
 * LRU 是一种常用的页面置换算法。其目的在于在发生缺页中断时，将最长时间未使用的页面给置换出去。
 * 根据数据的历史访问记录来进行淘汰数据，其核心思想是 如果数据最近被访问过，
 * 那么将来被访问的几率也更高 ，优先淘汰最近没有被访问到的数据。
 */

/**
 * 方法一 构造函数
 * 
 * 基于数组的维护 key 的顺序，将用过的数据的 key 放在数组最后(push), 
 * 数组最前的就是最近时间最少使用的数据
 * 
 * 缺点 remove中 indexOf 需要O(n)的时间找到key所在的索引
 * @param {*} max 
 */

let LRUCache = function (max) {
  this.cache = Object.create(null);
  this.keys = [];
  this.max = max;
};

LRUCache.prototype.get = function (key) {
  if (this.cache[key]) {
    remove(this.keys, key);
    this.keys.push(key);
    return this.cache[key];
  }
  return -1;
}

LRUCache.prototype.put = function(key, value) {
  if (this.cache[key]) {
    // 存在更新
    this.cache[key] = value;
    remove(this.keys, key);
    this.keys.push(key);
  } else {
    // 不存在加入
    this.keys.push(key);
    this.cache[key] = value;
    if (this.keys.length > this.max) {
      const firstKey = this.keys[0]; // this.keys[0] = this.keys.pop()
      this.cache[firstKey] = null;
      remove(this.keys, firstKey);
    }
  }
}

function remove(keys, key) {
  if (keys.length) {
    const index = keys.indexOf(key);
    if (index > -1) {
      keys.splice(index, 1);
    }
  }
}

/**
 * 方法二 ES6 class 实现
 * 
 * 基于数组的维护 key 的顺序，将用过的数据的 key 放在数组最后(push), 
 * 数组最前的就是最近时间最少使用的数据
 */

class LRUCache {
  constructor(max) {
    this.cache = Object.create(null);
    this.keys = [];
    this.max = max;
  }

  get(key) {
     if (this.cache[key]) {
        remove(this.keys, key);
        this.keys.push(key); 
        return this.cache[key];
     }
     return -1
  }

  put(key, value) {
    if (this.cache[key]) {
      // 存在更新
      this.cache[key] = value;
      remove(this.keys, key);
      this.keys.push(key);
    } else {
      // 不存在加入
      this.keys.push(key);
      this.cache[key] = value;
      if (this.keys.length > this.max) {
        const firstKey = this.keys[0];
        this.cache[firstKey] = null;
        remove(this.keys, firstKey);
      }
    }
  }

  remove(keys, key) {
      if(keys.length){
          const index = keys.indexOf(key);
          if(index > -1){
              keys.splice(index, 1);
          }
      }
  }
}


/**
 * 方法三 基于 Map (推荐)
 * 
 * 依赖 map 本身能维护插入的顺序
 * 利用 Map 既能保存键值对，并且能够记住键的原始插入顺序
 * @param {*} max 
 */

let LRUCache = function(max){
    this.cache = new Map();
    this.max = max;
}

LRUCache.prototype.get = function(key){
    if(this.cache.has(key)){
        const temp = this.cache.get(key)
        this.cache.delete(key)
        this.cache.set(key, temp)
        return temp
    }
    return -1
}

LRUCache.prototype.put = function(key, value) {
    if(this.cache.has(key)){
        // 存在更新(删除后加入)
        this.cache.delete(key)
    }else if(this.cache.size >= this.max){
        // 缓存超过最大值，则移除最近没有使用的
        this.cache.delete(this.cache.keys().next().value) // this.cache.keys()是一个迭代器
    }
    this.cache.set(key,value)
}

/**
 * 方法四
 * 
 * 如果用数组维护一个 key 顺序，将 key 挪来挪去(数组的删除与插入) 需要 indexOf 找索引
 * indexOf 底层是 for 循环 时间复杂度 O(n) ,所以考虑用链表。
 * 
 * 用链表的话，随意移除一个节点的时间复杂度是 O(1)，
 * 移除节点后，我们还得把它前后两个节点连起来，所以用双向链表会比较方便。
 * 
 * 但是链表获取节点的时间复杂度是 O(N)，所以我们还需要一个数据结构(哈希表)将获取节点的复杂度降为 O(1)
 * 
 * 双链表 + 哈希表
 * 
 * put：
 * 如果 key 存在更新节点数据并移动节点到链表头部
 * 如果不存在 key 就要添加了。判断缓存满了没有，缓存满了，移除最后一个节点并删除它在哈希表中的映射
 * 如果没有满，新建一个节点，在哈希表中新增映射并加入到链表头部
 * 
 * get：
 * 如果key存在返回节点值并将节点移动到链表头部。不存在key返回-1
 */
 class DoubleLinkedListNode {
    constructor(key, value) {
        this.key = key;
        this.value = value;
        this.prev = null;
        this.next = null;
    }
}

class LRUCache {
    constructor(capacity) {
        this.capacity = capacity;
        // Mappings of key->node.
        this.hashmap = {};
        // Use two dummy nodes so that we don't have to deal with the head/tail seperately.
        this.dummyHead = new DoubleLinkedListNode(null, null);
        this.dummyTail = new DoubleLinkedListNode(null, null);
        this.dummyHead.next = this.dummyTail;
        this.dummyTail.prev = this.dummyHead;
    }

    _isFull() {
        return Object.keys(this.hashmap).length === this.capacity;
    }

    _removeNode(node) {
        node.prev.next = node.next;
        node.next.prev = node.prev;
        node.prev = null;
        node.next = null;
        return node;
    }

    _addToHead(node) {
        const head = this.dummyHead.next;
        node.next = head;
        head.prev = node;
        node.prev = this.dummyHead;
        this.dummyHead.next = node;
    }

    get(key) {
        if (key in this.hashmap) {
            const node = this.hashmap[key];
            this._addToHead(this._removeNode(node));
            return node.value;
        } else {
            return -1;
        }
    }

    put(key, value) {
        if (key in this.hashmap) {
            // If key exists, update the corresponding node and move it to the head.
            const node = this.hashmap[key];
            node.value = value;
            this._addToHead(this._removeNode(node));
        } else {
            // If it's a new key.
            if (this._isFull()) {
                // If the cache is full, remove the tail node.
                const node = this.dummyTail.prev;
                delete this.hashmap[node.key];
                this._removeNode(node);
            }
            // Create a new node and add it to the head.
            const node = new DoubleLinkedListNode(key, value);
            this.hashmap[key] = node;
            this._addToHead(node);
        }
    }
}

/**
 * Your LRUCache object will be instantiated and called as such:
 * var obj = new LRUCache(capacity)
 * var param_1 = obj.get(key)
 * obj.put(key,value)
 */