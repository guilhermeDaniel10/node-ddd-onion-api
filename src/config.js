import dotenv from "dotenv";

// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || "development";

const envFound = dotenv.config();
if (!envFound) {
  // This error should crash whole process
  throw new Error("Couldn't find .env file  ⚠️");
}

export default {
  /**
   * Port
   */
  port: parseInt(process.env.PORT, 10) || 3000,
  /**
   * Used by winston logger
   */
  logs: {
    level: process.env.LOG_LEVEL || "info",
  },

  /**
   * API configs
   */
  api: {
    prefix: "/api/v1",
  },

  repos: {
    user: {
      name: "UserRepo",
      path: "../repositories/implementation_repositories/UserRepo",
    },
  },

  services: {
    user: {
      name: "UserService",
      path: "../services/implementation_services/UserService"
    }
  },

  controllers: {
    user: {
      name: "UserController",
      path: "../controllers/user/implementation-controllers/UserController"
    }
  }
};
