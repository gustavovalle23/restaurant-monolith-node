const createUserRepository = ({ prisma, awsGateway }) => {
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

    try {
      await awsGateway.createUser({ user })
    } catch (error) {
      console.error(error)
    }

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
