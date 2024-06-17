const sender = require("../utils/mailSender");
const Contact = require("../models/contact");

exports.contactUs = async (req, res) => {
  const { email, firstName, lastName, message, phoneNumber } = req.body;

  try {
    await sender(email, "You are done now", "Email is received");

    const newContact = new Contact({
      email,
      firstName,
      lastName,
      message,
      phoneNumber,
    });

    await newContact.save();

    return res.status(202).json({
      success: true,
      message: "Email sent successfully and form data saved to database",
    });
  } catch (error) {
    console.error("Error in contactUs:", error);
    return res.status(503).json({
      success: false,
      message: "Something went wrong while processing the request",
    });
  }
};
