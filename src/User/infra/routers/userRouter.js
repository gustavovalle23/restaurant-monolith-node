const Router = require('koa-router');
const { userController } = require('../controllers/userController');

const createUserRouter = (useCases) => {
  const router = new Router();

  const { createUser, updateUser, login } = userController({ ...useCases });

  router.put('/users', updateUser);
  router.post('/users', createUser);
  router.post('/users/login', login);

  return router;
};

module.exports = {
  createUserRouter
}
