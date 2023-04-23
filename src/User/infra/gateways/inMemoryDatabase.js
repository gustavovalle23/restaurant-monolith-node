const createUserInMemoryRepository = () => {
  const users = [];

  const getById = (userId) => {
    const user = users.find(u => u.id === userId);
    return user || null;
  };

  const findByEmail = (email) => {
    const user = users.find(u => u.email === email);
    return user || null;
  };


  const createUser = async ({ user }) => {
    const { name, email, password, birthDate, address } = user;
    const newUser = {
      id: users.length + 1,
      name,
      email,
      password,
      birthDate,
      isActive: true,
      address: { ...address }
    };
    users.push(newUser);
    return newUser;
  };

  return {
    getById,
    createUser,
    findByEmail,
  };
};

module.exports = {
  createUserInMemoryRepository,
};
