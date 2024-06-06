const mongo = require("mongoose");
const sender = require("../utils/mailSender");

const otp = new mongo.Schema({
  email: {
    type: String,
    required: true,
  },
  otp: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    expires: 5 * 60,
  },
});

async function sendVerification(email, otp) {
  try {
    const response = await sender(email, "verification from devil side ", otp);
    console.log("email sent", response);
  } catch (error) {
    console.log("error while verification", error);
    throw error;
  }
}

otp.pre("save", function (next) {
  sendVerification(this.email, this.otp);
  next();
});

module.exports = mongo.model("otp", otp);
