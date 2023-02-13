import expressLoader from "./express";
import connection from "../configurations/database";
import dependencyInjectorLoader from "./dependencyInjector";
import config from "../config";

export default async ({ expressApp }: any) => {
  await connectToDatabase();
  await loadSequelizeSchemas();
  await expressLoader({ app: expressApp });
};

async function connectToDatabase(): Promise<void> {
  try {
    await connection.sync();
    console.log("Database successfully connected");
  } catch (err) {
    console.log("Error", err);
  }
}

async function loadSequelizeSchemas(): Promise<void> {
  const userSchema = {
    // compare with the approach followed in repos and services
    name: "userSequelizeSchema",
    sequelizeSchema: "../sequelize-schemas/User",
  };

  const userRepo = {
    name: config.repos.user.name,
    path: config.repos.user.path,
  };

  const systemRoleRepo = {
    name: config.repos.systemRole.name,
    path: config.repos.systemRole.path,
  };

  const userService = {
    name: config.services.user.name,
    path: config.services.user.path,
  };

  const systemRoleService = {
    name: config.services.systemRole.name,
    path: config.services.systemRole.path,
  };

  const userController = {
    name: config.controllers.user.name,
    path: config.controllers.user.path,
  };

  const systemRoleController = {
    name: config.controllers.systemRole.name,
    path: config.controllers.systemRole.path,
  };

  await dependencyInjectorLoader({
    //sequelizeSchemas: [userSchema],
    controllers: [systemRoleController, userController],
    repos: [systemRoleRepo, userRepo],
    services: [systemRoleService, userService],
  });
}
