const express = require("express");

const authcontroller = require("./../controllers/userAuth");

const router = express.Router();

router.route("/signup").post(authcontroller.signup);
router.route("/login").post(authcontroller.login);
router.route("/me/:slug").get(authcontroller.getUserBySlug);

module.exports = router;
