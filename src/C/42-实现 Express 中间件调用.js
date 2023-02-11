// 实现一个简单的类似 Express 中间件串联函数 app.use，按照下面用例可以按顺序打印出 1 2 3 4 5 6
function express() {
  const middlewares = [];

  const app = () => {
    function next() {
      // your code
    }
    next();
  };

  app.use = (middleware) => {
    // your code
  };
  return app;
}

const app = express();
app.use((next) => {
  console.log(1);
  next();
  console.log(6);
});
app.use((next) => {
  console.log(2);
  next();
  console.log(5);
});
app.use((next) => {
  console.log(3);
  next();
  console.log(4);
});
app();

function express() {
  const middlewares = [];
  const app = function () {
    let i = 0;
    function next() {
      let task = middlewares[i++];
      if (!task) {
        return;
      }
      task(next);
    }
    next();
  };

  app.use = function (task) {
    middlewares.push(task);
  };

  return app;
}
