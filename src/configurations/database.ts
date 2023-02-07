import { Sequelize } from "sequelize-typescript";

import dotenv from "dotenv";
import { User } from "../sequelize_schemas/User";

dotenv.config();

const connection = new Sequelize({
  dialect: "mysql",
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_ROOT_PASSWORD,
  database: process.env.DB_DATABASE,
  logging: false,
  models: [User],
});

export default connection;
