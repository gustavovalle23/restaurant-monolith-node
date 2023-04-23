const Router = require('koa-router');
const { userController } = require('../controllers/userController');

const createUserRouter = ({ createUserUseCase, loginUseCase }) => {
  const router = new Router();

  const { createUser, login } = userController({ createUserUseCase, loginUseCase });

  router.post('/users', createUser);
  router.post('/users/login', login);

  return router;
};

module.exports = {
  createUserRouter
}
