const { ObjectId } = require('bson')

const { UserValidator } = require('./validators');
const { Address, createAddress } = require('./valueObjects');

class User {
  constructor({ name, email, password, birthDate, address: { country, state, street, number }, isActive = true, id = null }) {
    this.id = id ?? new ObjectId().toString()
    this.name = name
    this.email = email
    this.password = password
    this.birthDate = birthDate
    this.isActive = isActive
    this.address = new Address({ country, state, street, number })

    this.#validate();
  }

  #validate() {
    if (!ObjectId.isValid(this.id)) throw new Error('ValidationError: "id" must be a valid ObjectID');

    const { error } = UserValidator.validate(this, { abortEarly: false });
    if (typeof error !== 'undefined') throw new Error(error);
  }

}

const createUser = ({ name, email, password, birthDate, address: { country, state, street, number }, isActive = true, id = null }) => {
  const userId = id || new ObjectId().toString();
  const address = createAddress({ country, state, street, number });

  const validate = (user) => {
    if (!ObjectId.isValid(user.id)) throw new Error('ValidationError: "id" must be a valid ObjectID');

    const { error } = UserValidator.validate(user, { abortEarly: false });
    if (typeof error !== 'undefined') throw new Error(error);
  }

  const user = {
    id: userId,
    name,
    email,
    password,
    birthDate,
    isActive,
    address
  };

  validate(user);

  return user;
};


module.exports = {
  User,
  createUser,
}
