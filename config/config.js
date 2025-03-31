import 'dotenv/config';

const env = process.env.NODE_ENV || 'development';

const config = {
  development: {
    serverPort: process.env.SERVER_PORT,
    serverUrl: process.env.SERVER_URL,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB,
    dialect: 'postgres',
    dbUrl: process.env.DB_URL,
    secretKey: process.env.SECRET_KEY,
    jwtExpiration: process.env.JWT_EXPIRATION,
    ssl: process.env.SSl,
  },
  production: {
    serverPort: process.env.SERVER_PORT,
    serverUrl: process.env.SERVER_URL,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB,
    dialect: 'postgres',
    dbUrl: process.env.DB_URL,
    secretKey: process.env.SECRET_KEY,
    jwtExpiration: process.env.JWT_EXPIRATION,
  },
};

export default config[env];
