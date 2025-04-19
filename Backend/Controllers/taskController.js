const taskModel = require('../Models/taskModel')

exports.getTasks = async (req, res) => {
  try {
    const getAll = await taskModel.find().populate('userId', 'name email'); // Populating user info
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

    // Fetch the saved task with populated user data
    const populatedTask = await taskModel.findById(saveTask._id).populate('userId', 'name email');

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
      .populate('userId', 'name email');

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

    const selectTask = await taskModel.findByIdAndDelete(id);

    if (!selectTask) {
      return res.status(404).json({ success: false, message: "Task not found" });
    }

    return res.status(200).json({ success: true, message: "Task deleted successfully" });
  } catch (error) {
    console.log("--------task delete---------", error);
    return res.status(500).json({ success: false, message: "Failed to delete task" });
  }
}

// Get task by ID with populated user information
exports.getTaskById = async (req, res) => {
  try {
    const { id } = req.params;

    const task = await taskModel.findById(id).populate('userId', 'name email');

    if (!task) {
      return res.status(404).json({ success: false, message: "Task not found" });
    }

    return res.status(200).json({ success: true, task });
  } catch (error) {
    console.log("--------get task by id---------", error);
    return res.status(500).json({ success: false, message: "Failed to fetch task" });
  }
}

// Get tasks for the logged-in user with populated user data
exports.getUserTasks = async (req, res) => {
  try {
    const userId = req.user._id;

    const tasks = await taskModel.find({ userId }).populate('userId', 'name email');

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