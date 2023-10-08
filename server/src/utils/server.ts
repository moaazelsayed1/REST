import express from "express";
import routes from "../routes";
import deserializeUser from "../middleware/desserializeUser"; // Make sure this path is correct
import config from "config";
import cors from "cors";
import cookieParser from "cookie-parser";

export function createServer() {
  const app = express();

  app.use(
    cors({
      origin: config.get<string>("origin"),
      credentials: true,
    })
  );
  app.use(express.json());

  app.use(cookieParser());

  app.use(deserializeUser);

  routes(app);

  return app;
}
