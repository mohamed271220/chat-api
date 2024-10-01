import express from "express";
import { authenticateToken } from "../middleware/auth.middleware";
import {
  createGroup,
  getGroup,
  updateGroup,
  deleteGroup,
  getAllGroups,
  addUserToGroup,
  removeUserFromGroup,
  getUsersInGroup,
  makeUserAdmin,
} from "../controllers/group.controller";

const router = express.Router();

router.post("/", authenticateToken, createGroup);
router.get("/:groupId", authenticateToken, getGroup);
router.put("/:groupId/name", authenticateToken, updateGroup);
router.delete("/:groupId", authenticateToken, deleteGroup);

// get all groups user is in
router.get("/", authenticateToken, getAllGroups);

// add user to group
router.post("/:groupId/users", authenticateToken, addUserToGroup);

// remove user from group
router.delete(
  "/:groupId/users/:userId",
  authenticateToken,
  removeUserFromGroup
);

// get all users in group
router.get("/:groupId/users", authenticateToken, getUsersInGroup);

// make user admin of group
router.put("/:groupId/users/:userId", authenticateToken, makeUserAdmin);

export default router;
