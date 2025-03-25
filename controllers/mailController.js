const nodemailer = require("nodemailer");
require("dotenv").config();
const { mailTransporter, mailOptions } = require("../config/mailConfig");

exports.sendMail = async (req, res) => {
  const { firstname, lastname, email, message } = req.body;
  const secret = req.headers["secret-key"];
  
  if (process.env.SECRET_KEY === secret) {
    if (!firstname || !lastname || !email || !message) {
      return res.status(400).json({ error: "All fields are required" });
    }

    try {
      await mailTransporter.sendMail(
        mailOptions(firstname, lastname, email, message)
      );
      res.json({ message: `📩 Received a message from ${firstname}` });
    } catch (error) {
      res
        .status(500)
        .json({ error: "Failed to send email", details: error.message });
    }
  } else {
    res.status(403).json({ error: "Forbidden" });
  }
};
