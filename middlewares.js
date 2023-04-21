const { PrismaClient } = require("@prisma/client");
const { createUserRouter } = require("./src/User/infra/routers/userRouter");

const prisma = new PrismaClient();

module.exports.setupMiddlewares = (app) => {
  app.use(async (ctx, next) => {
    await next();
    const rt = ctx.response.get('X-Response-Time');
    console.log(`${ctx.method} ${ctx.url} - ${rt}`);
  })

  app.use(async (ctx, next) => {
    ctx.prisma = prisma;
    await next();
  });

  app.use(async (ctx, next) => {
    const start = Date.now();
    await next();
    const ms = Date.now() - start;
    ctx.set('X-Response-Time', `${ms}ms`);
  });
}

module.exports.setupRouters = (app, di) => {
  const userRouter = createUserRouter({ createUserUseCase: di.createUserUseCase })
  app.use(userRouter.routes());
  app.use(userRouter.allowedMethods());
}
