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
      req.status(403).json({
        success: false,
        message: "something went wrong",
      });
    }

    await section.findByIdAndUpdate(sectionId, { sectionName }, { new: true });
    const course = await course
      .findById(courseId)
      .populate({ path: "courseContent", populate: { path: "subsection" } })
      .exec();
    return res.status(201).json({
      success: true,
      message: "section is updated",
    });
    // do we need to update in course
  } catch (error) {
    res.status(503).json({
      success: false,
      messgae: "section hi ni update ho ri",
    });
  }
};

exports.deleteSection = async (req, res) => {
  try {
    const { sectionId, courseId } = req.params;
    await course.findByIdAndUpdate(courseId, {
      $pull: { courseContent: sectionId },
    });
    const section = await section.findById(sectionId);

    if (!section) {
      return res.status(404).json({
        success: false,
        message: "Section not Found",
      });
    }

    await subsection.deleteMany({ _id: { $in: section.subsection } });
    await section.findByIdAndDelete(sectionId);
    const courseDetails = await course
      .findById(courseId)
      .populate({ path: "courseContent", populate: { path: "subsection" } })
      .exec();
    return res.status(201).json({
      success: true,
      message: "section is deleted",
      data: courseDetails,
    });

    // do we need to delete in course
  } catch (error) {
    res.status(503).json({
      success: false,
      messgae: "section hi ni update ho ri",
    });
  }
};
