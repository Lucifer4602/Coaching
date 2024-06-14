const express = require("express");
const router = express.Router();
const { createTag, showTag } = require("../controllers/tag");
const {
  auth,
  isInstructor,
  isStudent,
  isAdmin,
} = require("../middlewares/auth");
// const { showCourses } = require("../controllers/course");

router.post("/createTag", auth, isAdmin, createTag);
router.get("/showTag", showTag);
module.exports = router;
