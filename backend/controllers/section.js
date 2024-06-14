const section = require("../models/section");
const course = require("../models/course");
const subsection = require("../models/subsection");

exports.createSection = async (req, res) => {
  try {
    const { sectionName, courseId } = req.body;
    if (!sectionName || !courseId) {
      req.status(403).json({
        success: false,
        message: "something went wrong",
      });
    }

    const newSection = await section.create({ sectionName });

    await course
      .findByIdAndUpdate(
        courseId,
        { $push: { courseContent: newSection._id } },
        { new: true }
      )
      .populate({ path: "courseContent", populate: { path: "subsection" } })
      .exec();

    return res.status(201).json({
      success: true,
      message: "section is finally created",
      newSection,
    });
  } catch (error) {
    res.status(503).json({
      success: false,
      messgae: "section hi ni create ho ri",
    });
  }
};

exports.updateSection = async (req, res) => {
  try {
    const { sectionName, sectionId, courseId } = req.body;

    if (!sectionName || !sectionId) {
      return res.status(400).json({
        success: false,
        message: "Section name and section ID are required.",
      });
    }

    await section.findByIdAndUpdate(sectionId, { sectionName }, { new: true });

    const courses = await course
      .findById(courseId)
      .populate({ path: "courseContent", populate: { path: "subsection" } })
      .exec();

    return res.status(200).json({
      success: true,
      message: "Section is updated.",
      courses,
    });
  } catch (error) {
    res.status(503).json({
      success: false,
      message: "Failed to update section.",
      error: error.message,
    });
  }
};

exports.deleteSection = async (req, res) => {
  try {
    const { sectionId, courseId } = req.query;

    const updatedCourse = await course.findByIdAndUpdate(
      courseId,
      { $pull: { courseContent: sectionId } },
      { new: true }
    );

    const delsec = await section.findById(sectionId);
    if (!delsec) {
      return res.status(404).json({
        success: false,
        message: "Section not found",
      });
    }

    await subsection.deleteMany({ _id: { $in: delsec.subsection } });

    await section.findByIdAndDelete(sectionId);

    const courseDetails = await course
      .findById(courseId)
      .populate({ path: "courseContent", populate: { path: "subsection" } })
      .exec();

    return res.status(200).json({
      success: true,
      message: "Section successfully deleted",
      data: courseDetails,
    });
  } catch (error) {
    console.error(error);
    res.status(503).json({
      success: false,
      message: "Failed to delete section",
      error: error,
    });
  }
};
