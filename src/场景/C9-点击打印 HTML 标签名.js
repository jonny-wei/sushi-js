/**
 * 点击打印 HTML 标签
 * 
 * 实现鼠标点击页面任意标签，alert 打印该标签名称
 * 
 * 使用 JavaScript 为整个文档添加一个事件监听器。当用户点击页面上的任意元素时，可以通过事件对象获取点击的元素，并显示其标签名称
 *
 */

// 页面加载完成后，为 body 添加点击事件监听器
window.onload = function () {
  let el = document.getElementsByTagName("body")[0];
  el.onclick = elementName;
};

/**
 * 获取点击元素的标签名并弹出
 * @param {*} event 
 */
function elementName(event) {
  event = event || window.event;
  let selected = event.target || event.srcElement;
  console.log(selected);
  let eleName = selected && selected.tagName ? selected.tagName.toLowerCase() : "no tagName";
  alert(eleName);
}
