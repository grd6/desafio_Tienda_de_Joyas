import { config } from "dotenv";
config();

export const db = {
  user: process.env.USER_DB,
  database: process.env.NAME_DATABASE,
  password: process.env.PASSWORD_DB,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
};
export const PORT = process.env.PORT || 3000;
