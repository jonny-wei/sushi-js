// 改变 this 
const bindThis = function(fn, target) {
    const args = Array.prototype.slice.call(arguments, 2);
    return function(){
        return fn.apply(target, Array.prototype.slice.call(arguments).concat(args));
    }
}