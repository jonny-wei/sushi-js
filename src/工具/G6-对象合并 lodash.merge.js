/**
 * 实现 lodash.merge(object, [sources]) sources -> (...Object)
 * 
 * _.assign 函数用于将一个或多个源对象的所有可枚举属性复制到目标对象。它将源对象的属性复制到目标对
 * 的顶层，如果存在相同的属性，则后面的源对象的属性将覆盖前面的源对象的属性。如果目标对象和源对象有
 * 同的属性，源对象的属性值将覆盖目标对象的属性值。_.assign 不会递归合并对象。
 * 
 * _.merge 函数用于递归地合并两个或多个对象的属性到目标对象。当遇到相同的属性，并且这些属性的值都是
 * 对象时，_.merge 会递归地合并这些对象，而不是简单地覆盖。这意味着 _.merge 可以处理嵌套对象的合并。
 *
 *
 * 应用场景：
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
const object = {
  a: [{ b: 2 }, { d: 4 }],
};

const other = {
  a: [{ c: 3 }, { e: 5 }],
};

merge(object, other);
// => { 'a': [{ 'b': 2, 'c': 3 }, { 'd': 4, 'e': 5 }] }
