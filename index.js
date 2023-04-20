const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');


const app = new Koa();
const router = new Router();

app.use(bodyParser());

router.post('/user/login', async (ctx) => {
  ctx.body = {
    username: ctx.request.body.username,
    password: ctx.request.body.password
  };
});

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

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(3000);
