const Router = require('koa-router');
const userRouter = new Router();

userRouter.post('/user/login', async (ctx) => {
  ctx.body = {
    username: ctx.request.body.username,
    password: ctx.request.body.password
  };
});

module.exports = {
  userRouter
};
