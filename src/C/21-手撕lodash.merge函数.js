/**
 * 手写lodash.merage函数
 *
 * _.merge(object, [sources]) sources -> (...Object)
 *
 * 以递归方式将源对象自己的和继承的可枚举的字符串键控属性合并到目标对象中
 * undefined如果存在目标值，则将解析为的源属性。
 * 数组和普通对象属性以递归方式合并。
 * 其他对象和值类型被赋值覆盖。
 * 源对象从左到右应用。后续源将覆盖先前源的属性分配。
 *
 * 注意：此方法会发生变化 object。
 *
 *
 *
 *
 * 应用场景：
 * merge 用来递归合并对象，相当于深层的 Object.assign。
 * 在 graphql 中会广泛用到 merge，如会经常使用 merge 来合并所有的 resolver
 *
 * 在前端进行 graphql 的查询时也经常需要使用到 merge。
 * 如在进行页面的性能优化时，为了避免一个 Query 耗时过久，
 * 页面渲染过于耗时，会拆成两个 Query，先渲染响应快的数据，在慢慢等待个别响应慢的数据。
 */
function isObject(value) {
  const type = typeof value;
  return value !== null && (type === "object" || type === "function");
}
const merge = function (object, sources) {
  if (!isObject(object) || !isObject(sources)) {
    return sources === undefined ? object : sources;
  }
  // 合并两个对象的 key，另外要区分数组的初始值为 []
  return Object.keys({ ...object, ...sources }).reduce(
    (acc, key) => {
      acc[key] = merge(object[key], sources[key]);
      return acc;
    },
    Array.isArray(sources) ? [] : {}
  );
};

// 测试
var object = {
    a: [{ b: 2 }, { d: 4 }],
  };
  
  var other = {
    a: [{ c: 3 }, { e: 5 }],
  };
  
  _.merge(object, other);
  // => { 'a': [{ 'b': 2, 'c': 3 }, { 'd': 4, 'e': 5 }] }
