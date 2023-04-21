const { PrismaClient } = require('@prisma/client');
const { createUserRepository } = require('./src/User/infra/gateways/repository')
const { createCreateUserUseCase } = require('./src/User/usecases');
const { makeHashPassword } = require('./src/User/domain/contracts');

const injectDependencies = () => {
  const prisma = new PrismaClient();
  const userRepository = createUserRepository({ prisma })
  const createUserUseCase = createCreateUserUseCase({ userRepository, makeHashPasswordService: makeHashPassword })

  return {
    createUserUseCase
  }
}

module.exports = {
  injectDependencies
}