const SubSection = require("../models/subsection");
const Progress = require("../models/progress");

exports.updateCourseProgress = async (req, res) => {
  try {
    const { courseId, subsectionId } = req.body;

    const user = req.user.id;

    const subsection = await SubSection.findById(subsectionId);

    if (!subsection) {
      return res.status(404).json({ error: "Invalid subsection" });
    }

    let CourseProgress = await Progress.findOne({
      courseId: courseId,
      userId: user,
    });

    if (!CourseProgress) {
      return res.status(403).json({
        error: "cant find progress",
      });
    } else {
      if (CourseProgress.compeleted.includes(subsection)) {
        return res.status(400).json({ error: "Subsection already completed" });
      }

      CourseProgress.compeleted.push(subsectionId);
    }

    await CourseProgress.save();

    return res.status(200).json({ message: "Course progress updated" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
