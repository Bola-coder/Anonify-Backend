const AppError = require("./../util/AppError");

const handleCastErrorDB = () => {
  const message = `Invalid ${err.path}: ${err.value}.`;
  return new AppError(message, 400);
};

const handleDuplicateValueErrorDB = (err) => {
  const dupValue = Object.values(err.keyValue)[0];
  console.log(dupValue);
  const message = `User with name "${dupValue}"  exist already`;
  return new AppError(message, 400);
};

const handleValidationErrorDB = (err) => {
  const errors = Object.values(err.errors).map((ele) => ele.message);
  const message = `Invalid Input Data: ${errors.join(". ")}`;
  return new AppError(message, 400);
};

const handleJWTError = (err) => {
  return new AppError("Invalid token, please login again", 401);
};

const handleJWTExpiredError = (err) => {
  return new AppError("Token has expired. Please login again", 401);
};

const sendDevError = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

const sendProdError = (err, res) => {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  }

  // Programming or other unknown errors: Send generic error mesage
  else {
    // Log the error to the console
    console.error("ERROR ", err);

    // Send generic message to client
    res.status(500).json({
      status: "error",
      message: "Something went wrong.",
    });
  }
};

const errorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";
  if (process.env.NODE_ENV === "development") {
    console.log(process.env.NODE_ENV);
    sendDevError(err, res);
  } else if (process.env.NODE_ENV === "production") {
    console.log(process.env.NODE_ENV);
    // Other conditionals here
    let error = JSON.parse(JSON.stringify(err));
    console.log(error);
    if (error.name == "CastError") {
      error = handleCastErrorDB(error);
    }
    if (error.code == 11000) {
      error = handleDuplicateValueErrorDB(error);
    }
    if (error.name === "ValidationError") {
      error = handleValidationErrorDB(error);
    }
    if (error.name === "JsonWebTokenError") {
      error = handleJWTError(error);
    }
    if (error.name === "TokenExpiredError") {
      error = handleJWTExpiredError(error);
    }
    console.log(error);
    sendProdError(error, res);
  }

  next();
};

module.exports = errorHandler;
