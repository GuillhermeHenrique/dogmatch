import { Router } from "express";

const router = Router();

import UserController from "../controllers/UserControllers.js";

// middleware
import checkToken from "../helpers/check-token.js";
import imageUpload from "../helpers/image-upload.js";

router.post("/register", UserController.register);
router.post("/login", UserController.login);
router.get("/checkuser", UserController.checkUser);
router.get("/:id", UserController.getUserById);
router.patch(
  "/edit/:id",
  checkToken,
  imageUpload.single("image"),
  UserController.editUser
);

export default router;
