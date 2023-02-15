const { ObjectId } = require('bson')

const { UserValidator } = require('./validator')

class User {
    constructor({ firstName, lastName, birthDate, id = null }) {
        this.id = id ?? new ObjectId().toString();
        this.firstName = firstName;
        this.lastName = lastName;
        this.birthDate = birthDate;

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
