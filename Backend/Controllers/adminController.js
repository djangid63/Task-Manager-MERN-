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