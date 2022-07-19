/** 实现数据双向绑定，⽀持唯⼀指令 v-text
 * el 代表根元素，data 中的字段会⾃动和 DOM 中 v-text 属性对应元素内容绑定:
 * 1) data中各个字段的值会在初始化时填充给到使⽤了v-text指令的innerText中
 * 2）当data中对应字段发⽣变化后，DOM会对应更新
 **/
function ViewBind({ data = {}, el = "" } = {}) {
  this.data = {};
  const compiler = ($node) => {
    if (!$node) return;
    watcher($node, "v-text");
    for (let $child of $node.children) {
      compiler($child);
    }
  };
  const watcher = ($node, directive) => {
    const key = $node.getAttribute(directive);
    if (key) {
      $node.innerText = data[key];
      Object.defineProperty(this.data, key, {
        configurable: true,
        enumerable: true,
        get: () => data[key],
        set: (val) => (data[key] = $node.innerText = val),
      });
    }
  };
  compiler(document.querySelector(el));
}

/**
 * step: 1
 * 调⽤⽅式类似 Vue 初始化，
 **/
const app = new ViewBind({
  el: "#app",
  data: {
    title: "这是标题",
    time: +new Date(),
  },
});

/**
   * step: 2
   * 初始化之后⻚⾯#app显示效果如下：
    <div id="app">
     <h1 v-text="title">这是标题</h1>
     <p>当前时间戳：<span v-text="time">1522070099060</span></p>
   </div>
   * 类似于 Vue，初始化之后 app 内部有⼀个 data 对象，
   * 通过修改 data 对象的属性来间接修改 DOM 中挂载了对应 v-text 属性的元素内容
   **/
setInterval(() => {
  // 定时修改⻚⾯上<span v-text="time">元素中的内容
  app.data.time = +new Date();
}, 1000);
/**
 * step3: 请实现上述 ViewBind ⽅法
 * 提示：可参考 Vue 中响应式数据绑定和指令的实现原理
 **/
