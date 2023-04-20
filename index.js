const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const { userRouter } = require('./src/User/api');

const app = new Koa();

app.use(bodyParser());

app.use(async (ctx, next) => {
  await next();
  const rt = ctx.response.get('X-Response-Time');
  console.log(`${ctx.method} ${ctx.url} - ${rt}`);
})

app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  ctx.set('X-Response-Time', `${ms}ms`);
});

app.use(userRouter.routes());
app.use(userRouter.allowedMethods());

app.listen(3000);
