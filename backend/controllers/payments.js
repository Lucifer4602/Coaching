const { payments } = require("../Razorpay");
const course = require("../models/course");
const mailsender = require("../utils/mailSender");
const user = require("../models/user");
const { default: mongoose } = require("mongoose");

exports.capturePayments = async (req, res) => {
  try {
    const { course_id } = req.body;

    const userId = req.user.id;

    if (!courseId) {
      return res.json({
        success: false,
        message: "please provide valid course Id",
      });
    }

    let course_details = await course.findById(course_id);
    if (!course_details) {
      return res.json({
        success: false,
        message: "could not find course",
      });
    }

    const uid = new mongoose.Types.ObjectId(userId);
    if (course_details.studentsEnrolled.includes(uid)) {
      return res.status(400).json({
        success: false,
        message: "you akready have this course",
      });
    }

    const amount = course_details.price;
    const currency = "INR";

    const options = {
      amount: amount * 100,
      currency,
      reciept: Math.random(Date.now()).toString(),
      notes: {
        courseId: course_id,
        userId,
      },
    };

    try {
      const paymentResponse = await payments.orders.create(options);
      return res.status(202).json({
        success: true,
        courseName: course_details.courseName,
        courseDescription: course_details.courseDescription,
        thumbnail: course_details.thumbnail,
        orderId: paymentResponse.id,
        currency: paymentResponse.currency,
        amount: paymentResponse.amount,
      });
    } catch (error) {
      res.status(504).json({
        success: false,
        message: "payment can not be done right now",
      });
    }
  } catch (error) {
    res.status(504).json({
      success: false,
      message: "this is not right thing",
    });
  }
};

exports.verifySignature = async (req, res) => {
  try {
    const secret = "12345678";

    const signature = req.headers("x-razorpay-signature");

    const shasum = crypto.createHmac("sha256", secret);
    shasum.update(JSON.stringify(req.body));
    const digest = shasum.digest("hex");

    if (secret === signature) {
      const { courseId, userId } = req.body.payment.entity.note;
      try {
        const updateCourse = await course.findByIdAndUpdate(
          { _id: courseId },
          { $push: { studentsEnrolled: userId } },
          { new: true }
        );
        if (!updateCourse) {
          return res.status(402).json({
            success: false,
            message: "course not found",
          });
        }
        const updateStudent = await user.findByIdAndUpdate(
          userId,
          { $push: { courses: courseId } },
          { new: true }
        );

        if (!updateStudent) {
          return res.status(403).json({
            success: false,
            message: "student not found",
          });
        }

        const mailer = await mailsender(
          updateStudent.email,
          "you are onboarded into new course",
          "congrats from krishna gupta"
        );

        return res.status(200).json({
          success: true,
          message: "you successfully tackled this",
        });
      } catch (error) {
        return res.status(403).json({
          success: false,
          message: "Secret not match",
        });
      }
    }
  } catch (error) {
    res.status(504).json({
      success: false,
      message: "signature is not working",
    });
  }
};

exports.sendPaymentSuccessEmail = async (req, res) => {
  const { orderId, paymentId, amount } = req.body;

  const userId = req.user.id;

  if (!orderId || !paymentId || !amount || !userId) {
    return res
      .status(400)
      .json({ success: false, message: "Please provide all the details" });
  }

  try {
    const enrolledStudent = await User.findById(userId);

    await mailSender(
      enrolledStudent.email,
      `Payment Received`,
      paymentSuccessEmail(
        `${enrolledStudent.firstName} ${enrolledStudent.lastName}`,
        amount / 100,
        orderId,
        paymentId
      )
    );
  } catch (error) {
    console.log("error in sending mail", error);
    return res
      .status(400)
      .json({ success: false, message: "Could not send email" });
  }
};

const enrollStudents = async (courses, userId, res) => {
  if (!courses || !userId) {
    return res.status(400).json({
      success: false,
      message: "Please Provide Course ID and User ID",
    });
  }

  for (const courseId of courses) {
    try {
      // Find the course and enroll the student in it
      const enrolledCourse = await Course.findOneAndUpdate(
        { _id: courseId },
        { $push: { studentsEnroled: userId } },
        { new: true }
      );

      if (!enrolledCourse) {
        return res
          .status(500)
          .json({ success: false, error: "Course not found" });
      }
      console.log("Updated course: ", enrolledCourse);

      const courseProgress = await CourseProgress.create({
        courseID: courseId,
        userId: userId,
        completedVideos: [],
      });
      // Find the student and add the course to their list of enrolled courses
      const enrolledStudent = await User.findByIdAndUpdate(
        userId,
        {
          $push: {
            courses: courseId,
            courseProgress: courseProgress._id,
          },
        },
        { new: true }
      );

      console.log("Enrolled student: ", enrolledStudent);
      // Send an email notification to the enrolled student
      const emailResponse = await mailSender(
        enrolledStudent.email,
        `Successfully Enrolled into ${enrolledCourse.courseName}`,
        courseEnrollmentEmail(
          enrolledCourse.courseName,
          `${enrolledStudent.firstName} ${enrolledStudent.lastName}`
        )
      );

      console.log("Email sent successfully: ", emailResponse.response);
    } catch (error) {
      console.log(error);
      return res.status(400).json({ success: false, error: error.message });
    }
  }
};

//payments kaise krni h yeh dekhio
