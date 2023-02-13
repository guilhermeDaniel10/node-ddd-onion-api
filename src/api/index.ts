import { Router } from "express";
import middlewares from "./middlewares";
import user from "./routes/userRoute";
import systemRole from "./routes/systemRoleRoute";
import auth from "./routes/authRoute";

export default () => {
  const app = Router();
  auth(app);
  systemRole(app);
  user(app);

  return app;
};
