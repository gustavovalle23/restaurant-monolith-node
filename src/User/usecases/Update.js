const { createUser } = require("../domain/entities");

class UpdateUserUseCase {
  constructor({ userRepository }) {
    this.userRepository = userRepository;
  }

  async execute({ userId, name, email, birthDate }) {
    if (!userId && !name && !email && !birthDate) {
      throw new Error('No parameters provided for user update');
    }

    const existingUser = await this.userRepository.getById(userId);
    if (!existingUser) {
      throw new Error('User not found');
    }

    const updatedUserParams = {
      id: userId,
      name: name || existingUser.name,
      email: email || existingUser.email,
      password: existingUser.password,
      birthDate: birthDate || existingUser.birthDate,
    };


    const updatedUser = createUser(
      { ...updatedUserParams, address: existingUser.address }
    )

    return this.userRepository.update(updatedUser);
  }
}

module.exports = {
  UpdateUserUseCase
};
