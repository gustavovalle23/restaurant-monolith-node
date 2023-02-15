const { User } = require('../../../src/User/domain')

describe('User Entity Unit Tests', () => {
    it('Should instantiate User entity with valid args', () => {
        const birthDate = new Date(1999, 6, 26)

        const user = new User({
            firstName: 'Gus',
            lastName: 'Valle',
            birthDate
        })

        expect(user.id).not.toBeNull()
        expect(user.firstName).toBe('Gus')
        expect(user.lastName).toBe('Valle')
        expect(user.birthDate).toEqual(birthDate)
    })

    it('Should instantiate User entity with invalid birthDate', () => {
        const birthDate = "Fake Data"
        try {
            new User({
                firstName: 'Gus',
                lastName: 'Valle',
                birthDate
            })
        } catch (error) {
            expect(error.message).toBe("ValidationError: \"birthDate\" must be a valid date")
        }
    })

})
