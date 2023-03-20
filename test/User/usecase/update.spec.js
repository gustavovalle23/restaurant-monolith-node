const { UpdateUserUseCase } = require('../../../src/User/usecases');
const { UserRepository } = require('../../../src/User/domain/repository')

describe('UpdateUserUseCase', () => {
  let userRepository;
  let updateUserUseCase;

  beforeEach(() => {
    userRepository = new UserRepository();
    updateUserUseCase = new UpdateUserUseCase({ userRepository });
  });

  it('should update a user with the specified information', async () => {
    const userId = 123;
    const name = 'John Doe';
    const email = 'john.doe@example.com';
    const birthDate = '1990-01-01';

    const existingUser = { id: userId, name: 'Old Name', email: 'old.email@example.com', password: 'oldpassword', birthDate: '1980-01-01' };
    userRepository.getById = jest.fn().mockResolvedValue(existingUser);
    userRepository.update = jest.fn().mockImplementation((user) => Promise.resolve(user));

    const updatedUser = await updateUserUseCase.execute({ userId, name, email, birthDate });

    expect(userRepository.getById).toHaveBeenCalledWith(userId);
    expect(userRepository.update).toHaveBeenCalledWith({
      id: userId,
      name,
      email,
      birthDate,
      password: 'oldpassword',
    });

    expect(updatedUser).toEqual(expect.objectContaining({
      id: userId,
      name,
      email,
      birthDate,
    }));
  });

  it('should throw an error if the specified user does not exist', async () => {
    const userId = 456;
    userRepository.getById = jest.fn().mockResolvedValue(null);

    await expect(updateUserUseCase.execute({ userId })).rejects.toThrow('User not found');
  });

  it('should throw an error if no parameters are provided', async () => {
    const userId = 123;
    userRepository.getById = jest.fn().mockResolvedValue({ id: userId, name: 'Old Name', email: 'old.email@example.com', password: 'oldpassword', birthDate: '1980-01-01' });
    await expect(updateUserUseCase.execute({})).rejects.toThrow('No parameters provided');
  });

  it('should not update a user if no parameters are provided', async () => {
    const userId = 123;
    const user = { id: userId, name: 'Old Name', email: 'old.email@example.com', password: 'oldpassword', birthDate: '1980-01-01' }
    userRepository.getById = jest.fn().mockResolvedValue(user);
    userRepository.update = jest.fn();

    await updateUserUseCase.execute({ userId });

    expect(userRepository.getById).toHaveBeenCalledWith(userId);
    expect(userRepository.update).toHaveBeenCalledWith({...user});
  });

});
