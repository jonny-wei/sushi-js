/**
 * 手写 lodash.get() 方法
 *
 * 在 js 中经常会出现嵌套调用这种情况，如 a.b.c.d.e，但是这么写很容易抛出异常。
 * 你需要这么写 a && a.b && a.b.c && a.b.c.d && a.b.c.d.e，但是显得有些啰嗦与冗长了。
 * 特别是在 graphql 中，这种嵌套调用更是难以避免。
 * 这时就需要一个 get 函数，使用 get(a, 'b.c.d.e') 简单清晰
 *
 * _.get(object, path(Array|string), [defaultValue])
 *
 * _.get({ 'a': [{ 'b': { 'c': 3 } }] }, 'a[0].b.c'); ==> 3
 * _.get({ 'a': [{ 'b': { 'c': 3 } }] }, ['a', '0', 'b', 'c']); ==> 3
 * _.get({ 'a': [{ 'b': { 'c': 3 } }] }, 'a.b.c', 'default'); ==> 'default'
 *
 * 有点对象反扁平化的味道
 * 
 * https://juejin.cn/post/6844903842996289550
 */
const get = function (object, path, defaultValue = undefined) {
  // path.replace(/\[(\d+)\]/g, ".$1") ==> a[0].b.c ->  a.0.b.c
  const paths = path.replace(/\[(\d+)\]/g, ".$1").split("."); // ["a", "0", "b", "c"]
  let result = object; // { a: [{ b: { c: 3 } }] }
  for (const key of paths) {
    // result[a] => result = [{ b: { c: 3 } }] => result[0] = { b: { c: 3 } } => ...
    result = Object(result)[key];
    if (result === undefined) {
      return defaultValue;
    }
  }
  return result;
};
// 测试
console.log(get({ a: [{ b: { c: 3 } }] }, "a[0].b.c", "哈哈哈"));