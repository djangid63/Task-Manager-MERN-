const userModel = require('../Models/UserModel')
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken")
const secretKey = "abcsdalfhdslf"


exports.SignUpUser = async (req, res) => {
  try {
    const { firstname, lastname, email, password } = req.body

    const isMailExists = await userModel.findOne({ email })

    if (isMailExists) {
      return res.status(409).json({ status: false, message: "Email already exists" })
    }

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt)


    const signData = new userModel({ firstname, lastname, email, password: hashedPassword })
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