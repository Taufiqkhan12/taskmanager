import { Router } from "express";
import {
  createTask,
  getTasks,
  updateStatus,
} from "../controller/task.controller.js";
import { checkRole } from "../middlewares/checkrole.middleware.js";

const router = Router();

router.route("/create-task").post(checkRole, createTask);

router.route("/get-tasks").get(checkRole, getTasks);

router.route("/update-status").post(checkRole, updateStatus);

export default router;
