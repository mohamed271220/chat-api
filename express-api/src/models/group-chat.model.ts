import mongoose, { Document, Schema } from "mongoose";

export interface IGroupChat extends Document {
  name: string;
  members: mongoose.Types.ObjectId[];
  admin: mongoose.Types.ObjectId;
  createdAt: Date;
}

const GroupChatSchema: Schema = new Schema({
  name: { type: String, required: true },
  members: [{ type: Schema.Types.ObjectId, ref: "User" }],
  admin: { type: Schema.Types.ObjectId, ref: "User", required: true },
  createdAt: { type: Date, default: Date.now },
});

const GroupChat: mongoose.Model<IGroupChat> = mongoose.model<IGroupChat>(
  "GroupChat",
  GroupChatSchema
);

export default GroupChat;
