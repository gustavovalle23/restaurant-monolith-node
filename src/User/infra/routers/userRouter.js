const Router = require('koa-router');
const { userController } = require('../controllers/userController');

const createUserRouter = ({ createUserUseCase }) => {
  const router = new Router();

  const { createUser, login } = userController({ createUserUseCase });

  router.post('/users', createUser);
  router.post('/users/login', login);

  return router;
};

module.exports = {
  createUserRouter
}
