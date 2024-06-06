const mongo = require("mongoose");

const db = () => {
  mongo
    .connect(
      "mongodb+srv://krishnamahajan4602:7YmBTBuyzSRl6Zr4@cluster0.xlzgldp.mongodb.net/?retryWrites=true&w=majority"
    )
    .then(console.log("this service is started"))
    .catch((error) => console.log(error));
};

module.exports = db;
