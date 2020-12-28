/**
 * 手撕节流 throttle
 *
 * throttle(func,wait): function
 *
 * 闭包，高阶函数的应用 推荐 throttle2
 *
 * 定义：函数节流 throttle 指某个函数在一定时间间隔内执行一次，
 * 在这个时间间隔内将无视后来产生的函数调用请求。
 * 持续触发事件，每隔一段时间，只执行一次事件。
 *
 * 原理：节流的实现，有两种主流的实现方式，一种是使用时间戳，一种是设置定时器。
 * (1)根据首次是否执行以及结束后是否执行，效果有所不同，实现的方式也有所不同。
 * (2)使用时间戳的实现原理：使用时间戳，当触发事件的时候，我们取出当前的时间戳，然后减去之前的时间戳(最一开始值设为0)，
 * 如果大于设置的时间周期，就执行函数，然后更新时间戳为当前的时间戳，如果小于，就不执行。
 * (3)使用定时器的实现原理：当触发事件的时候，我们设置一个定时器，再触发事件的时候，
 * 如果定时器存在，就不执行，直到定时器执行，然后执行函数，清空定时器，这样就可以设置下个定时器。
 *
 * 比较两个方法：
 * 第一种事件会立刻执行，第二种事件会在 n 秒后第一次执行。
 * 第一种事件停止触发后没有办法再执行事件，第二种事件停止触发后依然会再执行一次事件。
 *
 * 应用：监听滚动事件添加节流函数后，每隔固定的一段时间执行一次;鼠标不断点击触发
 */

function test(count) {
    console.log("手撕 throttle", count);
    return 1;
  }

/**
 * 第一版
 *
 * 使用时间戳
 */
function throttle1(callback,wait) {
    let previous = 0; 
    return function() {
        let now = +new Date();
        if (now - previous > wait) { // 当前时间戳 - 初始时间戳 > wait(时间间隔)
            callback.apply(this, arguments);
            previous = now; // 更新为当前时间戳
        }
    }
}

/**
 * 第二版
 *
 * 使用定时器
 */
function throttle2(callback,wait) {
    let timer = null;
    return function() {
        if(!timer){
            timer = setTimeout(function() {
                timer = null;
                callback.apply(this, arguments);
            },wait);
        }
    }
}

/**
 * 第三版（结合版）
 * 
 * 比较这两种方法：
 * （a）第一种事件会立刻执行，第二种事件会在n秒后第一次执行（有头与无头）
 * （b）第一种事件停止触发后没有办法再次触发事件，第二种事件触发后依然可以再执行一次事件（无尾与有尾））
 * 结合优点，有头有尾，就是鼠标移入能立刻执行，停止触发的时候还能再执行一次，并且处理返回值。
 */
function throttle3(callback,wait) {
    let previous = 0;
    let timer = null;
    let context = this;
    let args = arguments;
    let now = 0;
    let remaining = 0;
    const later = function() {
        previous = +new Date();
        timer = null;
        callback.apply(context, args)
    };
    const throttled = function(){
        now = +new Date();
        remaining = wait - (now - previous); // 下次触发 callback 剩余的时间
        if (remaining <= 0 || remaining > wait) { // 没有剩余时间了
            if (timer) {
                clearTimeout(timer);
                timer = null;
            }
            previous = now;
            callback.apply(context, args);
        } else if (!timer) {
            timer = setTimeout(later, remaining);
        }
    }
    return throttled
}
throttle3(test,1000)()
/**
 * 第四版
 * 
 * 增加标志位(控制有头有尾)
 * 
 * leading：false 表示禁用第一次执行
 * trailing: false 表示禁用停止触发的回调
 */
function throttle4(callback,wait,options) {
    let previous = 0;
    let timer = null;
    let context = this;
    let args = arguments;
    let now = 0;
    let remaining = 0;
    if (!options) options = {};
    const later = function() {
        previous = options.leading === false ? 0 : new Date().getTime();
        timer = null;
        callback.apply(context, args);
        if (!timer) context = args = null;
    };

    const throttled = function(){
        now = new Date().getTime();;
        remaining = wait - (now - previous); // 下次触发 callback 剩余的时间
        if (!previous && options.leading === false) previous = now;
        var remaining = wait - (now - previous);
        if (remaining <= 0 || remaining > wait) { // 没有剩余时间了
            if (timer) {
                clearTimeout(timer);
                timer = null;
            }
            previous = now;
            callback.apply(context, args);
            if (!timer) context = args = null;
        } else if (!timer) {
            timer = setTimeout(later, remaining);
        }
    }
    return throttled
}