const nodemailer = require('nodemailer');

const createTransporter = (email, mailkey) => {
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: "jangiddummy6375@gmail.com",
      pass: "hneo ulux pgln lgts"
    }
  });
};

const sendOtpEmail = async (email, otp, firstname, senderEmail, mailkey) => {
  try {
    const transporter = createTransporter(senderEmail, mailkey);
    const mailOptions = {
      from: "jangiddummy6375@gmail.com",
      to: email,
      subject: 'Your OTP Verification Code',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>Hello ${firstname},</h2>
          <p>Your verification code is:</p>
          <h1 style="background-color: #f4f4f4; padding: 10px; text-align: center; font-size: 32px; letter-spacing: 5px;">${otp}</h1>
          <p>This code will expire in 10 minutes.</p>
          <p>If you didn't request this code, please ignore this email.</p>
        </div>
      `
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent: ', info.messageId);
    return true;
  } catch (error) {
    console.error('Error sending email: ', error);
    return false;
  }
};

const sendCreationEmail = async (email, firstname, lastname, task, senderEmail, mailkey) => {
  try {
    const transporter = createTransporter(senderEmail, mailkey);
    const mailOptions = {
      from: "jangiddummy6375@gmail.com",
      to: email,
      subject: 'Task Created Successfully',
      html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 5px;">
        <h2>Hello ${firstname} ${lastname},</h2>
        <p>Your task has been created successfully!</p>
        <div style="background-color: #f8f9fa; padding: 15px; margin: 20px 0; border-left: 4px solid #4CAF50;">
        <p>You can view and manage your tasks from your dashboard.</p>
        </div>
        <p>If you have any questions or need assistance, please feel free to contact our support team.</p>
        <p style="margin-top: 20px; color: #666;">Thank you for using our Task Manager!</p>
      </div>
      `
    };
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent: ', info.messageId);
    return true;
  } catch (error) {
    console.error('Error sending email: ', error);
    return false;
  }
}

module.exports = { sendOtpEmail };
module.exports = { sendCreationEmail };