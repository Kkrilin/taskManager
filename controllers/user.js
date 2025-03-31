import db from '../models/index.js';
import bcrypt from 'bcrypt';

const user = db.User;
const task = db.Task;

const UserController = {};

// find user by name
UserController.findOneByName = (name) => {
  const filter = {
    where: {
      name,
    },
  };
  return user.findOne(filter);
};

// find user by email
UserController.findOneByEmail = (email) => {
  const filter = {
    where: {
      email,
    },
  };
  return user.findOne(filter);
};

// register  the user
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

// get tasks for when user login
UserController.findAllForListing = async (userId) => {
  const filter = {
    where: {
      id: userId,
    },
    attributes: ['id', 'name', 'email'],
    include: [
      {
        model: task,
      },
    ],
    limit: 5,
  };
  return user.findAll(filter);
};

export default UserController;
