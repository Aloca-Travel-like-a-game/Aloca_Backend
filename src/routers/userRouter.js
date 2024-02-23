import { Router } from "express";
import { getProfile } from "../controllers/userController.js";
import checkAuthentication from "../middlewares/checkAuthentication.js";

const router = Router();

router.get("/profile", checkAuthentication, getProfile)

export default router;