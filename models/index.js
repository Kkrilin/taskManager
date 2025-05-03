import { Sequelize, DataTypes, Op } from 'sequelize';
import config from '../config/config.js';
import { logger } from '../config/logger.js';
import user from './user.js';
import task from './task.js';
import fs from 'fs';

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    host: config.host,
    port: config.port,
    dialect: config.dialect,
    logging: false,
    ssl: config.ssl === 'true',
    dialectOptions:
      config.ssl === 'true'
        ? {
          ssl: {
            // require: config.ssl === 'true',
            rejectUnauthorized: true,
            ca: fs.readFileSync('./ca.pem').toString(),
          },
        }
        : {},
    pool: {
      max: 15, // Maximum number of connections in the pool for production
      min: 5, // Minimum number of connections in the pool for production
      acquire: 30000, // Maximum time (in ms) to try getting a connection before throwing an error
      idle: 10000, // Maximum time (in ms) a connection can be idle before being released
    },
  },
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.Op = Op;
db.sequelize
  .authenticate()
  .then(async () => {
    logger.info('Database connected');
  })
  .catch((err) => {
    logger.info('Failed to sync db: ' + err);
  });

db.User = user(sequelize, DataTypes);
db.Task = task(sequelize, DataTypes);
db.User.associate(db);
db.Task.associate(db);
export default db;
