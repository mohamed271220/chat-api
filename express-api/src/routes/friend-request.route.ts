import express from "express";
import { authenticateToken } from "../middleware/auth.middleware";
import {
  getFriendRequests,
  getFriends,
  getFriend,
  sendFriendRequest,
  acceptFriendRequest,
  rejectFriendRequest,
  removeFriend,
  getSentFriendRequests,
} from "../controllers/friend-request.controller";
import {
  acceptRejectFriendRequestValidator,
  removeFriendValidator,
  sendFriendRequestValidator,
} from "../middleware/validators/friendRequestValidators";

// /api/v1/friend-requests

const router = express.Router();

// get friend requests
router.get("/", authenticateToken, getFriendRequests);

// get sent friend requests
router.get("/sent", authenticateToken, getSentFriendRequests);

// get friends
router.get("/friends", authenticateToken, getFriends);

// get friend
router.get("/friends/:friendId", authenticateToken, getFriend);

// send friend request
router.post(
  "/send/:receiverId",
  authenticateToken,
  sendFriendRequestValidator,
  sendFriendRequest
);

// accept friend request
router.post(
  "/accept/:requestId",
  authenticateToken,
  acceptRejectFriendRequestValidator,
  acceptFriendRequest
);

// reject friend request
router.post(
  "/reject/:requestId",
  authenticateToken,
  acceptRejectFriendRequestValidator,
  rejectFriendRequest
);

// remove friend
router.delete(
  "/friends/:friendId",
  authenticateToken,
  removeFriendValidator,
  removeFriend
);

export default router;
