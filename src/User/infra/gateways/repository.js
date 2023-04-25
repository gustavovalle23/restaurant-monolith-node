const createUserRepository = ({ prisma }) => {
  const getById = (id) => {
    return prisma.user.findUnique({
      where: {
        id
      }
    });
  };

  const findByEmail = async (email) => {
    return prisma.user.findUnique({
      where: {
        email
      }
    });
  };

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
    findByEmail,
  }
}

module.exports = {
  createUserRepository,
}
