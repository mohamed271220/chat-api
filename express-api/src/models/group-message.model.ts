import mongoose, { Document, Schema } from "mongoose";

export interface IGroupMessage extends Document {
  group: mongoose.Types.ObjectId;
  sender: mongoose.Types.ObjectId;
  encryptedMessage?: string;
  media?: mongoose.Types.ObjectId;
  createdAt: Date;
  isRead: boolean;
  deliveredAt?: Date;
  readAt?: Date;
}

const GroupMessageSchema: Schema = new Schema({
  group: { type: Schema.Types.ObjectId, ref: "GroupChat", required: true },
  sender: { type: Schema.Types.ObjectId, ref: "User", required: true },
  encryptedMessage: { type: String },
  media: { type: Schema.Types.ObjectId, ref: "MediaSharing" },
  createdAt: { type: Date, default: Date.now },
  isRead: { type: Boolean, default: false },
  deliveredAt: { type: Date },
  readAt: { type: Date },
});


const GroupMessage: mongoose.Model<IGroupMessage> = mongoose.model<IGroupMessage>(
  "GroupMessage",
  GroupMessageSchema
);

export default GroupMessage;