import { Sequelize } from "sequelize-typescript";

import dotenv from "dotenv";
import { UserSchema } from "../sequelize_schemas/UserSchema";

dotenv.config();

const connection = new Sequelize({
  dialect: "mysql",
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_ROOT_PASSWORD,
  database: process.env.DB_DATABASE,
  logging: false,
  models: [UserSchema],
});

export default connection;
