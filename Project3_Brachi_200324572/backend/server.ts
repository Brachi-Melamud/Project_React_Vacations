import express from "express";
import cors from "cors";
import config from "./utils/config";
import catchAll from "./middleware/catch-all";
import routeNotFound from "./middleware/route-not-found";
import vacationController from "./routes/vacationController";
import userController from "./routes/userController";

const server = express();
server.use(cors());
server.use(express.json());
server.use("/", vacationController);
server.use("/", userController);
server.use("*", routeNotFound);
server.use(catchAll);

server.listen(config.port, () =>
  console.log("Listening on http://localhost:" + config.port)
);
