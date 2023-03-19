const { User } = require('../../../src/User/domain')

describe('User Entity Unit Tests', () => {
    const validAddress = { country: 'BR', state: 'SP', street: 'Street 12', number: 23 }

    it('Should instantiate User entity with valid args', () => {
        const birthDate = new Date(1999, 1, 1)

        const user = new User({
            name: 'Gus',
            email: 'email@email.com',
            password: '123',
            address: validAddress,
            birthDate
        })

        expect(user.id).not.toBeNull()
        expect(user.name).toBe('Gus')
        expect(user.password).toBe('123')
        expect(user.birthDate).toEqual(birthDate)
        expect(user.isActive).toBeTruthy()
    })

    it('Should throw error when instantiate User entity with invalid birthDate', () => {
        const birthDate = "Fake Data"
        let errorMessage

        try {
            new User({
                name: 'Gus',
                email: 'email@email.com',
                password: '123',
                address: validAddress,
                birthDate
            })
        } catch (error) {
            errorMessage = error.message
        }

        expect(errorMessage).toBe('ValidationError: "birthDate" must be a valid date')
    })

    it('Should throw error when instantiate User entity with invalid id', () => {
        let errorMessage
        const birthDate = new Date(1999, 1, 1)

        try {
            new User({
                id: '123',
                name: 'Gus',
                email: 'email@email.com',
                password: '123',
                address: validAddress,
                birthDate
            })
        } catch (error) {
            errorMessage = error.message
        }

        expect(errorMessage).toBe('ValidationError: "id" must be a valid ObjectID')
    })

    it('Should create an inactive user when set it in constructor', () => {
        const birthDate = new Date(1999, 1, 1)
        const user = new User({
            name: 'Gus',
            email: 'email@email.com',
            password: '123',
            address: validAddress,
            isActive: false,
            birthDate
        })

        expect(user.isActive).toBeFalsy()

    })

    it('Should throw error when instantiate User entity with invalid name', () => {
        const birthDate = new Date(1999, 1, 1)
        let errorMessage

        try {
            new User({
                birthDate,
                email: 'email@email.com',
                password: '123',
                address: validAddress,
            })
        } catch (error) {
            errorMessage = error.message
        }
        expect(errorMessage).toBe('ValidationError: "name" is required')

        errorMessage = undefined

        try {
            new User({
                name: null,
                email: 'email@email.com',
                password: '123',
                address: validAddress,
                birthDate
            })
        } catch (error) {
            errorMessage = error.message
        }
        expect(errorMessage).toBe('ValidationError: "name" must be a string')
    })

})
