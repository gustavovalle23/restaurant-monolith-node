const { User } = require('../../../src/User/domain')

describe('User Entity Unit Tests', () => {
    const validAddress = { country: 'BR', state: 'SP', street: 'Street 12', number: 23 }

    it('Should instantiate User entity with valid args', () => {
        const birthDate = new Date(1999, 1, 1)

        const user = new User({
            firstName: 'Gus',
            lastName: 'Valle',
            address: validAddress,
            birthDate
        })

        expect(user.id).not.toBeNull()
        expect(user.firstName).toBe('Gus')
        expect(user.lastName).toBe('Valle')
        expect(user.birthDate).toEqual(birthDate)
        expect(user.isActive).toBeTruthy()
    })

    it('Should throw error when instantiate User entity with invalid birthDate', () => {
        const birthDate = "Fake Data"
        let errorMessage

        try {
            new User({
                firstName: 'Gus',
                lastName: 'Valle',
                address: validAddress,
                birthDate
            })
        } catch (error) {
            errorMessage = error.message
        }

        expect(errorMessage).toBe('ValidationError: "birthDate" must be a valid date')
    })

    it('Should create an inactive user when set it in constructor', () => {
        const birthDate = new Date(1999, 1, 1)
        const user = new User({
            firstName: 'Gus',
            lastName: 'Valle',
            address: validAddress,
            isActive: false,
            birthDate
        })

        expect(user.isActive).toBeFalsy()

    })

    it('Should throw error when instantiate User entity with invalid names', () => {
        const birthDate = new Date(1999, 1, 1)
        let errorMessage

        try {
            new User({
                lastName: 'Valle',
                address: validAddress,
                birthDate
            })
        } catch (error) {
            errorMessage = error.message
        }

        expect(errorMessage).toBe('ValidationError: "firstName" is required')

        errorMessage = undefined

        try {
            new User({
                firstName: 'Gus',
                address: validAddress,
                birthDate
            })
        } catch (error) {
            errorMessage = error.message
        }

        expect(errorMessage).toBe('ValidationError: "lastName" is required')

        errorMessage = undefined

        try {
            new User({
                birthDate,
                address: validAddress,
            })
        } catch (error) {
            errorMessage = error.message
        }
        expect(errorMessage).toBe('ValidationError: "firstName" is required. "lastName" is required')

        errorMessage = undefined

        try {
            new User({
                firstName: null,
                lastName: null,
                address: validAddress,
                birthDate
            })
        } catch (error) {
            errorMessage = error.message
        }
        expect(errorMessage).toBe('ValidationError: "firstName" must be a string. "lastName" must be a string')
    })

})
