import { Router } from "express";
import { runChat } from "../controllers/chatAIController.js";

const router = Router();

router.post("/", runChat)

export default router;
 