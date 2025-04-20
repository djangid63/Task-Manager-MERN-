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

exports.getAdmins = async (req, res) => {
  try {

    // Find tasks for the user only if they are not disabled
    const admins = await adminModel.find()
    console.log("---------admins----------", admins);

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