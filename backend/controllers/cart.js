const User = require("../models/user");
const course = require("../models/course");

const addToWishlist = async (req, res) => {
  const { userId, courseId } = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $addToSet: { wishlist: courseId } },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ wishlist: updatedUser.wishlist });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const removeFromWishlist = async (req, res) => {
  const { userId, courseId } = req.query;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $pull: { wishlist: courseId } },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ wishlist: updatedUser.wishlist });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addToCart = async (req, res) => {
  const { userId, courseId } = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $addToSet: { cart: courseId } },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ cart: updatedUser.cart });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const removeFromCart = async (req, res) => {
  const { userId, courseId } = req.query;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $pull: { cart: courseId } },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ cart: updatedUser.cart });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const checkWishlistStatus = async (req, res) => {
  const { userId, courseId } = req.query;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const isInWishlist = user.wishlist.some((item) => item.equals(courseId));
    res.status(200).json({ isInWishlist });
  } catch (error) {
    console.error("Error checking wishlist status:", error);
    res.status(500).json({ error: "Server error" });
  }
};

const checkCartStatus = async (req, res) => {
  const { userId, courseId } = req.query;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const isInCart = user.cart.some((item) => item.equals(courseId));
    res.status(200).json({ isInCart });
  } catch (error) {
    console.error("Error checking cart status:", error);
    res.status(500).json({ error: "Server error" });
  }
};

const addToEnrolled = async (req, res) => {
  const { userId, courseId } = req.body;

  try {
    // Update the user's courses array
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $addToSet: { courses: courseId } },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update the course's studentsEnrolled array
    const updatedCourse = await course.findByIdAndUpdate(
      courseId,
      { $addToSet: { studentsEnrolled: userId } },
      { new: true }
    );

    if (!updatedCourse) {
      return res.status(404).json({ message: "Course not found" });
    }

    res.status(200).json({
      message: "Successfully enrolled",
      userCourses: updatedUser.courses,
      courseStudents: updatedCourse.studentsEnrolled,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const removeFromEnrolled = async (req, res) => {
  const { userId, courseId } = req.query;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $pull: { courses: courseId } },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ courses: updatedUser.courses });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  addToWishlist,
  removeFromWishlist,
  addToCart,
  removeFromCart,
  checkWishlistStatus,
  checkCartStatus,
  addToEnrolled,
  removeFromEnrolled,
};
