import mongoose, { Document, Model, Schema } from "mongoose";

export interface IDirectMessage extends Document {
  sender: mongoose.Types.ObjectId;
  receiver: mongoose.Types.ObjectId;
  conversation: mongoose.Types.ObjectId;
  encryptedMessage?: string;
  media?: mongoose.Types.ObjectId;
  createdAt: Date;
  isRead: boolean;
  deliveredAt?: Date;
  readAt?: Date;
}

const DirectMessageSchema: Schema = new Schema({
  sender: { type: Schema.Types.ObjectId, ref: "User", required: true },
  receiver: { type: Schema.Types.ObjectId, ref: "User", required: true },
  conversation: {
    type: Schema.Types.ObjectId,
    ref: "Conversation",
    required: true,
  },
  encryptedMessage: { type: String },
  media: { type: Schema.Types.ObjectId, ref: "MediaSharing" },
  createdAt: { type: Date, default: Date.now },
  isRead: { type: Boolean, default: false },
  deliveredAt: { type: Date },
  readAt: { type: Date },
});

const DirectMessage: Model<IDirectMessage> = mongoose.model<IDirectMessage>(
  "DirectMessage",
  DirectMessageSchema
);

export default DirectMessage;
