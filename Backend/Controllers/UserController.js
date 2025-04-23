const userModel = require('../Models/UserModel')
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken")
const secretKey = "abcsdalfhdslf"
const moment = require('moment')

const { sendOtpEmail } = require('../Utils/emailService');

// Your sender email for Nodemailer
const SENDER_EMAIL = "jangiddummy6375@gmail.com";
const mailkey = "hneo ulux pgln lgts"


exports.SignUpUser = async (req, res) => {
  try {
    const { firstname, lastname, email, password } = req.body

    const isMailExists = await userModel.findOne({ email })

    if (isMailExists) {
      return res.status(409).json({ status: false, message: "Email already exists" })
    }

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt)

    const otp = Math.floor((Math.random() * 9000000) + 10000)
    const currTimer = moment()
    const otpTimer = currTimer.clone().add(10, "minutes");

    // OTP Sended to the user
    const emailSent = await sendOtpEmail(email, otp, firstname, SENDER_EMAIL, mailkey);
    if (!emailSent) {
      return res.status(500).json({ message: "Failed to send OTP email" });
    }

    const signData = new userModel({ firstname, lastname, email, password: hashedPassword, otp, otpTimer })
    const saveData = await signData.save()
    return res.status(201).json({ success: true, message: "Sign up successfully", data: saveData })
  } catch (error) {
    console.log("User sign up failed :", error);
    return res.status(400).json({ success: false, message: "Sign up failed" })
  }
}

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const isExistingUser = await userModel.findOne({ email })

  if (!isExistingUser.isDisabled == false) {
    return res.status(404).json({ message: "Access revoked" })
  }

  if (!isExistingUser) {
    return res.status(404).json({ message: "Please sign up before logging" })
  }

  const dbPassword = isExistingUser.password;

  const isMatch = bcrypt.compareSync(password, dbPassword)
  if (!isMatch) {
    return res.status(404).json({ success: false, message: "Password is incorrect" })
  }

  const token = jwt.sign({ email }, secretKey)
  console.log(token);

  return res.status(201).json({ success: true, message: "Login successful", token })
}

exports.count = async (req, res) => {
  try {
    const totalUser = await userModel.countDocuments();
    return res.status(200).json({ status: true, count: totalUser });
  } catch (error) {
    return res.status(500).json({ status: false, message: "Failed to count user", error: error.message });
  }
}

exports.getUsers = async (req, res) => {
  try {

    // Find tasks for the user only if they are not disabled
    const users = await userModel.find()

    return res.status(200).json({
      success: true,
      message: "Users data fetched successfully",
      userData: users
    });
  } catch (error) {
    console.log("--------get Users---------", error);
    return res.status(500).json({ success: false, message: "Failed to fetch Users" });
  }
}

exports.toggleAccess = async (req, res) => {
  try {
    const { userId, isDisabled } = req.body;

    if (!userId) {
      return res.status(400).json({ success: false, message: "User ID is required" });
    }

    const updatedUser = await userModel.findByIdAndUpdate(
      userId,
      { isDisabled },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const status = isDisabled ? "disabled" : "enabled";

    return res.status(200).json({
      success: true,
      message: `User access ${status} successfully`,
      user: updatedUser
    });
  } catch (error) {
    console.log("--------toggle user access---------", error);
    return res.status(500).json({ success: false, message: "Failed to toggle user access" });
  }
}