import mongoose from "mongoose";
import AdminControl from "../models/admin-controls.model";
import GroupChat, { IGroupChat } from "../models/group-chat.model";
import User from "../models/user.model";
import { CustomError } from "../utils/CustomError";
import { getPagination, Pagination } from "../utils/pagination";

export class GroupService {
  constructor(
    private groupChatModel: typeof GroupChat = GroupChat,
    private userModel: typeof User = User,
    private adminControlModel: typeof AdminControl = AdminControl
  ) {}

  // Utility method to check if user exists
  private async checkUserExists(userId: string) {
    const user = await this.userModel.findById(userId);
    if (!user) throw new CustomError("User not found", 404);
    return user;
  }

  // Utility method to check if group exists
  private async checkGroupExists(groupId: string) {
    const group = await this.groupChatModel.findById(groupId);
    if (!group) throw new CustomError("Group not found", 404);
    return group;
  }

  // Utility method to check if requestor is the creator or an admin
  private async checkAdminRights(requestorId: string, groupId: string) {
    const group = await this.checkGroupExists(groupId);
    const isAdmin = await this.adminControlModel.findOne({
      group: groupId,
      admin: requestorId,
    });
    if (group.creator.toString() !== requestorId && !isAdmin)
      throw new CustomError("Unauthorized", 401);
    return group;
  }

  async createGroup(
    creatorId: string,
    name: string,
    members: string[]
  ): Promise<IGroupChat> {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      await this.checkUserExists(creatorId);

      // Check if all members exist
      const membersExist = await this.userModel
        .find({ _id: { $in: members } })
        .session(session);
      if (membersExist.length !== members.length)
        throw new CustomError("Some members do not exist", 404);

      // Create a new group
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
      session.endSession();

      return group[0];
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      throw new CustomError("Failed to create group", 500);
    }
  }

  async getGroup(groupId: string): Promise<IGroupChat> {
    return this.checkGroupExists(groupId);
  }

  async updateGroupDetails(
    requestorId: string,
    groupId: string,
    name: string
  ): Promise<IGroupChat> {
    await this.checkUserExists(requestorId);
    const group = await this.checkAdminRights(requestorId, groupId);

    // Update group details
    group.name = name;
    await group.save();

    return group;
  }

  async deleteGroup(requestorId: string, groupId: string): Promise<any> {
    await this.checkUserExists(requestorId);
    const group = await this.checkGroupExists(groupId);

    if (group.creator.toString() !== requestorId)
      throw new CustomError("Unauthorized", 401);

    // Delete the group
    return group.deleteOne({ _id: groupId });
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

    const groups = await this.groupChatModel
      .find(query)
      .limit(limit)
      .skip(offset);

    const count = await this.groupChatModel.countDocuments(query);
    const pagination = getPagination(count, limit, offset);

    return { groups, pagination };
  }

  async addUserToGroup(
    requestorId: string,
    groupId: string,
    userId: string
  ): Promise<IGroupChat> {
    await this.checkUserExists(requestorId);
    await this.checkUserExists(userId);
    const group = await this.checkAdminRights(requestorId, groupId);

    // Add user to group
    group.members.push(new mongoose.Types.ObjectId(userId));
    await group.save();

    return group;
  }

  async removeUserFromGroup(
    requestorId: string,
    groupId: string,
    userId: string
  ): Promise<IGroupChat> {
    await this.checkUserExists(requestorId);
    await this.checkUserExists(userId);
    const group = await this.checkAdminRights(requestorId, groupId);

    // Remove user from group
    group.members = group.members.filter(
      (member) => member.toString() !== userId
    );
    await group.save();

    return group;
  }

  async getUsersInGroup(
    groupId: string
  ): Promise<{ users: mongoose.Types.ObjectId[] }> {
    const group = await this.groupChatModel
      .findById(groupId)
      .populate("members", "name email");
    if (!group) throw new CustomError("Group not found", 404);

    return { users: group.members };
  }

  async makeUserAdmin(
    requestorId: string,
    groupId: string,
    userId: string
  ): Promise<IGroupChat> {
    await this.checkUserExists(requestorId);
    await this.checkUserExists(userId);
    const group = await this.checkAdminRights(requestorId, groupId);

    const alreadyAdmin = await this.adminControlModel.findOne({
      group: groupId,
      admin: userId,
    });

    if (alreadyAdmin) throw new CustomError("User is already an admin", 400);

    await this.adminControlModel.create({
      group: groupId,
      admin: userId,
    });

    return group;
  }
}
