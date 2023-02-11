// 防抖
const debounce5 = (
  callback,
  time,
  options = { leading: true, context: null }
) => {
  let timer = null;
  let _debounce = (...args) => {
    // 如果 time 内又触发，清楚定时器，重新计时
    if (timer) {
      clearTimeout(timer);
    }
    // 首次进入 立刻执行
    if (options.leading && !timer) {
      timer = setTimeout(null, time);
      callback.apply(options.context, args);
    } else {
      timer = setTimeout(() => {
        callback.apply(options.context, args);
        timer = null;
      }, time);
    }
  };
  _debounce.cancel = () => {
    clearTimeout(timer);
    timer = null;
  };
  return _debounce;
};

// 节流
const throttle = (
  func,
  time,
  options = { leading: true, trailing: false, context: null }
) => {
  let previous = new Date(0).getTime;
  let timer = null;
  const _throttle = (...args) => {
    let now = new Date().getTime();

    if (!options.leading) {
      // 非首次进入,
      if (timer) return;
      timer = setTimeout(() => {
        timer = null;
        func.apply(options.context, args);
      }, time);
    } else if (now - previous > time) {
      // 时间到，立即执行
      func.apply(options.context, args);
      previous = now;
    } else if (options.trailing) {
      // 是否最后一次额外触发
      clearTimeout(timer);
      timer = setTimeout(() => {
        func.apply(options.context, args);
      }, time);
    }
  };
  _throttle.cancel = () => {
    previous = 0;
    clearTimeout(timer);
    timer = null;
  };

  return _throttle;
};
