class User {
    constructor(firstName, lastName, birthDate, id = null) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.birthDate = birthDate;

        this.#validate()
    }

    #validate() {
        console.log('Validating user...')
    }

}


module.exports = {
    User
}
