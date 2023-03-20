const { User } = require('../domain')
const { makeHashPassword } = require('../domain/contracts')

class CreateUserUseCase {
    constructor({ userRepository }) {
        this.userRepository = userRepository
    }

    async execute({ name, email, password, birthDate, address }) {
        const hashedPassword = await makeHashPassword(password)

        const user = new User({
            name, email, password: hashedPassword, birthDate, address
        })

        const savedUser = await this.userRepository.save({
            user,
        })

        if (!savedUser) throw new Error('Unknow error when try create user')

        return {
            id: savedUser.id,
            name: savedUser.name,
            email: savedUser.email,
            birthDate: savedUser.birthDate,
            address: savedUser.address,
        }
    }
}

module.exports = {
    CreateUserUseCase,
}
