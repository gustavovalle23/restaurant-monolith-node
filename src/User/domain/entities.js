const { ObjectId } = require('bson')

const { UserValidator } = require('./validators');
const { Address } = require('./valueObjects');

class User {
    constructor({ firstName, lastName, birthDate, address: { country, state, street, number }, id = null }) {
        this.id = id ?? new ObjectId().toString();
        this.firstName = firstName;
        this.lastName = lastName;
        this.birthDate = birthDate;
        this.address = new Address({ country, state, street, number })

        this.#validate()
    }

    #validate() {
        const { error } = UserValidator.validate(this, { abortEarly: false })
        if (typeof error !== 'undefined') throw new Error(error)
    }

}

module.exports = {
    User
}
