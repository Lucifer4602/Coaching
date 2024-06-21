const express = require("express");
const app = express();
const userRoutes = require("./routes/user");
// const profileRoutes = require("./routes/profile");
// const courseRoutes = require("./routes/courses");
// const tagsRoutes = require("./routes/tag");
// const cartRoutes = require("./routes/cart");
const fileUpload = require("express-fileupload");
const { cloudinaryConnect } = require("./cloudinary");

app.listen(3000, () => {
  console.log("hello server is started haha");
});

const db = require("./database");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const contactUs = require("./routes/contact");

app.use(cookieParser());

app.get("/", (req, res) => {
  res.json("done");
});

const corsConfig = {
  origin: "*",
  credential: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
};
app.options("", cors(corsConfig));

app.use(cors(corsConfig));

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp",
  })
);
cloudinaryConnect();

app.use("/api/v1/auth", userRoutes);
// app.use("/api/v1/profile", profileRoutes);
// app.use("/api/v1/course", courseRoutes);
// app.use("/api/v1/tags", tagsRoutes);
// app.use("/api/v1/contact", contactUs);
// app.use("/api/v1/cart", cartRoutes);

db();
