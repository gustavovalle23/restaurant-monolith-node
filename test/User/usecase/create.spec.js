// const { CreateUserUseCase } = require("../../../src/User/usecases")
const { createCreateUserUseCase } = require("../../../src/User/usecases/Create")
const { makeHashPassword } = require('../../../src/User/domain/contracts')

const name = 'Gus'
const email = 'email@email.com'
const password = '123'
const birthDate = '01/01/1500'
const address = {
    country: 'BR', state: 'SP', street: 'Street 12', number: 23
}

class UserRepository {
    constructor({ failed }) {
        this.failed = failed
    }
    save() {
        if (this.failed) return;

        return {
            id: '63ed8a67320d042ef8a0412b',
            name,
            email,
            birthDate,
            address
        }
    }
}

describe('Create User Use Case Unit Test', () => {
    const userRepository = new UserRepository({ failed: false })
    const useCase = createCreateUserUseCase({
        userRepository,
        makeHashPasswordService: makeHashPassword
    })

    it('Should instantiate create use case with valid input', async () => {
        const output = await useCase.execute({
            name, email, password, birthDate, address
        })

        expect(output).toBeDefined()
        expect(output.name).toBe(name)
        expect(output.email).toBe(email)
        expect(output.birthDate).toBe(birthDate)
        expect(output.address).toStrictEqual(address)
        expect(output.password).toBeUndefined()
    })

    it('Should instantiate create use case with invalid address input', async () => {
        let error;
        try {
            await useCase.execute({
                name, email, password, birthDate, address: { ...address, country: undefined }
            })
        } catch (err) {
            error = err
        }

        expect(error.message).toBe('ValidationError: "country" is required')
    })

    it('Should instantiate create use case with invalid repository output', async () => {
        const userRepository = new UserRepository({ failed: true })
        const useCase = createCreateUserUseCase({
            userRepository,
            makeHashPasswordService: makeHashPassword
        })

        let error;
        try {
            await useCase.execute({
                name, email, password, birthDate, address
            })
        } catch (err) {
            error = err
        }

        expect(error).toStrictEqual(new Error('Unknow error when try create user'))
    })
})
