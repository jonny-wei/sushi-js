/**
 * 渲染万条数据
 *
 * 渲染大数据时，合理使用createDocumentFragment和requestAnimationFrame，将操作切分为一小段一小段执行。
 *
 * 文档碎片createDocumentFragment
 * DocumentFragments 是DOM节点。它们不是主DOM树的一部分。
 * 通常的用例是创建文档片段，将元素附加到文档片段，然后将文档片段附加到DOM树。
 * 在DOM树中，文档片段被其所有的子元素所代替。
 * 因为文档片段存在于内存中，并不在DOM树中，所以将子元素插入到文档片段时不会引起页面回流（对元素位置和几何上的计算）。
 * 因此，使用文档片段通常会带来更好的性能。
 *
 * window.requestAnimationFrame()
 * 告诉浏览器——你希望执行一个动画，并且要求浏览器在下次重绘之前调用指定的回调函数更新动画。
 * 该方法需要传入一个回调函数作为参数，该回调函数会在浏览器下一次重绘之前执行。
 * 若你想在浏览器下次重绘之前继续更新下一帧动画，那么回调函数自身必须再次调用window.requestAnimationFrame()
 */
setTimeout(() => {
  const total = 100000; // 插入10万条数据
  const once = 20; // 一次插入的数据
  const loopCount = Math.ceil(total / once); // 插入数据需要的次数
  let countOfRender = 0;
  const ul = document.querySelector("ul");
  function add() {
    const fragment = document.createDocumentFragment();
    for (let i = 0; i < once; i++) {
      const li = document.createElement("li");
      li.innerText = Math.floor(Math.random() * total);
      fragment.appendChild(li);
    }
    ul.appendChild(fragment);
    countOfRender += 1;
    loop();
  }
  function loop() {
    if (countOfRender < loopCount) {
      window.requestAnimationFrame(add); // 重绘
    }
  }
  loop();
}, 0);
