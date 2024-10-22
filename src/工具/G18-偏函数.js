/**
 * 偏函数 partial
 *
 * 指固定（或偏置）一个或多个参数的函数。在函数式编程中，偏函数通常用来创建一个新的函数，这个新函数在调用时只需要传入剩余的参数。
 * 
 * 偏函数和柯里化概念类似，个人认为它们区别在于
 * 偏函数会固定你传入的几个参数，再一次性接受剩下的参数，
 * 而函数柯里化会根据你传入参数不停的返回函数，直到参数个数满足被柯里化前函数的参数个数
 *
 * Function.prototype.bind 函数就是一个偏函数的典型代表，它接受的第二个参数开始，
 * 为预先添加到绑定函数的参数列表中的参数，与 bind 不同的是，上面的这个函数同样支持占位符
 */
function partial(fn, ...fixedArgs) {
  return function (...args) {
    return fn(...fixedArgs, ...args);
  };
}


const partial2 = (func, ...args) => {
  let placeholderNum = 0;
  return (...args2) => {
    args2.forEach((arg) => {
      let index = args.findIndex((item) => item === "_");
      if (index < 0) return;
      args[index] = arg;
      placeholderNum++;
    });
    if (placeholderNum < args2.length) {
      args2 = args2.slice(placeholderNum, args.length);
    }
    return func.apply(this, [...args, ...args2]);
  };
};

// 使用
const add = (a, b, c, d) => a + b + c + d;
const partialAdd1 = partial(add, 2);
console.log(partialAdd1(1, 3, 4)) // 10

const partialAdd2 = partial2(add, '_', 2, '_');
console.log(partialAdd2(1, 3, 4)) // 10
