require('dotenv').config();
const Koa = require('koa');
const bodyParser = require('koa-bodyparser');

const { setupMiddlewares, setupRouters } = require('../src/app/middlewares');
const { createUserInMemoryRepository } = require('../src/User/infra/gateways/inMemoryDatabase');
const { createCreateUserUseCase } = require('../src/User/usecases');
const { makeHashPassword } = require('../src/User/domain/contracts');

const injectDependencies = (env) => {
  const userRepository = createUserInMemoryRepository()
  const createUserUseCase = createCreateUserUseCase({
    jwtSecret: env.JWT_SECRET || 'jwt_secret',
    makeHashPasswordService: makeHashPassword,
    userRepository,
  })

  return {
    createUserUseCase,
    userRepository
  }
}

const app = new Koa();

app.use(bodyParser());

const di = injectDependencies(process.env)

setupMiddlewares(app);
setupRouters(app, di)

module.exports = {
  app,
  testsDependencies: di
}
