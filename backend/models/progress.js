const mongo = require("mongoose");

const progress = new mongo.Schema({
  courseId: {
    type: mongo.Schema.Types.ObjectId,
    ref: "course",
  },
  completed: [
    {
      type: mongo.Schema.Types.ObjectId,
      ref: "subsection",
    },
  ],
  userId: {
    type: mongo.Schema.Types.ObjectId,
    ref: "user",
  },
});

module.exports = mongo.model("progress", progress);
