import express from "express";
import routes from "../routes";
import deserializeUser from "../middleware/desserializeUser";

export function createServer() {
  const app = express();

  app.use(express.json());

  app.use(deserializeUser);

  routes(app);

  return app;
}
