/**
 * sleep 函数
 *
 */

/**
 * 使用 setTimeout
 */
 let fun = () => console.log('time out');
 let sleep = function(fun,time){
   setTimeout(()=>{
     fun();
   },time);
 }
 sleep(fun,2000)

/**
 * 使用 Promise
 * @param {*} time
 */
function sleep(time) {
  return new Promise(function (resolve) {
    setTimeout(resolve, time);
  });
}
// 使用
sleep(1000).then(() => {
  console.log(1);
});

/**
 * 使用 Generator
 * @param {*} time
 */
function* sleepGenerator(time) {
  yield new Promise(function (resolve, reject) {
    setTimeout(resolve, time);
  });
}
// 使用
sleepGenerator(1000)
  .next()
  .value.then(() => {
    console.log(1);
  });

/**
 * 使用 async/await
 * @param {*} time
 */
function sleep(time) {
  return new Promise((resolve) => {
    setTimeout(resolve, time);
  });
}

async function output(time) {
  let out = await sleep(time);
  return out;
}

output(1000);
