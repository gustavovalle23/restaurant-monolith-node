const createUserController = () => {
  const login = (ctx) => {
    ctx.body = {
      username: ctx.request.body.username,
      password: ctx.request.body.password
    };
  }

  return {
    login,
  }
}

module.exports = {
  createUserController,
}
