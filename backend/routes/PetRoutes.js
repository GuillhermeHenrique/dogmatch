import { Router } from "express";

const router = Router();

import PetController from "../controllers/PetController.js";

// middlewares
import checkToken from "../helpers/check-token.js";
import imageUpload from "../helpers/image-upload.js";

router.post(
  "/create",
  checkToken,
  imageUpload.array("images"),
  PetController.create
);
router.get("/", PetController.getAll);
router.get("/mypets", checkToken, PetController.getAllUserPets);
router.get("/myadoptions", checkToken, PetController.getAllUserAdoptions);
router.get("/:id", PetController.getPetById);
router.delete("/:id", checkToken, PetController.removePetById);
router.patch(
  "/:id",
  checkToken,
  imageUpload.array("images"),
  PetController.updatePet
);
router.patch("/schedule/:id", checkToken, PetController.schedule);
router.patch("/conclude/:id", checkToken, PetController.concludeAdoption);

export default router;
