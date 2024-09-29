import Conversation from "../models/conversation.model";
import DirectMessage, { IDirectMessage } from "../models/direct-message.model";
import MediaSharing from "../models/media.model";
import { CustomError } from "../utils/CustomError";
import { decrypt, encrypt } from "../utils/message-encryption";

export class DirectMessageService {
  constructor(
    private directMessageModel: typeof DirectMessage = DirectMessage,
    private conversationModel: typeof Conversation = Conversation,
    private mediaModel: typeof MediaSharing = MediaSharing
  ) {}

  async getDirectMessages(
    senderId: string,
    receiverId: string
  ): Promise<any[]> {
    // Find the conversation between the sender and receiver
    const conversation = await this.conversationModel.findOne({
      members: { $all: [senderId, receiverId] },
    });

    // If the conversation doesn't exist, return an empty array
    if (!conversation) return [];

    // Fetch the direct messages in the conversation, sorted by creation date
    const directMessages = await this.directMessageModel
      .find({ conversation: conversation._id })
      .sort({ createdAt: -1 });

    // Decrypt each message
    const decryptedMessages = directMessages.map((message) => {
      const decryptedMessage = decrypt(JSON.parse(message.encryptedMessage!));
      return {
        ...message.toObject(),
        encryptedMessage: decryptedMessage, // Replace the encrypted message with the decrypted one
      };
    });

    return decryptedMessages;
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
      const mediaId = await this.findOrCreateMedia(senderId, media);

      // Encrypt the message
      const encryptedMessage = encrypt(message);

      // Create a new direct message
      const directMessage = await this.directMessageModel.create({
        sender: senderId,
        receiver: receiverId,
        conversation: conversation._id,
        encryptedMessage: encryptedMessage,
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
      members: { $all: [senderId, receiverId] },
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
      members: { $all: [senderId, receiverId] },
    });

    if (!conversation) {
      conversation = await this.conversationModel.create({
        members: [senderId, receiverId],
      });
    }

    return conversation;
  }

  private async findOrCreateMedia(senderId: string, media: string) {
    if (!media) {
      return null;
    }

    const existingMedia = await this.mediaModel.findOne({ _id: media });
    if (existingMedia) {
      return existingMedia._id;
    }

    const newMedia = await this.mediaModel.create({
      user: senderId,
      url: media,
    });

    return newMedia._id;
  }
}
