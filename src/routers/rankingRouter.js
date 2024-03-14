import { Router } from "express";
import checkAuthentication from "../middlewares/checkAuthentication.js";
const router = Router();

router.get("/", checkAuthentication, getDataChat)

export default router;
