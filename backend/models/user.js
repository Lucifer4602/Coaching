const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    additional: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "profile",
    },
    role: {
      type: String,
      enum: ["admin", "instructor", "student"],
      required: true,
    },
    courses: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "course",
      },
    ],
    image: {
      type: String,
    },
    progress: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "progress",
      },
    ],
    resetToken: {
      type: String,
    },
    expireTime: {
      type: Date,
    },
    wishlist: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "course",
      },
    ],
    cart: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "course",
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("user", userSchema);
