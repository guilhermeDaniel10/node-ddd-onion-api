import express, { Application } from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import connection from "./configurations/database";
import dependencyInjectorLoader from "./loaders/dependencyInjector";

dotenv.config();

async function startServer() {
  const app = express();
  app.use(morgan("dev"));
  await require("./loaders").default({ expressApp: app });

  app
    .listen(process.env.PORT, () => {
      console.log("Server listening on port: " + process.env.PORT);
    })
    .on("error", (err) => {
      console.error(err);
      process.exit(1);
      return;
    });
}

startServer();
