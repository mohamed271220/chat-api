import express from "express";
import * as authController from "../controllers/auth.controller";
import { authenticateToken } from "../middleware/auth.middleware";
import {
  validateLogin,
  validateSignup,
} from "../middleware/validators/authValidators";
// /api/v1/auth
const router = express.Router();

router.get("/profile", authenticateToken, authController.getUserDetails);

router.post("/signup", validateSignup, authController.signup);

router.post("/login", validateLogin, authController.login);

router.get("/logout", authController.logout);

router.get(
  "/validate-token",
  authenticateToken,
  authController.validateSession
);

router.get("/refresh-token", authController.refreshToken);

router.post("/forgot-password", authController.forgotPassword);

router.post("/reset-password/:token", authController.resetPassword);

router.post(
  "/change-password",
  authenticateToken,
  authController.changePassword
);

export default router;
