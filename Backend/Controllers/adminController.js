const adminModel = require("../Models/adminModel")
const bcrypt = require('bcrypt')

exports.login = async (req, res) => {
  try {
    const { name, email, password } = req.body
    const isMailExists = await adminModel.findOne({ email })

    if (isMailExists) {
      return res.status(409).json({ status: false, message: "Email already exists" })
    }

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt)

    const adminData = new adminModel({ name, email, password: hashedPassword })
    const saveData = await adminData.save()
    return res.status(201).json({ status: true, message: "Admin log in successfully" })

  } catch (error) {
    return res.status(404).json({ status: false, message: `Admin log in failed, ${error}` })
  }
}

exports.count = async (req, res) => {
  try {
    const totalAdmin = await adminModel.countDocuments();
    return res.status(200).json({ status: true, count: totalAdmin });
  } catch (error) {
    return res.status(500).json({ status: false, message: "Failed to count admins", error: error.message });
  }
}

exports.getAdmins = async (req, res) => {
  try {

    const admins = await adminModel.find()

    return res.status(200).json({
      success: true,
      message: "Admins data fetched successfully",
      AdminData: admins
    });
  } catch (error) {
    console.log("--------get admins---------", error);
    return res.status(500).json({ success: false, message: "Failed to fetch Admins" });
  }
}