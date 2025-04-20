const taskModel = require('../Models/taskModel')

exports.getTasks = async (req, res) => {
  try {
    // Only find tasks that are not disabled
    const getAll = await taskModel.find({ isDisabled: { $ne: true } }).populate('userId');
    return res.status(200).json({ success: true, message: "Fetching all data successful", taskData: getAll })
  } catch (error) {
    return res.status(401).json({ success: false, message: "Failed to fetch data" })
  }
}

exports.addTask = async (req, res) => {
  try {
    req.body.userId = req.user._id
    console.log(req.body);
    const taskData = new taskModel(req.body);
    const saveTask = await taskData.save();

    const populatedTask = await taskModel.findById(saveTask._id)
      .populate('userId')
 

    return res.status(201).json({
      success: true,
      message: "Task added successfully",
      task: populatedTask
    });
  } catch (error) {
    console.log("-------task--------", error);
    return res.status(401).json({ success: false, message: "Failed to add task" });
  }
}

exports.updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedTask = req.body;

    const task = await taskModel.findByIdAndUpdate(id, updatedTask, { new: true })
      .populate('userId');

    if (!task) {
      return res.status(404).json({ success: false, message: "Task not found" });
    }

    return res.status(200).json({ success: true, message: "Task updated successfully", task });
  } catch (error) {
    console.log("--------task update---------", error);
    return res.status(500).json({ success: false, message: "Failed to update task" });
  }
}

exports.deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ success: false, message: "Task ID is required" });
    }

    const selectTask = await taskModel.findByIdAndUpdate(
      id,
      { isDisabled: true },
      { new: true }
    );

    if (!selectTask) {
      return res.status(404).json({ success: false, message: "Task not found" });
    }

    return res.status(200).json({ success: true, message: "Task disabled successfully" });
  } catch (error) {
    console.log("--------task disable---------", error);
    return res.status(500).json({ success: false, message: "Failed to disable task" });
  }
}


// Get tasks for the logged-in user with populated user data
exports.getUserTasks = async (req, res) => {
  try {
    const userId = req.user._id;

    // Find tasks for the user only if they are not disabled
    const tasks = await taskModel.find({ userId, isDisabled: false })
      .populate('userId');

    return res.status(200).json({
      success: true,
      message: "User tasks fetched successfully",
      taskData: tasks
    });
  } catch (error) {
    console.log("--------get user tasks---------", error);
    return res.status(500).json({ success: false, message: "Failed to fetch user tasks" });
  }
}