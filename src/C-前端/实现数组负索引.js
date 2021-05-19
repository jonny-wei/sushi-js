/**
 * 实现数组负索引
 * 
 * 思路：
 * 使用ES6 的Proxy实现数组负索引。
 * 负索引：例如，可以简单地使用 arr[-1] 替代 arr[arr.length-1] 访问最后一个元素，[-2] 访问倒数第二个元素，以此类推
 */

 const proxyArray = arr => {
    const length = arr.length;
    return new Proxy(arr, {
        get(target, key) {
            key = +key;
            while (key < 0) {
                key += length;
            }
            return target[key];
        }
    })
};
var a = proxyArray([1, 2, 3, 4, 5, 6, 7, 8, 9]);
console.log(a[1]);  // 2
console.log(a[-10]);  // 9
console.log(a[-20]);  // 8