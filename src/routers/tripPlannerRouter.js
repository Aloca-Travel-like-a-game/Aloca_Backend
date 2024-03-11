import { Router } from "express";
import { createTrip, saveTripPlanner } from "../controllers/tripplanerController.js";
import checkAuthentication from "../middlewares/checkAuthentication.js";

const router = Router();

router.post("/", createTrip)
router.post("/save-trip", checkAuthentication, saveTripPlanner)

export default router;