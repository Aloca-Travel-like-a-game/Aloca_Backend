import { Router } from "express";
import { checkChallengeProgress } from "../controllers/challengeController.js";
import checkAuthentication from "../middlewares/checkAuthentication.js";
const router = Router();

router.post("/checkProgress", checkAuthentication, checkChallengeProgress)


export default router;
