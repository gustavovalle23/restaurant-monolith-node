const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');
const { InvalidLoginCredentialsError } = require('../domain/errors');

const createLoginUserCase = ({ userRepository, jwtSecret }) => {
  const execute = async ({ email, password }) => {
    const user = await userRepository.findByEmail(email);
    if (!user) throw new InvalidLoginCredentialsError()

    const isValid = await bcrypt.compare(password, user.password)
    if (!isValid) throw new InvalidLoginCredentialsError()

    const token = jwt.sign({ userId: user.id }, jwtSecret, { expiresIn: '1h' })
    const refreshToken = jwt.sign({ userId: user.id }, jwtSecret, { expiresIn: '7d' });

    return {
      token,
      refreshToken
    }
  }

  return {
    execute,
  }
}

module.exports = {
  createLoginUserCase,
}
