class InvalidInputError extends Error {
  constructor(message) {
    super(message);
    this.name = 'InvalidInputError';
  }
}

class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ValidationError';
  }
}

class InvalidLoginCredentialsError extends Error {
  constructor() {
    super('User Not Found with provided credentials');
    this.name = 'InvalidLoginCredentialsError';
  }
}

module.exports = {
  ValidationError,
  InvalidInputError,
  InvalidLoginCredentialsError,
}
