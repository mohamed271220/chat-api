import express from "express";
import { authenticateToken } from "../middleware/auth.middleware";
import {
  getProfile,
  createProfile,
  changeProfileDetails,
  deleteProfile,
} from "../controllers/profile.controller";

const router = express.Router();

//api/v1/profile

// GET /api/v1/profile
router.get("/", authenticateToken, getProfile);

// POST /api/v1/profile
router.post("/", authenticateToken, createProfile);

// PUT /api/v1/profile
router.put("/", authenticateToken, changeProfileDetails);

// DELETE /api/v1/profile
router.delete("/", authenticateToken, deleteProfile);

export default router;
