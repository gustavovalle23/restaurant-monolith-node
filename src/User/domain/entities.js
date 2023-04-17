const { ObjectId } = require('bson')

const { UserValidator } = require('./validators');
const { createAddress } = require('./valueObjects');

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
  createUser,
}
