const express = require("express");
const router = express.Router();

const {
  login,
  signup,
  sendOtp,
  changePassword,
} = require("../controllers/auth");

const { resetToken, reset } = require("../controllers/resetPassword");
const { auth } = require("../middlewares/auth");

router.post("/login", login); //done
router.post("/signup", signup); //done
router.post("/sendotp", sendOtp); //done
router.post("/changepassword", auth, changePassword);

router.post("/resetToken", resetToken);
router.post("/reset", reset);

module.exports = router;
