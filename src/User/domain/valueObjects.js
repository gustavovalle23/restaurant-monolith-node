const { AddressValidator } = require("./validators")

class Address {
    constructor({ country, state, street, number }) {
        this.country = country
        this.state = state
        this.street = street
        this.number = number

        this.#validate()
    }

    #validate() {
        const { error } = AddressValidator.validate(this, { abortEarly: false })
        if (typeof error !== 'undefined') throw new Error(error)
    }
}


const createAddress = ({ country, state, street, number }) => {
    const address = {
        country,
        state,
        street,
        number
    };

    const validate = () => {
        const { error } = AddressValidator.validate(address, { abortEarly: false });
        if (typeof error !== 'undefined') throw new Error(error);
    };

    validate();

    return address;
};


module.exports = {
    Address,
    createAddress,
}
