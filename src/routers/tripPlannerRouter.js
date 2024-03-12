import { Router } from "express";
import { createTrip, saveTripPlanner, getTrip, getDetailTrip } from "../controllers/tripplanerController.js";
import checkAuthentication from "../middlewares/checkAuthentication.js";

const router = Router();

router.post("/", createTrip)
router.post("/save-trip", checkAuthentication, saveTripPlanner)
router.post("/get-trip", checkAuthentication, getTrip)
router.post("/get-trip/:id", checkAuthentication, getDetailTrip)

export default router;