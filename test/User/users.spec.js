const supertest = require('supertest');
const { app, testsDependencies } = require('../setupTests');

describe('POST /users', () => {
  const request = supertest(app.callback());

  const userRepository = testsDependencies.userRepository
  const createUserSpy = jest.spyOn(userRepository, 'createUser');

  beforeEach(() => {
    jest.resetAllMocks()
  })

  it('should create a new user and return the created user object', async () => {
    const response = await request.post('/users').send({
      name: 'John',
      email: 'john@example.com',
      password: 'password',
      birthDate: '1990-01-01',
      address: {
        country: 'BR', state: 'SP', street: 'Street 12', number: 23
      },
    });

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      id: 1,
      name: 'John',
      email: 'john@example.com',
      birthDate: '1990-01-01',
      token: expect.any(String),
      address: {
        country: 'BR', state: 'SP', street: 'Street 12', number: 23
      }
    });

    expect(createUserSpy).toHaveBeenCalledWith({
      user: {
        id: expect.any(String),
        name: 'John',
        email: 'john@example.com',
        password: expect.any(String),
        birthDate: '1990-01-01',
        isActive: true,
        address: {
          country: 'BR', state: 'SP', street: 'Street 12', number: 23
        },
      }
    });
  });

  it('should login user and return token and refreshToken object', async () => {
    const response = await request.post('/users/login').send({
      email: 'john@example.com',
      password: 'password',
    });

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      token: expect.any(String),
      refreshToken: expect.any(String),
    });
  });

  it('should return an error when login user with wrong email', async () => {
    const response = await request.post('/users/login').send({
      email: 'invalid@example.com',
      password: 'password',
    });

    expect(response.status).toBe(401);
    expect(response.body).toEqual({
      error: 'User Not Found with provided credentials'
    });
  });
});
