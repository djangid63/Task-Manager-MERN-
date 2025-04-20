const adminModel = require("../Models/adminModel")

exports.login = async (req, res) => {
  try {
    const adminData = new adminModel(req.body)
    const saveData = await adminData.save()
    return res.status(201).json({ status: true, message: "Admin log in successfully" })

  } catch (error) {
    return res.status(404).json({ status: false, message: "Admin log in failed" })
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