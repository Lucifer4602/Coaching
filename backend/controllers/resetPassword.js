const user = require("../models/user");
const sender = require("../utils/mailSender");
const bcrypt = require("bcrypt");

//reset password token
exports.resetToken = async (req, res) => {
  try {
    const { email } = req.body;

    const User = await user.findOne({ email });

    if (!User) {
      return res.status(402).json({
        messgae: "Email is not registered",
      });
    }
    const token = crypto.randomUUID();
    const update = await user.findOneAndUpdate(
      { email },
      {
        token: token,
        expireTime: Date.now() + 5 * 60 * 1000,
      },
      { new: true }
    );

    const Url = `https://localhost:3000/update-password/${token}`;

    await sender(email, "password reset kr le bro", `${Url}`);
    return res.status(201).json({
      success: true,
      message: "password token is created",
    });
  } catch (error) {
    res.status(501).json({
      success: false,
      message: error.messgae,
    });
  }
};

//reset password

exports.reset = async (
  req,
  res //email k through ni kr skte the kya
) => {
  try {
    const { password, confirmPassword, token } = req.body;
    if (password !== confirmPassword) {
      return res.json({
        success: false,
        message: "password not matched",
      });
    }

    const user = await user.findOne({ token });

    if (!user) {
      return res.json({
        success: false,
        message: "token is invalid",
      });
    }

    if (user.resetToken < Date.now()) {
      return res.json({
        success: false,
        message: "token is expired",
      });
    }

    const hashed_password = await bcrypt.hash(password, 10);

    await user.findOneAndUpdate(
      { token },
      { password: hashed_password },
      { new: true }
    );

    return res.status(202).json({
      success: true,
      message: "password is reset",
    });
  } catch (error) {
    res.status(501).json({
      success: false,
      message: error.messgae,
    });
  }
};
