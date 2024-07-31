import { Router } from "express";
import verifyToken from "../middleware/verifyToken.middlewares.js";
import {
  createBlogController,
  getAllPostController,
  getSIngleUserBlogByIdController,
} from "../controllers/blog.controller.js";
import upload from "../config/multer.config.js";

const router = Router();

router
  .route("/")
  .post(verifyToken, upload.single("image"), createBlogController)
  .get(getAllPostController);

router.route("/:id").get(getSIngleUserBlogByIdController);

export default router;
