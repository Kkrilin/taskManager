import db from '../models/index.js';

const task = db.Task;
const user = db.User;
const Op = db.Op;
const Segualize = db.Sequelize;

const taskController = {};

// taskController.createTask = async () => {}

const limit = 10;
let offset = 0;

const sortingObjMap = {
  asc: 'ASC',
  desc: 'DESC',
};

const filterObject = {
  priority: ['low', 'medium', 'high'],
  status: ['pending', 'completed'],
};

// query to assign proority value as integer to sort
const queryForPrioritySort = `case when priority = 'low' then 1
                                    when priority = 'medium' then 2
                                    when priority = 'high' then 3
                                    end`;

// tasks for listing with pagination, filtering and sorting
taskController.findAllForListing = async (userId, query = {}) => {
  const filter = {
    where: {
      userId,
    },
    order: [['updatedAt', 'DESC']],
    limit,
  };

  if (query.priority) {
    if (Array.isArray(query.priority)) {
      filter.where.priority = {};
      filter.where.priority[Op.in] = query.priority;
    } else {
      filter.where.priority = query.priority;
    }
  }
  if (filterObject.status.includes(query.status)) {
    filter.where.status = query.status;
  }
  if (query.startDate || query.endDate) {
    filter.where.dueDate = {};
    if (query.startDate) {
      filter.where.dueDate[Op.gte] = query.startDate;
    }
    if (query.endDate) {
      filter.where.dueDate[Op.lte] = query.endDate;
    }
  }
  if (query.dueDate || query.prioritySort) {
    filter.order = [];
    if (query.dueDate && sortingObjMap[query.dueDate]) {
      filter.order.push(['dueDate', sortingObjMap[query.dueDate]]);
    }

    if (query.prioritySort && sortingObjMap[query.prioritySort]) {
      filter.order.push([
        Segualize.literal(queryForPrioritySort),
        sortingObjMap[query.prioritySort],
      ]);
    }
  }
  if (query.page > 1) {
    const page = query.page;
    offset = limit * (page - 1);
    filter.offset = offset;
  }
  return task.findAll(filter);
};

// get task by id
taskController.findOneById = async (userId, id) => {
  const filter = {
    where: {
      userId,
      id,
    },
  };
  return task.findOne(filter);
};

// update task by id
taskController.updateById = async (userId, id, value) => {
  const filter = {
    where: {
      userId,
      id,
    },
  };
  return task.update(value, filter);
};

// delete task by id (soft delete)
taskController.deleteById = async (userId, id) => {
  const filter = {
    where: {
      userId,
      id,
    },
  };
  return task.destroy(filter);
};

export default taskController;
