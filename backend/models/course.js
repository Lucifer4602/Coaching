const mongo = require("mongoose");

const course = new mongo.Schema(
  {
    courseName: {
      type: String,
      required: true,
    },
    courseDescription: {
      type: String,
      required: true,
    },
    instructor: {
      type: mongo.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    whatIsThis: {
      type: String,
      required: true,
    },
    courseContent: [
      {
        type: mongo.Schema.Types.ObjectId,
        ref: "section",
      },
    ],
    ratingAndReview: [
      {
        type: mongo.Schema.Types.ObjectId,
        ref: "ratingandreview",
      },
    ],
    price: {
      type: String,
      required: true,
    },
    thumbnail: {
      type: String,
    },
    studentsEnrolled: [
      {
        type: mongo.Schema.Types.ObjectId,
        ref: "user",
      },
    ],
    tag: {
      type: mongo.Schema.Types.ObjectId,
      ref: "tag",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongo.model("course", course);

//created at  status instruction
