const { PrismaClient } = require('@prisma/client');
const { createUserRepository } = require('../User/infra/gateways/repository')
const { createCreateUserUseCase } = require('../User/usecases');
const { makeHashPassword } = require('../User/domain/contracts');

const injectDependencies = (env) => {
  const prisma = new PrismaClient();
  const userRepository = createUserRepository({ prisma })
  const createUserUseCase = createCreateUserUseCase({
    jwtSecret: env.JWT_SECRET || 'jwt_secret',
    makeHashPasswordService: makeHashPassword,
    userRepository,
  })

  return {
    createUserUseCase
  }
}

module.exports = {
  injectDependencies
}
