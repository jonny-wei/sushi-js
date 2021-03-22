/**
 * 单链表，双链表，循环链表
 *
 * 链表不需要连续的内存空间，它是由一组零散的内存块透过指针连接而成，
 * 所以，每一个块中必须包含当前节点内容以及后继指针。
 * 最常见的链表类型有单链表、双链表以及循环链表。
 */

/**
 * 单链表
 */
function List() {
  // 节点类型
  let Node = function (element) {
    this.element = element;
    this.next = null;
  };
  // 初始头节点
  let head = null;
  // 链表长度
  let length = 0;
  // 链表操作
  this.getList = function () {
    return head;
  };
  this.search = function (list, element) {};
  this.append = function (element) {};
  this.insert = function (position, element) {};
  this.remove = function (element) {};
  this.isEmpty = function () {};
  this.size = function () {};
}

/**
 * 双链表
 */
function DoublyLinkedList() {
  let Node = function (element) {
    this.element = element;
    // 前驱指针
    this.prev = null;
    // 后继指针
    this.next = null;
  };
  // 初始头节点为 null
  let head = null;
  // 新增尾节点
  let tail = null;

  // 链表长度
  let length = 0;
  // 操作
  this.search = function (element) {};
  this.insert = function (position, element) {};
  this.removeAt = function (position) {};
  this.isEmpty = function () {
    return length === 0;
  };
  this.size = function () {
    return length;
  };
}

/**
 * 循环单链表
 */
function CircularLinkedList() {
  let Node = function (element) {
    this.element = element;
    // 后继指针
    this.next = null;
  };
  // 初始头节点为 null
  let head = null;

  // 链表长度
  let length = 0;
  // 操作
  this.search = function (element) {};
  this.insert = function (positon, element) {};
  this.removeAt = function (position) {};
  this.isEmpty = function () {
    return length === 0;
  };
  this.size = function () {
    return length;
  };
}
