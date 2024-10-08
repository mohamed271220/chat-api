import express from "express";

import { authenticateToken } from "../middleware/auth.middleware";

import {
  getDirectMessages,
  createDirectMessage,
  deleteDirectMessage,
  addReactionToDirectMessage,
} from "../controllers/direct-message.controller";
import { addReactionValidator, createMessageValidator } from "../middleware/validators/dmValidator";

const router = express.Router();

//api/v1/direct-message

// GET /api/v1/direct-message
// get the conversation between the logged in user and the receiver and fill it with direct messages
router.get("/:receiverId", authenticateToken, getDirectMessages);

// POST /api/v1/direct-message
router.post(
  "/:receiverId",
  authenticateToken,
  createMessageValidator,
  createDirectMessage
);

// DELETE /api/v1/direct-message
router.delete(
  "/:receiverId/message/:messageId",
  authenticateToken,
  deleteDirectMessage
);

// Add reaction to direct message
router.post(
  "/:messageId/reactions",
  authenticateToken,
  addReactionValidator,
  addReactionToDirectMessage
);

export default router;
