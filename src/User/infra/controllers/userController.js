const jwt = require('jsonwebtoken');

const userController = ({ createUserUseCase, updateUserUseCase, loginUseCase }) => {
  const createUser = async (ctx) => {
    const { name, email, password, birthDate, address } = ctx.request.body;

    const user = await createUserUseCase.execute({ name, email, password, birthDate, address });

    ctx.body = user;
  };

  const updateUser = async (ctx) => {
    const { name, birthDate, address } = ctx.request.body;
    const token = ctx.headers.authorization.replace('Bearer ', '');

    try {
      const decoded = jwt.verify(token, secretKey);
      const userId = decoded.userId;
      const user = await updateUserUseCase.execute({ userId, name, birthDate, address });

      ctx.body = user;
    } catch (err) {
      ctx.status = 401;
      ctx.body = { error: 'Invalid credentials' };
    }
  };


  const login = async (ctx) => {
    const { email, password } = ctx.request.body;

    const { token, refreshToken } = await loginUseCase.execute({ email, password })

    ctx.body = {
      token,
      refreshToken,
    };
  }

  return {
    login,
    createUser,
    updateUser,
  }
}

module.exports = {
  userController,
}
