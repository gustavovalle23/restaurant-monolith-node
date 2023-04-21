const userController = ({ createUserUseCase }) => {
  const createUser = async (ctx) => {
    const { name, email, password, birthDate, address } = ctx.request.body;

    const user = await createUserUseCase.execute({ name, email, password, birthDate, address });

    ctx.body = user;
  };


  const login = (ctx) => {
    ctx.body = {
      username: ctx.request.body.username,
      password: ctx.request.body.password
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
