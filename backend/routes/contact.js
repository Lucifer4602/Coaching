const express = require("express");
const router = express.Router();
const { contactUs } = require("../controllers/contactUs");

router.post("/form", contactUs);

module.exports = router;
