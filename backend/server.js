import express from "express";
import cors from "cors";
import dotenv from "dotenv";
//import morgan from "morgan";
import { logger } from "logger-express";
import { PORT } from "./db/config.js";
import router from "./router/routes.js";

dotenv.config();
const app = express();
const loggerOption = {
  logToFile: true, // If you need to log information to a file
  colorize: true, // enable console colors
  infoColor: "white", // set a color for information messages
  errorColor: "red", // set a color for error messages:
};
//middleware
app.use(express.json());
app.use(logger(loggerOption));
app.use(cors());

app.use(router);

app.listen(PORT, () => {
  console.log(`⚡Sever on⚡ http:/localhost:${PORT} `);
});
