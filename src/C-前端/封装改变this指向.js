/**
 * 封装函数 f，使 f 的 this 指向指定的对象
 *
 * 就是手撕 bind
 */
function bindThis(f, oTarget) {
  let args = Array.prototype.slice.call(arguments, 2);
  return function () {
    return f.apply(oTarget, Array.prototype.slice.call(arguments).concat(args));
  };
}

function bindThis(thisArgs) {
  var fn = this,
    slice = Array.prototype.slice,
    args = slice.call(arguments, 1);
  return function () {
    return fn.apply(thisArgs, args.concat(slice.call(arguments)));
  };
}
