const express = require("express");
const router = express.Router();
const {
  createCourse,
  editCourse,
  showCourses,
  getCourse,
  getInstructorCourses,
  deleteCourse,
} = require("../controllers/course");

const {
  createSection,
  updateSection,
  deleteSection,
} = require("../controllers/section");

const {
  createSubsection,
  updateSubsection,
  deleteSubsection,
} = require("../controllers/subsection");

const {
  createRating,
  getAvgRating,
  totalRating,
} = require("../controllers/ratingandreview");

const { updateCourseProgress } = require("../controllers/progress");

const {
  auth,
  isInstructor,
  isStudent,
  isAdmin,
} = require("../middlewares/auth");

router.post("/createCourse", auth, isInstructor, createCourse); //done
router.post("/addSection", auth, isInstructor, createSection); //done

router.put("/updateSection", auth, isInstructor, updateSection); //done
router.delete("/deleteSection", auth, isInstructor, deleteSection); //done

router.put("/updateSubSection", auth, isInstructor, updateSubsection); //done

router.delete("/deleteSubSection", auth, isInstructor, deleteSubsection); //done
router.post("/addSubSection", auth, isInstructor, createSubsection); //done

router.get("/getAllCourses", showCourses);
router.post("/getCourse", getCourse);
// router.post("/getFullCourseDetails", auth, getFullCourseDetails);
router.post("/editCourse", auth, isInstructor, editCourse);
router.get("/getInstructorCourses", auth, isInstructor, getInstructorCourses);
router.delete("/deleteCourse", deleteCourse);

router.post("/updateCourseProgress", auth, isStudent, updateCourseProgress);

router.post("/createRating", auth, isStudent, createRating);
router.get("/getAverageRating", getAvgRating);
router.get("/getReviews", totalRating);

module.exports = router;
