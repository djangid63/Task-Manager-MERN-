const adminModel = require("../Models/adminModel")
const bcrypt = require('bcrypt')


exports.Signup = async (req, res) => {
  try {
    const { name, email, password } = req.body

    const isMailExists = await adminModel.findOne({ email })

    if (isMailExists) {
      return res.status(409).json({ status: false, message: "Email already exists" })
    }

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt)

    const signData = new adminModel({ name, email, password: hashedPassword })
    const saveData = await signData.save()

    return res.status(201).json({ success: true, message: "Sign up successfully", data: saveData })
  } catch (error) {
    console.log("User sign up failed :", error);
    return res.status(400).json({ success: false, message: "Sign up failed" })
  }
}

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const isExistingUser = await adminModel.findOne({ email })

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

  return res.status(201).json({ success: true, message: "Login successful" })
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

exports.toggleAccess = async (req, res) => {
  try {
    const { adminId, isDisabled } = req.body;

    if (!adminId) {
      return res.status(400).json({ success: false, message: "Admin ID is required" });
    }

    const updatedAdmin = await adminModel.findByIdAndUpdate(
      adminId,
      { isDisabled },
      { new: true }
    );

    if (!updatedAdmin) {
      return res.status(404).json({ success: false, message: "Admin not found" });
    }

    const status = isDisabled ? "disabled" : "enabled";

    return res.status(200).json({
      success: true,
      message: `Admin access ${status} successfully`,
      admin: updatedAdmin
    });
  } catch (error) {
    console.log("--------toggle admin access---------", error);
    return res.status(500).json({ success: false, message: "Failed to toggle admin access" });
  }
}