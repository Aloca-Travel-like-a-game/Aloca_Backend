import { Router } from "express";
import { Register } from "../controllers/authController.js";

const router = Router();

router.post("/register",Register)

export default router;