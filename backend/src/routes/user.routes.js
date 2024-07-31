import { Router } from "express";
import {
  userRegisterController,
  userLoginController,
  verfyTokenController,
} from "../controllers/user.controller.js";

const router = Router();

router.post("/register", userRegisterController);
router.post("/login", userLoginController);
router.get("/verifyToken", verfyTokenController);

export default router;
