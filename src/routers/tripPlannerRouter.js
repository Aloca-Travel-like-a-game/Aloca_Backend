import { Router } from "express";
import { createTrip, saveTripPlanner } from "../controllers/tripplanerController.js";

const router = Router();

router.post("/", createTrip)
router.post("/save-trip", saveTripPlanner)

export default router;