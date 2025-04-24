const taskModel = require('../Models/taskModel')
const userModel = require('../Models/UserModel')

exports.getTasks = async (req, res) => {
  try {
    const getAll = await taskModel.find({ isDisabled: false })
      .populate({
        path: 'userId',
        model: 'user'
      })
      .populate({
        path: 'assignedTo',
        model: 'user'
      })
    return res.status(200).json({ success: true, message: "Fetching all data successful", taskData: getAll })
  } catch (error) {
    return res.status(401).json({ success: false, message: "Failed to fetch data" })
  }
}

exports.getDisabledTasks = async (req, res) => {
  try {
    const disabledTasks = await taskModel.find({ isDisabled: true }).populate('userId');
    return res.status(200).json({ success: true, message: "Fetching disabled tasks successful", taskData: disabledTasks })
  } catch (error) {
    return res.status(401).json({ success: false, message: "Failed to fetch disabled tasks" })
  }
}

exports.addTask = async (req, res) => {
  try {
    req.body.userId = req.user._id

    const taskData = new taskModel(req.body);
    const saveTask = await taskData.save();

    const populatedTask = await taskModel.findById(saveTask._id)
      .populate({
        path: 'userId',
        model: 'user'
      })
      .populate({
        path: 'assignedTo',
        model: 'user'
      });

    return res.status(201).json({
      success: true,
      message: "Task added successfully",
      task: populatedTask
    });

  } catch (error) {
    console.log("-------task--------", error);
    return res.status(401).json({ success: false, message: `Failed to add task, ${error}` });
  }
}

exports.updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedTask = req.body;

    const task = await taskModel.findByIdAndUpdate(id, updatedTask, { new: true })
      .populate('userId')
      .populate('assignedTo');

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


exports.count = async (req, res) => {
  try {
    const totalTask = await taskModel.countDocuments({ isDisabled: false });
    return res.status(200).json({ status: true, count: totalTask });
  } catch (error) {
    return res.status(500).json({ status: false, message: "Failed to count task", error: error.message });
  }
}

exports.disableCount = async (req, res) => {
  try {
    const totalTask = await taskModel.countDocuments({ isDisabled: true });
    return res.status(200).json({ status: true, count: totalTask });
  } catch (error) {
    return res.status(500).json({ status: false, message: "Failed to count task", error: error.message });
  }
}

exports.getUserTasks = async (req, res) => {
  try {
    const tasks = await taskModel.find({ isDisabled: false })
      .populate('userId')
      .populate('assignedTo');
    console.log("tasks-------", tasks);
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

exports.updateTaskStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    // Validate the status value
    if (!['pending', 'completed'].includes(status)) {
      return res.status(400).json({ success: false, message: "Invalid status value" });
    }

    const task = await taskModel.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    )
      .populate('userId')
      .populate('assignedTo');

    if (!task) {
      return res.status(404).json({ success: false, message: "Task not found" });
    }

    return res.status(200).json({
      success: true,
      message: `Task marked as ${status}`,
      task
    });
  } catch (error) {
    console.log("--------task status update---------", error);
    return res.status(500).json({ success: false, message: "Failed to update task status" });
  }
}


