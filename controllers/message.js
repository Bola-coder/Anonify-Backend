const Messages = require("./../models/messageModel");
const catchAsync = require("./../util/catchAsync");
const AppError = require("./../util/AppError");

// Get All User messages {private}
const getAllMessages = catchAsync(async (req, res, next) => {
  const messages = await Messages.find({ userId: req.user.id }).sort(
    "-timeSent"
  );
  res.status(200).json({
    result: messages.length,
    status: "Success",
    data: messages,
  });
});

// Post a new message to User {public}
const createNewMessage = catchAsync(async (req, res, next) => {
  if (!req.body) {
    return next(new AppError("Empty request fields"));
  }

  const message = await Messages.create(req.body);
  if (!message) {
    return next(new AppError("Failed to create new message!!!"));
  }
  res.status(200).json({
    status: "Success",
    data: message,
  });
});

module.exports = {
  getAllMessages,
  createNewMessage,
};
