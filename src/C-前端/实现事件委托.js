/**
 * 实现事件委托
 *
 * 事件委托就是利用事件冒泡，只指定一个事件处理程序，就可以管理某一类型的所有事件。
 * 当用事件委托的时候，根本就不需要去遍历元素的子节点，只需要给父级元素添加事件就好了，
 * 其他的都是在js里面的执行，这样可以大大的减少 dom 操作，这才是事件委托的精髓所在。
 *
 * 事件委托的优点
 * 1. 只需要将同类元素的事件委托给父级或者更外级的元素，不需要给所有的元素都绑定事件，减少内存占用空间，提升性能。
 * 2. 动态新增的元素无需重新绑定事件
 *
 * 需要注意的点
 * 1. 事件委托的实现依靠的冒泡，因此不支持事件冒泡的事件就不适合使用事件委托。
 * 2. 不是所有的事件绑定都适合使用事件委托，不恰当使用反而可能导致不需要绑定事件的元素也被绑定上了事件。
 * 3. 事件委托也是有一定局限性，比如 focus、blur 之类的事件本身没有事件冒泡机制，所以无法委托
 * 4. mousemove、mouseout 这样的事件，虽然有事件冒泡，但是只能不断通过位置去计算定位，对性能消耗高，因此也是不适合于事件委托的。
 */
function on(eventType, elDelegate, selector, fn) {
  if (!(elDelegate instanceof Element) && typeof elDelegate === "string") {
    elDelegate = document.querySelector(elDelegate);
  }
  elDelegate.addEventListener(eventType, (e) => {
    let el = e.target;
    while (!el.matches(selector)) {
      // 注意：matches接收的是CSS选择器
      if (elDelegate === el) {
        el = null;
        break;
      }
      el = el.parentNode;
    }
    el && fn.call(el, e, el);
  });
  return elDelegate;
}
// 使用方式
on("click", "div", "#btn1", fn);

/**
 *
 * @param {*} parentSelector 一个选择器字符串用于过滤需要实现代理的父层元素，既事件需要被真正绑定之上
 * @param {*} targetSelector 一个选择器字符串用于过滤触发事件的选择器元素的后代，既我们需要被代理事件的元素
 * @param {*} events  一个或多个用空格分隔的事件类型和可选的命名空间，如 click 或 keydown.click
 * @param {*} foo 需要代理事件响应的函数
 * 这里就有几个关键点：
 * 对于父层代理的元素可能有多个，需要一一绑定事件；
 * 对于绑定的事件类型可能有多个，需要一一绑定事件；
 * 在处理匹配被代理的元素之中需要考虑到兼容性问题；
 * 在执行所绑定的函数的时候需要传入正确的参数以及考虑到 this 的问题；
 *
 * http://caibaojian.com/eventdelegate.html
 */
function eventDelegate(parentSelector, targetSelector, events, foo) {
  // 触发执行的函数
  function triFunction(e) {
    // 兼容性处理
    var event = e || window.event;

    // 获取到目标阶段指向的元素
    var target = event.target || event.srcElement;

    // 获取到代理事件的函数
    var currentTarget = event.currentTarget;

    // 处理 matches 的兼容性
    if (!Element.prototype.matches) {
      Element.prototype.matches =
        Element.prototype.matchesSelector ||
        Element.prototype.mozMatchesSelector ||
        Element.prototype.msMatchesSelector ||
        Element.prototype.oMatchesSelector ||
        Element.prototype.webkitMatchesSelector ||
        function (s) {
          var matches = (this.document || this.ownerDocument).querySelectorAll(
              s
            ),
            i = matches.length;
          while (--i >= 0 && matches.item(i) !== this) {}
          return i > -1;
        };
    }

    // 遍历外层并且匹配
    while (target !== currentTarget) {
      // 判断是否匹配到我们所需要的元素上
      if (target.matches(targetSelector)) {
        var sTarget = target;
        // 执行绑定的函数，注意 this
        foo.call(sTarget, Array.prototype.slice.call(arguments));
      }

      target = target.parentNode;
    }
  }

  // 如果有多个事件的话需要全部一一绑定事件
  events.split(".").forEach(function (evt) {
    // 多个父层元素的话也需要一一绑定
    Array.prototype.slice
      .call(document.querySelectorAll(parentSelector))
      .forEach(function ($p) {
        $p.addEventListener(evt, triFunction);
      });
  });
}
// 使用
eventDelegate("#list", "li", "click", function () {
  console.log(this);
});
