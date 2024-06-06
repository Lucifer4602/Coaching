const nodemailer = require("nodemailer");

const sender = async (email, title, body) => {
  try {
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      auth: {
        user: "dummymailer4602@gmail.com",
        pass: "gykisgbifmajlwxw",
      },
    });

    let message = await transporter.sendMail({
      from: "Lucifer from HELL",
      to: `${email}`,
      subject: `${title}`,
      html: `${body}`,
    });

    console.log(message);
    return message;
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = sender;
