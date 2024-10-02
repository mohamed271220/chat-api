import User from "../../models/user/user.model";
import GroupChat from "../../models/groupChat/group-chat.model";
import AdminControl from "../../models/adminControls/admin-controls.model";
import { CustomError } from "../../utils/CustomError";
import mongoose from "mongoose";

export const checkUserExists = async (userId: string) => {
  const user = await User.findById(userId);
  if (!user) throw new CustomError("User not found", 404);
  return user;
};

export const checkGroupExists = async (groupId: string) => {
  const group = await GroupChat.findById(groupId);
  if (!group) throw new CustomError("Group not found", 404);
  return group;
};

export const checkAdminRights = async (
  requestorId: string,
  groupId: string
) => {
  const group = await checkGroupExists(groupId);
  const isAdmin = await AdminControl.findOne({
    group: groupId,
    admin: requestorId,
  });
  if (group.creator.toString() !== requestorId && !isAdmin)
    throw new CustomError("Unauthorized", 401);
  return group;
};

export const checkUserInGroup = async (userId: string, groupId: string) => {
  const group = await checkGroupExists(groupId);
  if (!group.members.includes(new mongoose.Types.ObjectId(userId)))
    throw new CustomError("User not in group", 400);
  return group;
};
