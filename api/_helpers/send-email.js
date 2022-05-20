const nodemailer = require('nodemailer');
// @ts-ignore
const config = require('config.json');

module.exports = sendEmail;

async function sendEmail({ to, subject, html, from = config.emailFrom }) {
    const transporter = nodemailer.createTransport(config.smtpOptions);
    await transporter.sendMail({ from, to, subject, html });
}