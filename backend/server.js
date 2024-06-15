const express = require("express");
const app = express();
const userRoutes = require("./routes/user");
const profileRoutes = require("./routes/profile");
const courseRoutes = require("./routes/courses");
const tagsRoutes = require("./routes/tag");
const cartRoutes = require("./routes/cart");
const fileUpload = require("express-fileupload");
const { cloudinaryConnect } = require("./cloudinary");

app.use(express.json());

app.listen(3000, () => {
  console.log("hello server is started haha");
});

const db = require("./database");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const { contactUs } = require("./controllers/contactUs");

app.use(express.json());
app.use(cookieParser());
const allowedOrigins = ["http://localhost:3000", "http://localhost:5173"];

// Enable CORS for specific origins
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
  })
);

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp",
  })
);
cloudinaryConnect();

app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/course", courseRoutes);
app.use("/api/v1/tags", tagsRoutes);
app.use("/api/v1/contact", contactUs);
app.use("/api/v1/cart", cartRoutes);

db();
