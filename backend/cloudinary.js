const cloudinary = require("cloudinary").v2; //! Cloudinary is being required

exports.cloudinaryConnect = () => {
  try {
    cloudinary.config({
      //!    ########   Configuring the Cloudinary to Upload MEDIA ########
      cloud_name: "dgsmzzoph",
      api_key: "771467382377697",
      api_secret: "IHsN-a-2QWhn3FzXrxMh1gjAtkM",
    });
  } catch (error) {
    console.log(error);
  }
};
