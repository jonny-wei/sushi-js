/**
 * 实现鼠标点击页面任意标签，alert 打印该标签名称
 *
 */

function elementName(event) {
  event = event || window.event;
  let selected = event.target || event.srcElement;
  console.log(selected);
  let eleName =
    selected && selected.tagName
      ? selected.tagName.toLowerCase()
      : "no tagName";
  alert(eleName);
}
window.onload = function () {
  let el = document.getElementsByTagName("body");
  el[0].onclick = elementName;
};
