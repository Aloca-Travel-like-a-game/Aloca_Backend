import { Router } from "express";
import { runChat, getDataChat, getDataChatDetail } from "../controllers/chatAIController.js";
import checkAuthentication from "../middlewares/checkAuthentication.js";
const router = Router();

router.get("/", checkAuthentication, getDataChat)
router.get("/:id", checkAuthentication, getDataChatDetail)
router.post("/", checkAuthentication, runChat)

export default router;
