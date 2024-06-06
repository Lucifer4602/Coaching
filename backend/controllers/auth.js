const user = require("../models/user");
const OTP = require("../models/otp");
const otpGenerator = require("otp-generator");
const bcrypt = require("bcrypt");
const profile = require("../models/profile");
const jwt = require("jsonwebtoken");

//login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(402).json({
        success: false,
        message: "bhai data hi ni milra",
      });
    }

    const user1 = await user.findOne({ email });

    if (!user1) {
      res.status(402).json({
        success: false,
        message: "account toh bna le re",
      });
    }

    if (await bcrypt.compare(password, user1.password)) {
      const payload = {
        email: user1.email,
        id: user1._id,
        role: user1.role,
      };
      const token = jwt.sign(
        payload,
        "my-32-character-ultra-secure-and-ultra-long-secret",
        { expiresIn: "2h" }
      );
      // do we need to add token in user
      user1.token = token;
      user1.password = undefined;

      const options = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      };

      res.cookie("token", token, options).status(202).json({
        success: true,
        token,
        user1,
        message: "logged in",
      });
    } else {
      return res.status(402).json({
        success: false,
        message: "pasword is not correct",
      });
    }
  } catch (error) {
    res.status(402).json({
      success: false,
      message: error.message,
    });
  }
};

//signup
exports.signup = async (req, res) => {
  try {
    const { firstName, lastName, email, password, confirmPassword, role, otp } =
      req.body;

    //  is it necessary to add email here???
    if (password !== confirmPassword) {
      res.status(401).json({
        success: false,
        messgae: "bhai password same daal le re",
      });
    }

    const checking_User = await user.findOne({ email });

    if (checking_User) {
      return res.status(401).json({
        success: false,
        messgae: "user already exists",
      });
    }

    const response = await OTP.find({ email }).sort({ createdAt: -1 }).limit(1);
    console.log(response);
    if (response.length === 0) {
      return res.status(401).json({
        success: false,
        messgae: "otp not found",
      });
    } else if (otp !== response[0].otp) {
      return res.status(401).json({
        success: false,
        messgae: "Invalid otp",
      });
    }

    const hashed_password = await bcrypt.hash(password, 10);

    const updated_profile = await profile.create({
      gender: null,
      dob: null,
      about: null,
      phoneNumber: null,
    });

    const user1 = await user.create({
      firstName,
      lastName,
      email,
      password: hashed_password,
      role,
      additional: updated_profile._id,
      image: `https://api.dicebear.com/7.x/initials/svg?seed=${firstName} ${lastName}`,
    });

    return res.status(202).json({
      success: true,
      message: "user is registered",
    });
  } catch (error) {
    res.status(402).json({
      success: false,
      message: error.message,
    });
  }
};
//change password
exports.changePassword = async (req, res) => {
  const userDetails = await user.findById(req.user.id);

  const { oldPassword, newPassword } = req.body;

  const isPassword = await bcrypt.compare(oldPassword, userDetails.password);

  if (!isPassword) {
    return res
      .status(401)
      .json({ success: false, message: "The password is incorrect" });
  }

  if (newPassword === oldPassword) {
    return res
      .status(401)
      .json({ success: false, message: "The password is same" });
  }

  const encrypt = await bcrypt.hash(newPassword, 10);

  await user.findByIdAndUpdate(
    req.user.id,
    {
      password: encrypt,
    },
    {
      new: true,
    }
  );
};

//send otp
exports.sendOtp = async (req, res) => {
  try {
    const { email } = req.body;

    const checking_User = await user.findOne({ email });

    if (checking_User) {
      return res.status(401).json({
        success: false,
        messgae: "user already exists",
      });
    }

    var otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });

    const value = await OTP.findOne({ otp: otp });

    while (value) {
      otp = otpGenerator.generate(6, {
        upperCaseAlphabets: false,
        specialChars: false,
      });
    }

    const details = await OTP.create({
      email,
      otp,
    });

    res.status(201).json({
      success: true,
      message: "otp sent successfully",
      otp,
    });
  } catch (error) {
    res.status(402).json({
      success: false,
      message: error.message,
    });
    process.exit(1);
  }
};
