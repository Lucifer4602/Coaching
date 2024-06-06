const mongo = require("mongoose");

const profile = new mongo.Schema({
  gender: {
    type: String,
    enum: ["male", "female"],
  },
  dob: {
    type: String,
  },
  about: {
    type: String,
  },
  phoneNumber: {
    type: Number,
  },
});

module.exports = mongo.model("profile", profile);
