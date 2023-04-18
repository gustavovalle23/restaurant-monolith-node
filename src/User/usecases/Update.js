const { createUser } = require("../domain/entities");

const createUpdateUserUseCase = ({ userRepository }) => {
  const execute = async ({ userId, name, email, birthDate }) => {
    if (!userId && !name && !email && !birthDate) {
      throw new Error('No parameters provided for user update');
    }

    const existingUser = await userRepository.getById(userId);
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

    return userRepository.update(updatedUser);
  }

  return {
    execute,
  }
}


module.exports = {
  createUpdateUserUseCase
};
