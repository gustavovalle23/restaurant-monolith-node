const Router = require('koa-router');
const { createUserController } = require('../controllers/userController');

const userRouter = new Router();
const userController = createUserController()

userRouter.post('/user/login', userController.login);

module.exports = userRouter
