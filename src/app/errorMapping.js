const errorMapper = (err) => {
  const errorMap = {
    ValidationError: { status: 400, message: err.message },
    InvalidInputError: { status: 400, message: err.message },
    InvalidLoginCredentialsError: { status: 401, message: err.message },
  }

  const errorType = err.constructor.name;
  const errorData = errorMap[errorType] || { status: 500, message: 'Internal Server Error' };

  return {
    status: errorData.status,
    message: errorData.message
  }
}

module.exports = {
  errorMapper,
}
