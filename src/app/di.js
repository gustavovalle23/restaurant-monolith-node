const { PrismaClient } = require('@prisma/client');
const { createUserRepository } = require('../User/infra/gateways/repository')
const { createCreateUserUseCase } = require('../User/usecases');
const { makeHashPassword } = require('../User/domain/contracts');

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