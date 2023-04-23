const userController = ({ createUserUseCase, loginUseCase }) => {
  const createUser = async (ctx) => {
    const { name, email, password, birthDate, address } = ctx.request.body;

    const user = await createUserUseCase.execute({ name, email, password, birthDate, address });

    ctx.body = user;
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
  }
}

module.exports = {
  userController,
}
