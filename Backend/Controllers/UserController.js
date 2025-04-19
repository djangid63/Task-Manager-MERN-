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
    return res.status(201).json({ success: true, message: "Sign up successfully" })
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