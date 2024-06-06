const jwt = require("jsonwebtoken");
const user = require("../models/user");
// general

exports.auth = async (req, res, next) => {
  try {
    const token =
      req.cookies.token ||
      req.body.token ||
      req.header("Authorization").replace("Bearer ", "");
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "token ni h bhai",
      });
    }

    try {
      const payload = await jwt.verify(
        token,
        "my-32-character-ultra-secure-and-ultra-long-secret"
      );

      req.user = payload;
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: "token galat dera h bhai",
      });
    }
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "validate ni ho ra kuch b",
    });
  }
};

// is student
exports.isStudent = async (req, res, next) => {
  try {
    if (req.user.role !== "student") {
      return res.status(401).json({
        success: success,
        message: "this is brocode of student",
      });
    }
    next();
  } catch (error) {
    return res.status(501).json({
      success: false,
      message: "verification m dikkat h sir",
    });
  }
};

//is instructor
exports.isInstructor = async (req, res, next) => {
  try {
    if (req.user.role !== "instructor") {
      return res.status(401).json({
        success: success,
        message: "this is brocode of instructor",
      });
    }
    next();
  } catch (error) {
    return res.status(501).json({
      success: false,
      message: "verification m dikkat h sir",
    });
  }
};

//is admin
exports.isAdmin = async (req, res, next) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(401).json({
        success: success,
        message: "this is brocode of admin",
      });
    }
    next();
  } catch (error) {
    return res.status(501).json({
      success: false,
      message: "verification m dikkat h sir",
    });
  }
};
