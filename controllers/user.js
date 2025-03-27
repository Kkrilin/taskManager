import db from '../migrations/index.js';
import bcrypt from 'bcrypt';

const user = db.User;
const task = db.Task;

const UserController = {};

UserController.findOneByName = (name) => {
  const filter = {
    where: {
      name,
    },
  };
  return user.findOne(filter);
};

UserController.findOneByEmail = (email) => {
  const filter = {
    where: {
      email,
    },
  };
  return user.findOne(filter);
};

UserController.registerUser = async (value = {}) => {
  if ((!value.name || !value.email, !value.password)) {
    throw new Error('Invalid Data');
  }
  value.password = await bcrypt.hash(value.password, 10);
  const registeredUser = await user.create(value);
  if (!registeredUser) {
    throw new Error('user can not be created');
  }
  return registeredUser;
};

UserController.findAllForListing = async (userId) => {
  const filter = {
    where: {
      id: userId,
    },
    attributes: ['id', 'name', 'email'],
    include: [
      {
        model: task,
        // attributes: ["title", "description", "priority"],
      },
    ],
  };
  return user.findAll(filter);
};

export default UserController;
