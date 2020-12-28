/**
 * 二位数组排序
 * Array.prototype.entries() + sort()
 * 
 * 迭代器
 * Array.prototype.entries() 
 * 一个新的 Array 迭代器对象。
 * Array Iterator是对象，它的原型（__proto__:Array Iterator）上有一个next方法，
 * 可用用于遍历迭代器取得原数组的[key,value]。
 * iterator.next()返回一个对象，对于有元素的数组，是next{ value: Array(2), done: false }；
 * next.done 用于指示迭代器是否完成：在每次迭代时进行更新而且都是false，
 * 直到迭代器结束done才是true。
 * next.value是一个["key","value"]的数组，是返回的迭代器中的元素值。
 * 
 * 二位数组排序原则
 * 首先比较每个二维数组的第一项，然后比较二维数组的第二项，依次类推
 */

var arr = [[1,34],[456,2,3,44,234],[4567,1,4,5,6],[34,78,23,1]];

function sortTwoArr(arr){
    let goNext = true;
    let entries = arr.entries();
    while(goNext){
        let result = entries.next();
        if(result.done !== true){
            result.value[1].sort((a,b) => a - b);
            goNext = true;
        }else{
            goNext = false;
        }
    }
    return arr
}
console.log('二位数组排序 ->', sortTwoArr(arr));