import { Router } from "express";
import { checkChallengeProgress } from "../controllers/challengeController.js";
const router = Router();

router.post("/checkProgress", checkChallengeProgress)


export default router;
