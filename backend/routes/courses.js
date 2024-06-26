const express = require("express");
const router = express.Router();
const {
  createCourse,
  editCourse,
  showCourses,
  getCourse,
  getInstructorCourses,
  deleteCourse,
  searchCourses,
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

router.get("/getAllCourses", showCourses); //done
router.get("/getCourse", getCourse); // done
// router.post("/getFullCourseDetails", auth, getFullCourseDetails);
router.post("/editCourse", auth, isInstructor, editCourse); //done
router.get("/getInstructorCourses", auth, isInstructor, getInstructorCourses); //done
router.delete("/deleteCourse", deleteCourse); //done

router.get("/search", searchCourses); //done

router.post("/updateCourseProgress", auth, isStudent, updateCourseProgress);

router.post("/createRating", createRating); //done
router.get("/getAverageRating", getAvgRating); //done
router.get("/getReviews", totalRating); //done

module.exports = router;
