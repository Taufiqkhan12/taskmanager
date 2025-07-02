import { Router } from "express";
import { createTask } from "../controller/task.controller.js";
import { checkRole } from "../middlewares/checkrole.middleware.js";

const router = Router();

router.route("/create-task").post(checkRole, createTask);

export default router;
