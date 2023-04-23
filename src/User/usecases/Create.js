const { createUser } = require('../domain/entities')
const jwt = require('jsonwebtoken')

const createCreateUserUseCase = ({ userRepository, makeHashPasswordService, jwtSecret }) => {
  const execute = async ({ name, email, password, birthDate, address }) => {
    const hashedPassword = await makeHashPasswordService(password)

    const user = createUser({
      name, email, password: hashedPassword, birthDate, address
    })

    const savedUser = await userRepository.createUser({
      user,
    })

    if (!savedUser) throw new Error('Unknow error when try create user')

    const token = jwt.sign({ userId: savedUser.id }, jwtSecret, { expiresIn: '1h' })

    return {
      id: savedUser.id,
      name: savedUser.name,
      email: savedUser.email,
      birthDate: savedUser.birthDate,
      address: savedUser.address,
      token
    }
  }

  return {
    execute,
  }
}

module.exports = {
  createCreateUserUseCase
}
