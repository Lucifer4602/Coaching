const express = require("express");
const router = express.Router();
const {
  addToWishlist,
  removeFromWishlist,
  addToCart,
  removeFromCart,
  checkWishlistStatus,
  checkCartStatus,
} = require("../controllers/cart");

const { auth } = require("../middlewares/auth");

// Routes for wishlist
router.post("/addWishlist", auth, addToWishlist);
router.delete("/removeWishlist", auth, removeFromWishlist);

// Routes for cart
router.post("/addCart", auth, addToCart);
router.delete("/removeCart", auth, removeFromCart);

router.get("/checkWishlistStatus", auth, checkWishlistStatus);

router.get("/checkCartStatus", auth, checkCartStatus);

module.exports = router;
