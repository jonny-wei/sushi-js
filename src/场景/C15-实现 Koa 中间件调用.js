/**
 * Koa 中间件调用原理实现 简易版 Koa
 * 
 * 实现一个简单的类似 Koa 中间件串联函数 app.use，按照下面用例可以按顺序打印出 1 2 3 4 5 6
 */
function Koa() {
  const middlewares = [];

  const app = async (ctx) => {
    await dispatch(0, ctx);
  };

  app.use = (middleware) => {
    middlewares.push(middleware);
  };

  const dispatch = async (index, ctx) => {
    if (index === middlewares.length) return;

    const middleware = middlewares[index];
    await middleware(ctx, () => dispatch(index + 1, ctx));
  };

  return app;
}

// 创建 Koa 应用
const app = Koa();

// 注册中间件
app.use(async (ctx, next) => {
  console.log(1);
  await next();
  console.log(6);
});

app.use(async (ctx, next) => {
  console.log(2);
  await next();
  console.log(5);
});

app.use(async (ctx, next) => {
  console.log(3);
  await next();
  console.log(4);
});

// 模拟请求
const ctx = {
  req: {},
  res: {}
};

app(ctx).then(() => {
  console.log('All middlewares executed');
});
