const course = require("../models/course");
const Tag = require("../models/tags");
const user = require("../models/user");
const { uploader } = require("../utils/imageUploader");
const Section = require("../models/section");
const Subsection = require("../models/subsection");

exports.createCourse = async (req, res) => {
  try {
    const { courseName, courseDescription, whatIsThis, tag, price } = req.body;
    const thumbnail = req.files.thumbnailImage;
    // console.log(thumbnail);
    if (
      !courseName ||
      !courseDescription ||
      !whatIsThis ||
      !price ||
      !tag ||
      !thumbnail
    ) {
      return res.status(400).json({
        success: false,
        message: "sab kuch daal le bhai",
      });
    }

    const userId = req.user.id;
    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User id not provided.",
      });
    }
    const instructor = await user.findById({ _id: userId });

    if (!instructor) {
      return res.status(400).json({
        success: false,
        message: "instructor ni mila",
      });
    }

    const cloudImage = await uploader(thumbnail, "Krishna");
    // console.log(cloudImage);
    // you can add quality and height

    const newCourse = await course.create({
      courseName,
      courseDescription,
      instructor: instructor._id,
      whatIsThis,
      price,
      tag,
      thumbnail: cloudImage.secure_url,
    });

    await user.findByIdAndUpdate(
      { _id: instructor._id },
      {
        $push: {
          courses: newCourse,
        },
      },
      { new: true }
    );

    await Tag.findByIdAndUpdate(
      { _id: tag },
      { $push: { course: newCourse } },
      { new: true }
    );

    res.status(200).json({
      success: true,
      data: newCourse,
      message: "course bna lia h sir",
    });
  } catch (error) {
    res.status(503).json({
      success: false,
      message: error.message,
    });
  }
};

exports.editCourse = async (req, res) => {
  try {
    const { courseId } = req.body;
    const updates = req.body;

    const courses = await course.findById(courseId);

    if (!courses) {
      return res.status(404).json({ error: "Course not found" });
    }

    if (req.files) {
      const thumbnail = req.files.thumbnail;
      const uploader = await uploader(thumbnail, "Krishna");

      courses.thumbnail = uploader.secure_url;
    }

    for (const key in updates) {
      if (updates.hasOwnProperty(key)) {
        courses[key] = updates[key];
      }
    }

    // do pange with this function

    await courses.save();

    const update = await course
      .findOne({ _id: courseId })
      .populate({
        path: "instructor",
        populate: {
          path: "additional",
        },
      })
      .populate("ratingAndReview")
      .populate({
        path: "courseContent",
        populate: {
          path: "subsection",
        },
      })
      .exec();

    res.json({
      success: true,
      message: "Course updated successfully",
      data: update,
    });
  } catch (error) {
    return res.status(502).json({
      success: false,
      message: "can not able to edit",
      error: error.message,
    });
  }
};

exports.showCourses = async (req, res) => {
  try {
    const totalCoures = await course
      .find(
        {},
        {
          courseName: true,
          price: true,
          thumbnail: true,
          instructor: true,
          ratingAndReview: true,
          studentsEnrolled: true,
        }
      )
      .populate("instructor")
      .exec();

    return res.status(200).json({
      success: true,
      data: totalCoures,
      message: "saare coruses mil gye babu",
    });
  } catch (error) {
    res.status(503).json({
      success: false,
      message: "course create ni ho ra",
    });
  }
};

exports.getCourse = async (req, res) => {
  try {
    const { courseId } = req.body;
    const courseDetails = await course
      .find({ _id: courseId })
      .populate({
        path: "instructor",
        populate: {
          path: "additional",
        },
      })
      .populate("tag")
      .populate("ratingAndReview")
      .populate({ path: "courseContent", populate: "susbection" })
      .exec();

    if (!courseDetails) {
      return res.status(402).json({
        success: false,
        message: "could not fetch all data",
      });
    }
    return res.status(200).json({
      success: true,
      data: {
        courseDetails,
      },
    });
  } catch (error) {
    return res.status(502).json({
      success: false,
      message: "could not fetch all data",
    });
  }
};

exports.getInstructorCourses = async (req, res) => {
  try {
    const instructor = req.user.id;
    const totalCoures = await course
      .find({ instructor: instructor })
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: totalCoures,
    });
  } catch (error) {
    return res.status(502).json({
      success: false,
      message: "it is not able to fetch all courses",
    });
  }
};

exports.deleteCourse = async (req, res) => {
  try {
    const { courseId } = req.body;

    const courseDetails = await course.findById(courseId);
    if (!courseDetails) {
      return res.status(404).json({ message: "Course not found" });
    }

    const students = courseDetails.studentsEnrolled;

    for (const student of students) {
      await user.findByIdAndUpdate(student, {
        $pull: {
          courses: courseId,
        },
      });
    }

    const section = courseDetails.courseContent;

    for (const sectionId of section) {
      const getSection = await Section.findById(sectionId);
      if (getsection) {
        const subsections = getsection.subsection;
        for (const subsectionId of subsections) {
          await Subsection.findByIdAndUpdate(subsectionId);
        }
      }
      await Section.findByIdAndDelete(sectionId);
    }

    await course.findByIdAndDelete(courseId);

    return res.status(200).json({
      success: true,
      message: "Course deleted successfully",
    });
  } catch (error) {
    res.status(502).json({
      succcess: false,
      message: "not able to delete",
    });
  }
};

//duration vala kaaam krna h

//course
