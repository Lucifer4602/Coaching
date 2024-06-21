const express = require("express");
const app = express();
const userRoutes = require("./routes/user");
const profileRoutes = require("./routes/profile");
const courseRoutes = require("./routes/courses");
const tagsRoutes = require("./routes/tag");
const cartRoutes = require("./routes/cart");
const fileUpload = require("express-fileupload");
const { cloudinaryConnect } = require("./cloudinary");
const db = require("./database");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const { contactUs } = require("./controllers/contactUs");

// Middleware
app.use(express.json());
app.use(cookieParser());

// CORS Configuration
// const corsConfig = {
//   origin: "*",
//   credentials: true,
//   methods: ["GET", "POST", "PUT", "DELETE"],
// };
// app.use(cors(corsConfig));
// app.options("*", cors(corsConfig));  // Handle preflight requests

// File Upload Configuration
// app.use(
//   fileUpload({
//     useTempFiles: true,
//     tempFileDir: "/tmp",
//   })
// );
// cloudinaryConnect();

// Routes
// app.use("/api/v1/auth", userRoutes);
// app.use("/api/v1/profile", profileRoutes);
// app.use("/api/v1/course", courseRoutes);
// app.use("/api/v1/tags", tagsRoutes);
// app.use("/api/v1/contact", contactUs);
// app.use("/api/v1/cart", cartRoutes);

// Root Route
app.get("/", (req, res) => {
  res.json("done");
});

// Database Connection
db();

// Server Listener
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
