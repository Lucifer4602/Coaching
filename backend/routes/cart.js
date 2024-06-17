const express = require("express");
const router = express.Router();
const {
  addToWishlist,
  removeFromWishlist,
  addToCart,
  removeFromCart,
  checkWishlistStatus,
  checkCartStatus,
  addToEnrolled,
  removeFromEnrolled,
} = require("../controllers/cart");

const { auth, isStudent } = require("../middlewares/auth");

// Routes for wishlist
router.post("/addWishlist", auth, isStudent, addToWishlist);
router.delete("/removeWishlist", auth, isStudent, removeFromWishlist);

// Routes for cart
router.post("/addCart", auth, isStudent, addToCart);
router.delete("/removeCart", auth, isStudent, removeFromCart);

router.post("/addEnrolled", auth, isStudent, addToEnrolled);
router.delete("/removeEnrolled", auth, removeFromEnrolled);

router.get("/checkWishlistStatus", auth, isStudent, checkWishlistStatus);

router.get("/checkCartStatus", auth, isStudent, checkCartStatus);

module.exports = router;
