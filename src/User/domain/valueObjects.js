const { addressValidator } = require("./validators")

const createAddress = ({ country, state, street, number }) => {
  const address = {
    country,
    state,
    street,
    number
  };

  const validate = () => {
    const { error } = addressValidator.validate(address, { abortEarly: false });
    if (typeof error !== 'undefined') throw new Error(error);
  };

  validate();

  return address;
};

module.exports = {
  createAddress,
}
