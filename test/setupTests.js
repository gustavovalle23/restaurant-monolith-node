require('dotenv').config();
const Koa = require('koa');
const bodyParser = require('koa-bodyparser');

const { setupMiddlewares, setupRouters } = require('../src/app/middlewares');
const { createUserInMemoryRepository } = require('../src/User/infra/gateways/inMemoryDatabase');
const { createCreateUserUseCase, createLoginUserCase } = require('../src/User/usecases');
const { makeHashPassword } = require('../src/User/domain/contracts');

const injectDependencies = (env) => {
  const userRepository = createUserInMemoryRepository()
  const createUserUseCase = createCreateUserUseCase({
    jwtSecret: env.JWT_SECRET || 'jwt_secret',
    makeHashPasswordService: makeHashPassword,
    userRepository,
  })


  const loginUseCase = createLoginUserCase({
    userRepository,
    jwtSecret: env.JWT_SECRET || 'jwt_secret',
  })

  return {
    loginUseCase,
    userRepository,
    createUserUseCase,
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
