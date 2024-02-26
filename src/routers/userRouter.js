import { Router } from "express";
import { updateProfile } from "../controllers/userController.js";
import checkAuthentication from "../middlewares/checkAuthentication.js";

const router = Router();

router.post("/profile", checkAuthentication, updateProfile)

export default router;