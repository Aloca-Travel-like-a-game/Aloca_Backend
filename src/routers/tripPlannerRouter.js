import { Router } from "express";
import { createTrip } from "../controllers/tripplanerController.js";

const router = Router();

router.post("/", createTrip)

export default router;