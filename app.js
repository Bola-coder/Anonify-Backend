const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();

const messageRouter = require("./routes/message");
const userRouter = require("./routes/user");
const errorHandler = require("./controllers/errorHandler");
const AppError = require("./util/AppError");

if ((process.env.NODE_ENV = "development")) {
  app.use(morgan("dev"));
}

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/messages", messageRouter);
app.use("/user", userRouter);

app.all("*", (req, res, next) => {
  const error = new AppError(
    `Can't find ${req.originalUrl} on this server. Route not defined`,
    404
  );
  next(error);
});

app.use(errorHandler);

module.exports = app;
