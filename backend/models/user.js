const mongo = require("mongoose");

const user = new mongo.Schema(
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
      type: mongo.Schema.Types.ObjectId,
      ref: "profile",
    },
    role: {
      type: String,
      enum: ["admin", "instructor", "student"],
      required: true,
    },
    courses: [
      {
        type: mongo.Schema.Types.ObjectId,
        ref: "course",
      },
    ],
    image: {
      type: String,
    },
    progress: [
      {
        type: mongo.Schema.Types.ObjectId,
        ref: "progress",
      },
    ],
    resetToken: {
      type: String,
    },
    expireTime: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongo.model("user", user);

// active approved timestamp
