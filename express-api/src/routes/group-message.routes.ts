import express from "express";

import { authenticateToken } from "../middleware/auth.middleware";

import {
  sendGroupMessage,
  getGroupMessages,
  editGroupMessage,
  deleteGroupMessage,
  addReactionToGroupMessage,
} from "../controllers/group-message.controller";
import {
  validateAddReactionToGroupMessage,
  validateDeleteGroupMessage,
  validateEditGroupMessage,
  validateSendGroupMessage,
} from "../middleware/validators/groupMessageValidator";

const router = express.Router();

// /api/v1/group-messages

router.post(
  "/group/:groupId",
  authenticateToken,
  validateSendGroupMessage,
  sendGroupMessage
);

router.get("/group/:groupId", authenticateToken, getGroupMessages);

router.put(
  "/group/:groupId/message/:messageId/text",
  authenticateToken,
  validateEditGroupMessage,
  editGroupMessage
);

router.delete(
  "/group/:groupId/message/:messageId",
  authenticateToken,
  validateDeleteGroupMessage,
  deleteGroupMessage
);

// Add reaction to group message
router.post(
  "/group/:groupId/message/:messageId/reactions",
  authenticateToken,
  validateAddReactionToGroupMessage,
  addReactionToGroupMessage
);

export default router;
