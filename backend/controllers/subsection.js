const section = require("../models/section");
const subsection = require("../models/subsection");
const { uploader } = require("../utils/imageUploader");

exports.createSubsection = async (req, res) => {
  try {
    const { sectionId, title, duration, body } = req.body;
    const video = req.files.videoFile;

    if (!sectionId || !title || !duration || !body || !video) {
      return res.status(402).json({
        success: false,
        message: "all fields are required",
      });
    }

    const video_url = await uploader(video, Krishna);

    const newSubsection = await subsection.create({
      title,
      duration: `${video_url.duration}`,
      body,
      videoUrl: video_url.secure_url,
    });

    const updatedSection = await section
      .findByIdAndUpdate(
        sectionId,
        { $push: { subsection: newSubsection._id } },
        { new: true }
      )
      .populate("subsection")
      .exec();

    return res.status(201).json({
      success: true,
      message: "subsection is created ",
      updatedSection,
    });
  } catch (error) {
    res.status(505).json({
      success: false,
      message: "not created subsection",
    });
  }
};

exports.updateSubsection = async (req, res) => {
  try {
    const { title, body, duration, subsectionId } = req.body;
    const video = req.files.videoFile;

    if (!title || !body || !duration || !video || !subsectionId) {
      req.status(403).json({
        success: false,
        message: "something went wrong",
      });
    }

    const video_url = await uploader(video, Krishna);

    await subsection.findByIdAndUpdate(
      subsectionId,
      { title, body, duration, videoUrl: video_url },
      { new: true }
    );

    return res.status(201).json({
      success: true,
      message: "subsection is updated",
    });
    // do we need to update in course
  } catch (error) {
    res.status(503).json({
      success: false,
      messgae: "subsection hi ni update ho ri",
    });
  }
};

exports.deleteSubsection = async (req, res) => {
  try {
    const { subsectionId, sectionId } = req.body;

    if (!subsectionId) {
      req.status(403).json({
        success: false,
        message: "something went wrong",
      });
    }
    await section.findByIdAndUpdate(
      { _id: sectionId },
      {
        $pull: {
          subsection: subsectionId,
        },
      }
    );

    await subsection.findByIdAndDelete(subsectionId);
    const updateSection = await section
      .findById(sectionId)
      .populate("subsection");
    return res.status(201).json({
      success: true,
      message: "subsection is deleted",
      data: updatedSection,
    });
    // do we need to update in course
  } catch (error) {
    res.status(503).json({
      success: false,
      messgae: "subsection hi ni delete ho ri",
    });
  }
};
