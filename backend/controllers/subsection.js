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

    const video_url = await uploader(video, "Krishna");

    const newSubsection = await subsection.create({
      title,
      duration: video_url.duration,
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
      message: "subsection is created",
      updatedSection,
    });
  } catch (error) {
    res.status(503).json({
      success: false,
      message: "Failed to create subsection",
      error: error.message,
    });
  }
};

exports.updateSubsection = async (req, res) => {
  try {
    const { title, body, duration, subsectionId } = req.body;
    const video = req.files.videoFile;

    if (!title || !body || !duration || !video || !subsectionId) {
      return res.status(403).json({
        success: false,
        message: "All fields are required",
      });
    }

    const video_url = await uploader(video, "Krishna");

    const updatedSubsection = await subsection.findByIdAndUpdate(
      subsectionId,
      { title, body, duration, videoUrl: video_url.secure_url },
      { new: true }
    );

    if (!updatedSubsection) {
      return res.status(404).json({
        success: false,
        message: "Subsection not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Subsection updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update subsection",
      error: error.message,
    });
  }
};

exports.deleteSubsection = async (req, res) => {
  try {
    const { subsectionId, sectionId } = req.query;

    if (!subsectionId) {
      return res.status(410).json({
        success: false,
        message: "Subsection ID is required",
      });
    }

    await section.findByIdAndUpdate(sectionId, {
      $pull: {
        subsection: subsectionId,
      },
    });

    const deletedSubsection = await subsection.findByIdAndDelete(subsectionId);

    if (!deletedSubsection) {
      return res.status(404).json({
        success: false,
        message: "Subsection not found",
      });
    }

    const updatedSection = await section
      .findById(sectionId)
      .populate("subsection");

    return res.status(200).json({
      success: true,
      message: "Subsection deleted successfully",
      data: updatedSection,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete subsection",
      error: error.message,
    });
  }
};
