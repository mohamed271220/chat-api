import mongoose from "mongoose";
import AdminControl from "../models/adminControls/admin-controls.model";
import GroupChat from "../models/groupChat/group-chat.model";
import User from "../models/user/user.model";
import { CustomError } from "../utils/CustomError";
import { getPagination, Pagination } from "../utils/pagination";
import { IGroupChat } from "../models/groupChat/group-chat.interface";
import {
  checkAdminRights,
  checkGroupExists,
  checkUserExists,
  checkUserInGroup,
} from "./utils/group-chat.service.utils";

export class GroupService {
  constructor(
    private groupChatModel: typeof GroupChat = GroupChat,
    private userModel: typeof User = User,
    private adminControlModel: typeof AdminControl = AdminControl
  ) {}

  async createGroup(
    creatorId: string,
    name: string,
    members: string[]
  ): Promise<IGroupChat> {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      await checkUserExists(creatorId);

      // Check if all members exist in a single query
      const membersExist = await this.userModel
        .find({ _id: { $in: members } })
        .session(session);
      if (membersExist.length !== members.length)
        throw new CustomError("Some members do not exist", 404);

      // Create a new group with the creator as a member
      const group = await this.groupChatModel.create(
        [
          {
            name,
            members: [...members, creatorId],
            creator: creatorId,
          },
        ],
        { session }
      );

      // Add creator as an admin
      await this.adminControlModel.create(
        [
          {
            group: group[0]._id,
            admin: creatorId,
          },
        ],
        { session }
      );

      await session.commitTransaction();
      return group[0];
    } catch (error) {
      await session.abortTransaction();
      throw new CustomError("Failed to create group", 500);
    } finally {
      session.endSession();
    }
  }

  async getGroup(groupId: string): Promise<IGroupChat> {
    return checkGroupExists(groupId);
  }

  async updateGroupDetails(
    requestorId: string,
    groupId: string,
    name: string
  ): Promise<IGroupChat> {
    await checkUserExists(requestorId);
    const group = await checkAdminRights(requestorId, groupId);

    // Update group details and save
    group.name = name;
    return await group.save();
  }

  async deleteGroup(requestorId: string, groupId: string): Promise<any> {
    await checkUserExists(requestorId);
    const group = await checkGroupExists(groupId);

    if (group.creator.toString() !== requestorId)
      throw new CustomError("Unauthorized", 401);

    // Delete the group
    return await group.deleteOne();
  }

  async getAllGroups(
    userId: string,
    limit: number = 10,
    offset: number = 0,
    search: string = ""
  ): Promise<{ groups: IGroupChat[]; pagination: Pagination }> {
    const query: any = { members: userId };

    if (search) {
      query.name = { $regex: search, $options: "i" };
    }

    const [groups, count] = await Promise.all([
      this.groupChatModel.find(query).limit(limit).skip(offset).lean(), // Use lean() for faster read
      this.groupChatModel.countDocuments(query),
    ]);

    const pagination = getPagination(count, limit, offset);
    return { groups, pagination };
  }

  async addUserToGroup(
    requestorId: string,
    groupId: string,
    userId: string
  ): Promise<IGroupChat> {
    await checkUserExists(requestorId);
    await checkUserExists(userId);
    const group = await checkAdminRights(requestorId, groupId);

    // Check if user is already a member
    await checkUserInGroup(userId, groupId);

    // Add user to group
    group.members.push(new mongoose.Types.ObjectId(userId));
    return await group.save();
  }

  async removeUserFromGroup(
    requestorId: string,
    groupId: string,
    userId: string
  ): Promise<IGroupChat> {
    await checkUserExists(requestorId);
    await checkUserExists(userId);
    const group = await checkAdminRights(requestorId, groupId);

    // Check if user is a member
    await checkUserInGroup(userId, groupId);

    // Remove user from group
    group.members = group.members.filter(
      (member) => member.toString() !== userId
    );
    return await group.save();
  }

  async getUsersInGroup(
    groupId: string
  ): Promise<{ users: mongoose.Types.ObjectId[] }> {
    const group = await this.groupChatModel
      .findById(groupId)
      .populate("members", "name email")
      .lean();
    if (!group) throw new CustomError("Group not found", 404);

    return { users: group.members };
  }

  async makeUserAdmin(
    requestorId: string,
    groupId: string,
    userId: string
  ): Promise<IGroupChat> {
    await checkUserExists(requestorId);
    await checkUserExists(userId);
    const group = await checkAdminRights(requestorId, groupId);

    const alreadyAdmin = await this.adminControlModel.findOne({
      group: groupId,
      admin: userId,
    });
    if (alreadyAdmin) throw new CustomError("User is already an admin", 400);

    await this.adminControlModel.create({ group: groupId, admin: userId });
    return group;
  }
}
