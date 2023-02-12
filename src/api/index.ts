import { Router } from "express";
import middlewares from "./middlewares";
import user from "./routes/userRoute";
import auth from "./routes/authRoute";

export default () => {
  const app = Router();
  auth(app);
  user(app);

  return app;
};
