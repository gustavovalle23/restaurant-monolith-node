const { ObjectId } = require('bson')

const { userValidator } = require('./validators');
const { createAddress } = require('./valueObjects');
const { ValidationError, InvalidInputError } = require('./errors');

const createUser = ({ name, email, password, birthDate, address: { country, state, street, number }, isActive = true, id = null }) => {
  const userId = id || new ObjectId().toString();
  const address = createAddress({ country, state, street, number });

  const validate = (user) => {
    if (!ObjectId.isValid(user.id)) throw new InvalidInputError('ValidationError: "id" must be a valid ObjectID');

    const { error } = userValidator.validate(user, { abortEarly: false });
    if (typeof error !== 'undefined') throw new ValidationError(error);
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
