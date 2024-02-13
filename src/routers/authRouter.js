import { Router } from "express";
import { register, login, confirmAccount, refreshVerificationCode, forgotPassword, resetPassword, refreshToken } from "../controllers/authController.js";

const router = Router();

router.post("/register", register)
router.post("/confirm-account", confirmAccount)
router.post("/refresh-verification", refreshVerificationCode)
router.post("/login", login)
router.post("/forgot-password", forgotPassword)
router.post("/reset-password/:token", resetPassword)
router.post("/refresh-token/:token", refreshToken)

export default router;