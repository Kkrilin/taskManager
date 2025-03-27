import db from "../migrations/index.js";

const task = db.Task;
const user = db.User;

const taskController = {};

// taskController.createTask = async () => {}

const sortingObjMap = {
  asc: "ASC",
  desc: "DESC",
};

const filterObject = {
  priority: ["low", "medium", "high"],
  status: ["pending", "completed"],
};
taskController.findAllForListing = async (userId, query = {}) => {
  const filter = {
    where: {
      userId,
    },
    order: [],
    // include: [{ model: user }],
  };

  if (filterObject.priority.includes(query.priority)) {
    filter.where.priority = query.priority;
  }
  if (filterObject.status.includes(query.status)) {
    filter.where.status = query.status;
  }
  if (query.startDate || query.endDate) {
    filter.where.dueDate = {};
    if (query.startDate) {
      filter.where.dueDate[Op.gte] = query.startDate; // Greater than or equal to startDate
    }
    if (query.endDate) {
      filter.where.dueDate[Op.lte] = query.endDate; // Less than or equal to endDate
    }
  }

  if (query.dueDate && sortingObjMap[query.dueDate]) {
    filter.order.push(["dueDate", sortingObjMap[query.dueDate]]);
  }

  if (query.prioritySort && sortingObjMap[query.prioritySort]) {
    filter.order.push(["priority", sortingObjMap[query.prioritySort]]);
  }
  return task.findAll(filter);
};

taskController.findOneById = async (userId, id) => {
  const filter = {
    where: {
      userId,
      id,
    },
  };
  return task.findOne(filter);
};

taskController.updateById = async (userId, id, value) => {
  const filter = {
    where: {
      userId,
      id,
    },
  };
  return task.update(value, filter);
};

taskController.deleteById = async (userId, id) => {
  const filter = {
    where: {
      // userId,
      id,
    },
  };
  return task.destroy(filter);
};

export default taskController;
