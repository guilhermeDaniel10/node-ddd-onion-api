import dotenv from "dotenv";
import { createPool } from "mysql2/promise";

export async function connect() {
  const connection = await createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_ROOT_PASSWORD,
    database: process.env.DB_DATABASE,
  });

  return connection;
}
