const express = require("express");
const router = express.Router();
const { auth, isInstructor } = require("../middlewares/auth");
const {
  deleteAccount,
  updateProfile,
  getAllUserDetails,
  instructorDashboard,
} = require("../controllers/Profile");

router.delete("/deleteProfile", auth, deleteAccount);
router.put("/updateProfile", auth, updateProfile);
router.get("/getUserDetails", auth, getAllUserDetails);

router.get("/instructorDashboard", auth, isInstructor, instructorDashboard);

module.exports = router;
