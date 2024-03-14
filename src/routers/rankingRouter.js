import { Router } from "express";
import checkAuthentication from "../middlewares/checkAuthentication.js";
import { rankPerMonth, rankPerWeek, rankingUserHighest } from "../controllers/rankingController.js";
const router = Router();

router.get("/monthly", checkAuthentication, rankPerMonth)
router.get("/weekly", checkAuthentication, rankPerWeek)
router.get("/rankingUserHighest", checkAuthentication, rankingUserHighest)

export default router;
