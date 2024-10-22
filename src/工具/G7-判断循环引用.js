/**
 * 判断循环引用 isCycleObject
 * 
 * 循环引用指的是两个或多个对象相互引用，形成一个闭合的引用环。这在处理 JSON 序列化、深拷贝或垃圾回收时可能会引起问题。
 *
 * 循环引用对象本来没有什么问题，序列化的时候才会发生问题，
 * 比如调用 JSON.stringify() 对该类对象进行序列化，
 * 就会报错: Converting circular structure to JSON.
 * 比如发起一个ajax请求提交一个对象就需要对对象进行序列化。
 * 
 * 第三方库：
 * JSON.decycle() 方法用于安全地序列化包含循环引用的对象，
 * JSON.retrocycle() 方法用于将带有特殊标记的字符串反序列化回原始对象。
 */

const isCycleObject1 = (obj, parent) => {
  const parentArr = parent || [obj];
  // 遍历一层对象
  for (let key in obj) {
    // 判断是否是对象
    if (typeof obj[key] === "object") {
      let isCycle = false; // flag 初始化为 false 非循环引用对象
      /**
       * 遍历数组中每一项一层对象 判断是否与 obj[key] 相等
       * 相等，循环引用了 返回 true 结束循环
       * 否则 递归继续比较下一层
       * 需注意的是 parentArr = [...parentArr, obj[key]] 包含每一层的对象
       */
      parentArr.forEach((pObj) => {
        if (pObj === obj[key]) {
          isCycle = true;
        }
      });
      if (isCycle) return true;
      isCycle = isCycleObject(obj[key], [...parentArr, obj[key]]);
      if (isCycle) return true;
    }
  }
  return false;
};

// 测试用例
const a = { b: { c: 1 } };
a.b.c = a;
console.log(isCycleObject1(a));

/**
 * 方法二 （推荐）
 * 利用 WeakSet
 * @param {*} obj 
 * @returns 
 */
function isCycleObject2(obj) {
  const seenObjects = new WeakSet();

  function detect(obj) {
    if (obj && typeof obj === 'object') {
      if (seenObjects.has(obj)) {
        return true; // 已经看到过这个对象，所以是循环引用
      }
      seenObjects.add(obj); // 标记这个对象为已见
      for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key) && detect(obj[key])) {
          return true; // 递归检查对象的属性
        }
      }
    }
    return false;
  }

  return detect(obj);
}

// 使用示例
const obj1 = {};
const obj2 = {};
obj1.someProp = obj2;
obj2.someProp = obj1; // 这创建了一个循环引用

console.log(isCycleObject1(obj1)); // 输出：true