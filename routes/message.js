const express = require("express");

const {
  getAllMessages,
  createNewMessage,
} = require("./../controllers/message");

const { protectRoute } = require("./../controllers/userAuth");
const router = express.Router();

router.route("/").get(protectRoute, getAllMessages).post(createNewMessage);

module.exports = router;
