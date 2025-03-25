const nodemailer = require('nodemailer');
require('dotenv').config();

exports.mailTransporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

exports.mailOptions = (firstname, lastname, email, message) => ({
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER, // Change this to your receiving email
    subject: `New Message from ${firstname} ${lastname}`,
    text: `You have received a new message from:
    
    Name: ${firstname} ${lastname}
    Email: ${email}
    
    Message: 
    "${message}"
    `
});
