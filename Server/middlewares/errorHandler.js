const errorHandler = (error, req, res, next) => {
  let status = 500;
  let message = "Internal Server Error";
  console.log(error);

  if (error.name === "SequelizeValidationError") {
    status = 400;
    message = error.errors[0].message;
  }

  if (error.name === "SequelizeUniqueConstraintError") {
    status = 400;
    message = error.errors[0].message;
  }

  if (
    error.name === "SequelizeDatabaseError" ||
    error.name === "SequelizeForeignKeyConstraintError"
  ) {
    status = 400;
    message = "Invalid Input";
  }

  if (error.name === "BadRequest") {
    message = "Please input email or password";
    status = 400;
  }

  if (error.name === "LoginError") {
    message = "Invalid email or password";
    status = 401;
  }

  if (error.name === "Unauthorized" || error.name === "JsonWebTokenError") {
    message = "Please login first";
    status = 401;
  }

  if (error.name === "Forbidden") {
    message = "You dont have permission";
    status = 403;
  }

  if (error.name === "NotFound") {
    status = 404;
    message = `Not Found`;
  }

  res.status(status).json({
    message,
  });
};

module.exports = errorHandler;
