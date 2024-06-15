const express = require("express");
const router = express.Router();
const {
  addToWishlist,
  removeFromWishlist,
  addToCart,
  removeFromCart,
} = require("../controllers/cart");

const { auth } = require("../middlewares/auth");

// Routes for wishlist
router.post("/addWishlist", auth, addToWishlist);
router.delete("/removeWishlist", auth, removeFromWishlist);

// Routes for cart
router.post("/addCart", auth, addToCart);
router.delete("removeCart", auth, removeFromCart);

module.exports = router;
