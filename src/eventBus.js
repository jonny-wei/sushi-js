/**
 * events：事件注册中心 events = [{eventName: '', listeners: []},{}]
 * MyEvent：一个实例一组同类(eventName)事件的回调任务队列(listeners)
 * eventName：回调函数名(类型)
 * listeners：回调队列
 */

 const events = [];

 function on(eventName, callback) {
   let event = events.find(x => x.eventName === eventName);
   if (event) {
     // 如果已有该事件，添加到监听者中
     event.addListener(callback);
   } else {
     // 如果没有该事件，则添加新事件，并添加到监听者
     event = new MyEvent(eventName);
     event.addListener(callback);
     events.push(event);
   }
 }
 
 function emit(eventName, ...params) {
   let event = events.find(x => x.eventName === eventName);
   // 如果已有该事件，则触发
   if (event) {
     event.trigger(...params);
   }
 }
 
 class MyEvent {
   constructor(eventName) {
     // 创建一个事件，传入事件名
     this.eventName = eventName;
     // 同时动态生成一个监听者管理
     this.listeners = [];
   }
   // 触发事件，传入参数
   trigger(...params) {
     // 遍历监听者，触发回调
     this.listeners.forEach(x => {
       x(...params);
     });
   }
   // 添加监听者
   addListener(callback) {
     this.listeners.push(callback);
   }
 }
 export default {
   on,
   emit
 };