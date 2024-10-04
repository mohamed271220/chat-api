import mongoose from "mongoose";
import Conversation from "../models/conversation/conversation.model";
import { IDirectMessage } from "../models/directMessage/direct-message.interface";
import DirectMessage from "../models/directMessage/direct-message.model";
import ReactionType from "../models/reactionType/reaction-type.model";
import { CustomError } from "../utils/CustomError";
import { checkUserExists } from "./utils/group-chat.service.utils";
import { findOrCreateMedia } from "./utils/media.service.utils";
import { IReaction } from "../models/shared/reaction.schema";

export class DirectMessageService {
  constructor(
    private directMessageModel: typeof DirectMessage = DirectMessage,
    private conversationModel: typeof Conversation = Conversation,
    private reactionTypeModel: typeof ReactionType = ReactionType
  ) {}

  async getDirectMessages(
    senderId: string,
    receiverId: string
  ): Promise<IDirectMessage[]> {
    // Find the conversation between the sender and receiver
    const conversation = await this.conversationModel.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    // If the conversation doesn't exist, return an empty array
    if (!conversation) return [];

    //edit all the messages in the conversation to be read
    const messages = await this.directMessageModel
      .find({
        conversation: conversation._id,
      })
      .sort({ createdAt: -1 });

    messages.forEach(async (message) => {
      if (message.receiver.toString() === senderId) {
        message.isRead = true;
        await message.save();
      }
    });

    return messages;
  }

  async createDirectMessage(
    senderId: string,
    receiverId: string,
    message: string,
    media: string
  ): Promise<IDirectMessage> {
    try {
      // Check if conversation exists
      let conversation = await this.findOrCreateConversation(
        senderId,
        receiverId
      );

      // Check if media exists
      const mediaId = await findOrCreateMedia(senderId, media);

      // Create a new direct message
      const directMessage = await this.directMessageModel.create({
        sender: senderId,
        receiver: receiverId,
        conversation: conversation._id,
        message,
        media: mediaId,
      });

      return directMessage;
    } catch (error) {
      // Handle errors (e.g., logging)
      console.error("Error creating direct message:", error);
      throw new CustomError("Failed to create direct message");
    }
  }

  async deleteDirectMessage(
    senderId: string,
    receiverId: string,
    messageId: string
  ) {
    // Find the conversation between the sender and receiver
    const conversation = await this.conversationModel.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    if (!conversation || !conversation._id) {
      throw new CustomError("Conversation not found");
    }

    // Find the direct message by ID
    const directMessage = await this.directMessageModel.findById(messageId);

    if (!directMessage) {
      throw new CustomError("Message not found");
    }

    // Check if the message belongs to the conversation
    if (directMessage.conversation.toString() !== conversation._id.toString()) {
      throw new CustomError("Message does not belong to the conversation");
    }

    // Delete the direct message
    await this.directMessageModel.findByIdAndDelete(messageId);

    return { message: "Message deleted successfully" };
  }

  private async findOrCreateConversation(senderId: string, receiverId: string) {
    let conversation = await this.conversationModel.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    if (!conversation) {
      conversation = await this.conversationModel.create({
        participants: [senderId, receiverId],
      });
    }

    return conversation;
  }

  async addReactionToGroupMessage(
    userId: string,
    messageId: string,
    reactionTypeId: string
  ) {
    await checkUserExists(userId);

    const message = await this.directMessageModel.findById(messageId);
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
