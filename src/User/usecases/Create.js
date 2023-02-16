const { User } = require('../domain')

class CreateUserUseCase {
    constructor(userRepository) {
        this.userRepository = userRepository
    }

    async execute({ name, email, password, birthDate, address }) {
        const user = new User({ name, email, password, birthDate, address })
        const savedUser = await this.userRepository.save(user)

        return {
            id: savedUser.id,
            name: savedUser.name,
            email: savedUser.email,
            birthDate: savedUser.birthDate
        }
    }
}

module.exports = {
    CreateUserUseCase,
}
