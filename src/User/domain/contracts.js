const bcrypt = require('bcrypt');


module.exports = {
  makeHashPassword: async (password) => {
    const saltRounds = 10;
    return bcrypt.hash(password, saltRounds)
  }
}
