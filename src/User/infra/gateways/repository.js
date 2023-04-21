const createUserRepository = ({ prisma }) => {
  const getById = (userId) => null;

  const createUser = async ({ user }) => {
    const { name, email, password, birthDate, address } = user;
    const savedUser = await prisma.user.create({
      data: {
        name,
        email,
        password,
        birthDate,
        isActive: true,
        address: {
          create: {
            ...address
          }
        }
      },
      include: {
        address: true
      }
    });

    return savedUser;
  };


  return {
    getById,
    createUser,
  }
}

module.exports = {
  createUserRepository,
}
