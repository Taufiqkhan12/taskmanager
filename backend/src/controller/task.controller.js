import { Task } from "../models/task.model.js";
import { User } from "../models/user.model.js";

const createTask = async (req, res, next) => {
  try {
    const userId = req.user;
    const role = req.role;

    if (!["admin", "manager"].includes(role)) {
      return res.status(403).json({
        message: "Access denied. Only Admin or Manager can create tasks.",
      });
    }

    const { title, description, assignedTo } = req.body;

    if (!title || !assignedTo) {
      return res
        .status(400)
        .json({ message: "Title and assigned user are required" });
    }

    const assignee = await User.findById(assignedTo);

    if (!assignee) {
      return res.status(404).json({ message: "Assigned user not found" });
    }

    const task = await Task.create({
      title,
      description,
      assignedTo: assignee._id,
      createdBy: userId,
    });

    const populatedTask = await task.populate("assignedTo", "name email role");

    return res.status(201).json({
      message: "Task created and assigned successfully",
      task: populatedTask,
    });
  } catch (error) {
    next(error);
  }
};

const getTaskCreatedBy = async (req, res, next) => {
  try {
    const userId = req.user;
    const role = req.role;

    if (role === "user") {
      filter.assignedTo = userId;
    } else if (role === "manager" || role === "admin") {
      filter = {};
    }

    const tasks = await Task.find(filter)
      .populate("assignedTo", "name email role")
      .populate("createdBy", "name email role")
      .sort({ createdAt: -1 });

    res.status(200).json({ tasks });
  } catch (error) {
    next();
  }
};

export { createTask, getTaskCreatedBy };
