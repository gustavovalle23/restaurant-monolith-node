const { CreateUserUseCase } = require("../../../src/User/usecases")

const name = 'Gus'
const email = 'email@email.com'
const password = '123'
const birthDate = '01/01/1500'
const address = {
    country: 'BR', state: 'SP', street: 'Street 12', number: 23
}

class UserRepository {
    save() {
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
    const mockRepository = new UserRepository()
    const useCase = new CreateUserUseCase(mockRepository)

    it('Should instantiate create use case with valid input', async () => {
        const output = await useCase.execute({
            name, email, password, birthDate, address
        })

        expect(output).toBeDefined()
        expect(output.password).toBeUndefined()
    })
})
