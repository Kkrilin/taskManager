import 'dotenv/config';

const config = {
  port: process.env.SERVER_PORT,
  db: {
    URL: process.env.DB_URL,
    HOST: process.env.DB_HOST,
    PORT: process.env.DB_PORT,
    USER: process.env.DB_USER,
    PASSWORD: process.env.DB_PASSWORD,
    DB: process.env.DB,
    dialect: process.env.DIALECT,
  },
  secretKey: process.env.SECRET_KEY,
};

export default config;
