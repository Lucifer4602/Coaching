const User = require("../models/user");

const addToWishlist = async (req, res) => {
  const { userId, courseId } = req.query;

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
  const { userId, courseId } = req.query;

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

module.exports = {
  addToWishlist,
  removeFromWishlist,
  addToCart,
  removeFromCart,
};
