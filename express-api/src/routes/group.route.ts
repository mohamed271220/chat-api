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
import {
  validateAddUserToGroup,
  validateCreateGroup,
  validateDeleteGroup,
  validateMakeUserAdmin,
  validateRemoveUserFromGroup,
  validateUpdateGroup,
} from "../middleware/validators/groupValidator";

const router = express.Router();
// /api/v1/groups
router.post("/", authenticateToken, validateCreateGroup, createGroup);
router.get("/:groupId", authenticateToken, getGroup);
router.put(
  "/:groupId/name",
  authenticateToken,
  validateUpdateGroup,
  updateGroup
);
router.delete("/:groupId", authenticateToken, validateDeleteGroup, deleteGroup);

// get all groups user is in
router.get("/", authenticateToken, getAllGroups);

// add user to group
router.post(
  "/:groupId/users",
  authenticateToken,
  validateAddUserToGroup,
  addUserToGroup
);

// remove user from group
router.delete(
  "/:groupId/users/:userId",
  authenticateToken,
  validateRemoveUserFromGroup,
  removeUserFromGroup
);

// get all users in group
router.get("/:groupId/users", authenticateToken, getUsersInGroup);

// make user admin of group
router.put(
  "/:groupId/users/:userId",
  authenticateToken,
  validateMakeUserAdmin,
  makeUserAdmin
);

export default router;
