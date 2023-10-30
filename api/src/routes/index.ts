import { Router } from "express";
import { tasksRoutes } from "./task.routes";
import { userRoutes } from "./user.routes";
import verifyToken from "../middlewares/verifyToken";

const routes = Router()

routes.use("/task", verifyToken, tasksRoutes);
routes.use("/user", userRoutes);

export { routes }