import taskController from "../controllers/task.js";
import db from "../migrations/index.js";

const task = db.Task;

const taskService = {};

taskService.listAll = async (req, res) => {
  const { query } = req;
  const userId = req.userId;
  try {
    const tasks = await taskController.findAllForListing(userId, query);
    res.status(200).json({ success: 1, tasks });
  } catch (error) {
    res.status(401).json({ success: 0, message: error.message });
  }
};

taskService.createTask = async (req, res) => {
  const value = req.body;
  value.userId = req.userId;
  try {
    const { userId } = value;
    if (!userId) {
      throw new Error("user not found");
    }
    const createTask = await task.create(value);
    res.status(201).json({ success: 1, task: createTask });
  } catch (error) {
    res.status(400).json({ succes: 0, message: "invalid data" });
  }
};

taskService.findTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req;
    const task = await taskController.findOneById(userId, id);
    if (!task) {
      throw new Error("data not found");
    }
    res.status(200).json({ succes: 1, task });
  } catch (error) {
    res.status(404).json({ succes: 0, message: "not found" });
  }
};

taskService.updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req;
    const value = req.body;
    const task = await taskController.findOneById(userId, id);
    if (!task) {
      throw new Error("data not found");
    }
    const updateTask = await taskController.updateById(userId, id, value);
    res.status(200).json({ succes: 1, message: "task updated successFully", task: updateTask });
  } catch (error) {
    res.status(404).json({ succes: 0, message: "not found" });
  }
};

taskService.deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req;
    const task = await taskController.findOneById(userId, id);
    if (!task) {
      throw new Error("data not found");
    }
    const deleteTask = await taskController.deleteById(userId, id);
    if (deleteTask) {
      res.status(200).json({ succes: 1, message: "task deleted successFully" });
    } else {
      throw new Error("task not found");
    }
  } catch (error) {
    console.log(error.stack);
    res.status(404).json({ succes: 0, message: "task not found" });
  }
};
export default taskService;
