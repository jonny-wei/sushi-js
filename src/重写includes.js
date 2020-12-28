/**
 * 重写 inclueds
 *
 * Array.prototype.includes(valueToFind, fromIndex = 0): boolean
 *
 * 使用 includes()比较字符串和字符时是区分大小写。
 * 
 * fromIndex: 查找某个索引的值
 *
 * fromIndex < 0: fromIndex === fromIndex + arr.length
 * fromIndex + arr.length < 0 :如果计算出的索引小于 0，则整个数组都会被搜索。
 * fromIndex >= arr.length: 返回 false，且该数组不会被搜索。
 * 0 <= fromIndex < arr.length: 进行搜索
 * 
 * 缺点：无法找出引用类型数据
 * 
 */
Object.defineProperty(Array.prototype, "includes", {
  value: function (valueToFind, fromIndex) {
    const obj = Object(this);
    const len = obj.length >>> 0;
    const index = fromIndex | 0;
    if (len === 0) {
      return false;
    }

    let k = Math.max(index >= 0 ? index : len - Math.abs(index),0 );

    console.log(k)

    function sameValueZero(x,y){
        return x === y || (typeof x === 'number' && typeof y === 'number' && isNaN(x) && isNaN(y));
    }
    
    while(k < len){
        if(sameValueZero(obj[k],valueToFind)){
            return true;
        }
        k++;
    }
    return false; // fromIndex >= arr.length: 返回 false，且该数组不会被搜索。
  }
});

const arr = [1,2,NaN,null,undefined,{a:1},/a/,false]
console.log('重写inclueds ->',arr.includes(2))
console.log('重写inclueds ->',arr.includes(NaN))
console.log('重写inclueds ->',arr.includes(null))
console.log('重写inclueds ->',arr.includes(undefined))
console.log('重写inclueds ->',arr.includes(false))
console.log('重写inclueds ->',arr.includes({a:1})) // false
console.log('重写inclueds ->',arr.includes(/a/)) // false
