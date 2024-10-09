import mongoose, { Schema, Model } from "mongoose";
import { ConversationDocument } from "./conversation.interface";

const ConversationSchema = new Schema<ConversationDocument>({
  participants: [{ type: Schema.Types.ObjectId, ref: "User", required: true }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

ConversationSchema.index({ participants: 1 }, { unique: true });

const Conversation: Model<ConversationDocument> =
  mongoose.model<ConversationDocument>("Conversation", ConversationSchema);

export default Conversation;
