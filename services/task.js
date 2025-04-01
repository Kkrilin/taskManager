import taskController from '../controllers/task.js';
import db from '../models/index.js';

const task = db.Task;

const taskService = {};

// paginated listing tasks
taskService.listAll = async (req, res, next) => {
  const {query} = req;
  const userId = req.userId;
  try {
    const tasks = await taskController.findAllForListing(userId, query);
    res.status(200).json({success: 1, tasks});
  } catch (error) {
    error.status = 401;
    next(error);
  }
};

// create task
taskService.createTask = async (req, res, next) => {
  const value = req.body;
  value.userId = req.userId;
  try {
    const {userId} = value;
    if (!userId) {
      throw new Error('user not found');
    }
    const createTask = await task.create(value);
    res.status(201).json({success: 1, task: createTask});
  } catch (error) {
    error.status = 400;
    next(error);
  }
};

// get task by id
taskService.findTask = async (req, res, next) => {
  try {
    const {id} = req.params;
    const {userId} = req;
    const task = await taskController.findOneById(userId, id);
    if (!task) {
      throw new Error('data not found');
    }
    res.status(200).json({succes: 1, task});
  } catch (error) {
    error.status = 404;
    next(error);
  }
};

// update task by id
taskService.updateTask = async (req, res, next) => {
  try {
    const {id} = req.params;
    const {userId} = req;
    const value = req.body;
    const task = await taskController.findOneById(userId, id);
    if (!task) {
      throw new Error('data not found');
    }
    const updateTask = await taskController.updateById(userId, id, value);
    res.status(200).json({
      succes: 1,
      message: 'task updated successFully',
      task: updateTask,
    });
  } catch (error) {
    error.status = 404;
    next(error);
  }
};

//  soft delete task by id
taskService.deleteTask = async (req, res, next) => {
  try {
    const {id} = req.params;
    const {userId} = req;
    const task = await taskController.findOneById(userId, id);
    if (!task) {
      throw new Error('data not found');
    }
    const deleteTask = await taskController.deleteById(userId, id);
    if (deleteTask) {
      res.status(200).json({succes: 1, message: 'task deleted successFully'});
    } else {
      throw new Error('task not found');
    }
  } catch (error) {
    error.status = 404;
    next(error);
  }
};
export default taskService;
