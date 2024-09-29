import mongoose, { Document, Schema, Model } from "mongoose";
import { IUser } from "./user.model"; // Assuming you have a IUser type

interface ConversationDocument extends Document {
  participants: IUser["_id"][];
  createdAt: Date;
  updatedAt: Date;
}

const ConversationSchema = new Schema<ConversationDocument>({
  participants: [{ type: Schema.Types.ObjectId, ref: "User", required: true }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Conversation: Model<ConversationDocument> =
  mongoose.model<ConversationDocument>("Conversation", ConversationSchema);

export default Conversation;
