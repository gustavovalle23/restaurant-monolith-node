const { createUser } = require('../domain/entities')

const createCreateUserUseCase = ({ userRepository, makeHashPasswordService }) => {
  const execute = async ({ name, email, password, birthDate, address }) => {
    const hashedPassword = await makeHashPasswordService(password)

    const user = createUser({
      name, email, password: hashedPassword, birthDate, address
    })

    const savedUser = await userRepository.save({
      user,
    })

    if (!savedUser) throw new Error('Unknow error when try create user')

    return {
      id: savedUser.id,
      name: savedUser.name,
      email: savedUser.email,
      birthDate: savedUser.birthDate,
      address: savedUser.address,
    }
  }

  return {
    execute,
  }
}

module.exports = {
  createCreateUserUseCase
}
