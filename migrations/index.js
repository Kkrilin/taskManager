import { Sequelize, DataTypes } from 'sequelize';
import config from '../config.js';
import user from '../models/user.js';
import task from '../models/task.js';
import fs from 'fs';
console.log(config.db.URL);
const sequelize = new Sequelize(config.db.URL, {
  dialect: config.db.dialect,
  logging: false,
  dialectOptions: {
    ssl: {
      require: true, // Enforce SSL connection
      rejectUnauthorized: false, // Allow self-signed certificates (use cautiously)
      // ca: fs.readFileSync('./ca.pem').toString()
    },
  },
  pool: {
    max: 10, // Maximum number of connections in the pool
    min: 0, // Minimum number of connections in the pool
    acquire: 30000, // Maximum time (in ms) to try getting a connection before throwing an error
    idle: 10000, // Maximum time (in ms) a connection can be idle before being released
  },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;
const { Op } = Sequelize;
db.Op = Op;
db.sequelize
  .sync({ force: false }) // Drops and recreates tables on restart
  .then(async () => {
    console.log('Database connected');
  })
  .catch((err) => {
    console.log('Failed to sync db: ' + err);
  });

db.User = user(sequelize, DataTypes);
db.Task = task(sequelize, DataTypes);
db.User.associate(db);
db.Task.associate(db);
export default db;
