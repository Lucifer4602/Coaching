const mongo = require("mongoose");

const ratingandreview = new mongo.Schema({
  user: {
    type: mongo.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  review: {
    type: String,
    required: true,
  },
  course: {
    type: mongo.Schema.Types.ObjectId,
    required: true,
    ref: "course",
    index: true,
  },
});

module.exports = mongo.model("ratingandreview", ratingandreview);

// add course
