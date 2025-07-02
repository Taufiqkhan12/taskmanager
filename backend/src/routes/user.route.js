import { Router } from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
  getAllUsers,
  getUserById,
} from "../controller/user.controller.js";
import { checkUserRole } from "../controller/user.controller.js";
import { checkRole } from "../middlewares/checkrole.middleware.js";

const router = Router();

router.route("/signup").post(registerUser);

router.route("/login").post(loginUser);

router.route("/logout").post(logoutUser);

router.route("/get-all-users").get(getAllUsers);

router.route("/get-user-by-id/:id").get(getUserById);

router.route("/check-role").post(checkRole, checkUserRole);

export default router;
