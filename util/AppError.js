class AppError extends Error {
  constructor(message, stausCode) {
    super(message);
    this.statusCode = stausCode;
    this.status = `${this.statusCode}`.startsWith("4") ? "fail" : "error";

    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppError;
