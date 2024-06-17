const ratingAndReview = require("../models/ratingandreview");
const User = require("../models/user");
const course = require("../models/course");
const mongo = require("mongoose");

exports.createRating = async (req, res) => {
  try {
    // const userId = req.user.id;
    const { rating, review, courseId, userId } = req.body;

    const courseDetails = await course.findOne({
      _id: courseId,
      studentsEnrolled: { $elemMatch: { $eq: userId } },
    });

    if (!courseDetails) {
      return res.status(404).json({
        success: false,
        message: "could not find course details",
      });
    }

    const already_Review = await ratingAndReview.findOne({
      user: userId,
      course: courseId,
    });

    if (already_Review) {
      return res.status(404).json({
        success: false,
        message: "bhai ek baar hi allowed h",
      });
    }

    const newRating = {
      rating,
      review,
      course: courseId,
      user: userId,
    };

    const ratingReview = await ratingAndReview.create(newRating);

    await course.findByIdAndUpdate(
      courseId,
      { $push: { ratingAndReview: ratingReview._id } },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: "Rating and review created",
    });
  } catch (error) {
    res.status(501).json({
      success: false,
      message: "could not provide ratings",
    });
  }
};

exports.getAvgRating = async (req, res) => {
  try {
    const { courseId } = req.body;

    const result = await ratingAndReview.aggregate({
      $match: { course: new mongo.Types.ObjectId(courseId) },
      $group: {
        _id: null,
        avgRating: { $avg: "$rating" },
      },
    });

    if (result.length > 0) {
      return res.status(200).json({
        success: true,
        avgRating: result[0].avgRating,
      });
    }

    return res.status(401).json({
      success: false,
      message: "could not avg rating",
      avgRating: 0,
    });
  } catch (error) {
    res.status(501).json({
      success: false,
      message: "could not find average of ratings",
    });
  }
};

exports.totalRating = async (req, res) => {
  try {
    const total = await ratingAndReview
      .find({})
      .sort({ rating: "desc" })
      .populate({ path: "user", select: "firstName lastName email image" })
      .populate({ path: "course", select: "courseName" })
      .exec();

    return res.status(202).json({
      success: true,
      message: "all ratings captured",
      data: total,
    });
  } catch (error) {
    res.status(501).json({
      success: false,
      message: "could not find all ratings",
    });
  }
};
