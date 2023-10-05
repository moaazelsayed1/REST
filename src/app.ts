import express from "express";
import config from "config";
import connect from "./utils/connect";
import logger from "./utils/logger";
import routes from "./routes";
import deserializeUser from "./middleware/desserializeUser";

const app = express();
const port = config.get<number>("port");

app.use(express.json());

app.use(deserializeUser);

app.listen(port, async () => {
  logger.info(`Server is running on port ${port}`);
  await connect();
  routes(app);
});
