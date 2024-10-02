import mongoose, { mongo } from "mongoose";
import GroupChat from "../models/groupChat/group-chat.model";
import {
  IGroupMessage,
  IGroupMessageContent,
} from "../models/groupMessage/group-message.interface";
import GroupMessage from "../models/groupMessage/group-message.model";
import MediaSharing from "../models/media/media.model";
import ReactionType from "../models/reactionType/reaction-type.model";
import ReactionSchema, { IReaction } from "../models/shared/reaction.schema";
import User from "../models/user/user.model";
import { CustomError } from "../utils/CustomError";
import {
  checkAdminRights,
  checkGroupExists,
  checkUserExists,
  checkUserInGroup,
} from "./utils/group-chat.service.utils";
import { findOrCreateMedia } from "./utils/media.service.utils";

export class GroupMessageService {
  constructor(
    private groupChatModel: typeof GroupChat = GroupChat,
    private groupMessageModel: typeof GroupMessage = GroupMessage,
    private userModel: typeof User = User,
    private reactionModel: typeof ReactionSchema = ReactionSchema,
    private reactionTypeModel: typeof ReactionType = ReactionType,
    private mediaModel: typeof MediaSharing = MediaSharing
  ) {}

  async sendGroupMessage(
    senderId: string,
    groupId: string,
    messageData: { message?: string; media?: string }
  ) {
    await checkUserExists(senderId);
    await checkGroupExists(groupId);

    const { message, media } = messageData;

    const mediaId = await findOrCreateMedia(senderId, media as string);

    const groupMessageData = {
      group: new mongoose.Types.ObjectId(groupId),
      sender: new mongoose.Types.ObjectId(senderId),
      message,
      media: mediaId as mongoose.Types.ObjectId,
    };

    const groupMessage = await this.groupMessageModel.create(groupMessageData);

    return groupMessage;
  }

  async getGroupMessages(
    userId: string,
    groupId: string
  ): Promise<IGroupMessage[]> {
    await checkUserExists(userId);
    await checkGroupExists(groupId);
    await checkUserInGroup(userId, groupId);

    const groupMessages = await this.groupMessageModel
      .find({
        group: groupId,
      })
      .populate("media sender", "url username");

    return groupMessages;
  }

  async editGroupMessage(
    userId: string,
    groupId: string,
    messageId: string,
    newMessage: string
  ) {
    await checkUserExists(userId);
    await checkGroupExists(groupId);
    await checkUserInGroup(userId, groupId);

    const message = await this.groupMessageModel.findById(messageId);

    if (!message) throw new CustomError("Message not found", 404);

    if (message.sender.toString() !== userId)
      throw new CustomError("Unauthorized", 401);

    if (newMessage) message.message = newMessage;

    return await message.save();
  }

  async deleteGroupMessage(userId: string, groupId: string, messageId: string) {
    await checkUserExists(userId);
    await checkGroupExists(groupId);
    await checkUserInGroup(userId, groupId);

    const message = await this.groupMessageModel.findById(messageId);

    if (!message) throw new CustomError("Message not found", 404);

    if (message.sender.toString() !== userId)
      throw new CustomError("Unauthorized", 401);

    return await message.deleteOne();
  }

  async addReactionToGroupMessage(
    userId: string,
    groupId: string,
    messageId: string,
    reactionTypeId: string
  ) {
    await checkUserExists(userId);
    await checkGroupExists(groupId);
    await checkUserInGroup(userId, groupId);

    const message = await this.groupMessageModel.findById(messageId);
    if (!message) throw new CustomError("Message not found", 404);

    const reactionTypeDoc = await this.reactionTypeModel.findById(
      reactionTypeId
    );
    if (!reactionTypeDoc) throw new CustomError("Reaction type not found", 404);

    // Check if the user has already reacted to the message
    const existingReaction = message.reactions.find(
      (reaction) => reaction.user.toString() === userId
    );

    if (existingReaction) {
      // Update the existing reaction
      existingReaction.reactionType = new mongoose.Types.ObjectId(
        reactionTypeId
      );
    } else {
      message.reactions.push({
        user: new mongoose.Types.ObjectId(userId),
        reactionType: new mongoose.Types.ObjectId(reactionTypeId),
      } as IReaction);
    }

    return await message.save();
  }
}
