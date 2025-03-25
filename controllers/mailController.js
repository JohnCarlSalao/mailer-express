const nodemailer = require('nodemailer');
const { mailTransporter, mailOptions } = require('../config/mailConfig');

exports.sendMail = async (req, res) => {
    const { firstname, lastname, email, message } = req.body;

    if (!firstname || !lastname || !email || !message) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        await mailTransporter.sendMail(mailOptions(firstname, lastname, email, message));
        res.json({ message: `📩 Received a message from ${firstname}` });
    } catch (error) {
        res.status(500).json({ error: 'Failed to send email', details: error.message });
    }
};
