const user = require("../models/user");
const profile = require("../models/profile");
const course = require("../models/course");
const mongoose = require("mongoose");

exports.updateProfile = async (req, res) => {
  try {
    const {
      dob = "",
      about = "",
      phoneNumber = "",
      gender = "",
      firstName = "",
      lastName = "",
    } = req.body;

    const id = req.user.id;

    const userDetails = await user.findById(id);
    const profileDetails = await profile.findById(userDetails.additional);

    const user1 = await user.findByIdAndUpdate(id, { firstName, lastName });
    console.log(user1);
    await user1.save();

    // const profileDetails = await profile.findById(profileId);

    profileDetails.dob = dob;
    profileDetails.about = about;
    profileDetails.gender = gender;
    profileDetails.phoneNumber = phoneNumber;

    await profileDetails.save();

    const updatedUserDetails = await user
      .findById(id)
      .populate("additional")
      .exec();

    res.status(200).json({
      success: true,
      message: "profile saved",
      updatedUserDetails,
    });
  } catch (error) {
    res.status(506).json({
      success: false,
      message: error.message,
    });
  }
};
// how to schedule this task???? chrone job
exports.deleteAccount = async (req, res) => {
  try {
    const user1 = req.user.id;
    const userId = await user.findById({ _id: user1 });
    if (!userId) {
      return res.status(402).json({
        success: false,
        message: "User not found",
      });
    }

    // Delete profile
    await profile.findByIdAndDelete({
      _id: new mongoose.Types.ObjectId(userId.additional),
    });

    // Remove user from enrolled courses
    for (const courseId of userId.courses) {
      await course.findByIdAndUpdate(
        courseId,
        { $pull: { studentsEnroled: user1 } },
        { new: true }
      );
    }

    // Delete user
    await user.findByIdAndDelete({ _id: user1 });

    // Delete user's course progress
    await course.deleteMany({ userId: user1 });

    res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    return res.status(503).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getAllUserDetails = async (req, res) => {
  try {
    const id = req.user.id;
    // console.log(req.user);
    // console.log(id);
    const userDetails = await user
      .findById(id)
      .populate("additional")
      .populate("wishlist")
      .populate("cart")
      .populate({
        path: "courses",
        populate: {
          path: "courseContent",
          populate: {
            path: "subsection",
          },
        },
      })
      .exec();
    res.status(200).json({
      success: true,
      message: "User Data fetched successfully",
      data: userDetails,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.instructorDashboard = async (req, res) => {
  try {
    const courseDetails = await course.find({ instructor: req.user.id });

    const courseData = courseDetails.map((item) => {
      const totalStudents = item.studentsEnrolled.length;
      const totalAmount = item.price * totalStudents;

      const courseDataWithStats = {
        _id: item._id,
        courseName: item.courseName,
        courseDescription: item.courseDescription,
        totalStudents,
        totalAmount,
      };

      return courseDataWithStats;
    });

    res.status(200).json({
      courses: courseData,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// profile photo update and get enrolled courses
