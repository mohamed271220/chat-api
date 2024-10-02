import express from "express";

import { authenticateToken } from "../middleware/auth.middleware";

import {
  sendGroupMessage,
  getGroupMessages,
  editGroupMessage,
  deleteGroupMessage,
  addReactionToGroupMessage
} from "../controllers/group-message.controller";

const router = express.Router();

router.post("/group/:groupId", authenticateToken, sendGroupMessage);

router.get("/group/:groupId", authenticateToken, getGroupMessages);

router.put(
  "/group/:groupId/message/:messageId/text",
  authenticateToken,
  editGroupMessage
);

router.delete(
  "/group/:groupId/message/:messageId",
  authenticateToken,
  deleteGroupMessage
);

// Add reaction to group message
router.post('/group/:groupId/message/:messageId/reactions',authenticateToken, addReactionToGroupMessage);


export default router;
