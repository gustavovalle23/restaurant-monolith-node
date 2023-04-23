const { createLoginUserCase } = require("../../../src/User/usecases")
const { createUserInMemoryRepository } = require('../../../src/User/infra/gateways/inMemoryDatabase')

describe('Login Use Case Unit Test', () => {
  const jwtSecret = 'jwt_secret'
  const user = {
    id: 1,
    password: '$2b$10$oSSOJqWLynjlS32zaeeb0.gs5TxXekQT2U9RF/pSZpJcpG8QiaxOa' // password
  }
  const userRepository = createUserInMemoryRepository()
  const userRepositorySpy = jest.spyOn(userRepository, 'findByEmail')
  const useCase = createLoginUserCase({ userRepository, jwtSecret })

  beforeEach(() => {
    jest.resetAllMocks()
  })

  it('Should return token and refreshToken with valid credentials', async () => {
    userRepositorySpy.mockReturnValueOnce(user)

    const response = await useCase.execute({ email: 'test@email.com', password: 'password' })
    expect(userRepositorySpy).toBeCalledTimes(1)
    expect(response).toMatchObject({
      refreshToken: expect.any(String),
      token: expect.any(String)
    })
  })

  it('Should return token and refreshToken with invalid email', async () => {
    userRepositorySpy.mockReturnValueOnce(null)

    await expect(useCase.execute({
      email: 'invalid@email.com', password: 'password'
    })).rejects.toThrow('User Not Found with provided credentials')

    expect(userRepositorySpy).toBeCalledTimes(1)

  })

  it('Should return token and refreshToken with invalid password', async () => {
    userRepositorySpy.mockReturnValueOnce(user)

    await expect(useCase.execute({
      email: 'test@email.com', password: 'invalid'
    })).rejects.toThrow('User Not Found with provided credentials')

    expect(userRepositorySpy).toBeCalledTimes(1)

  })
})
