import mongoose, { Document, Schema } from "mongoose";

export interface IGroupChat extends Document {
  name: string;
  members: mongoose.Types.ObjectId[];
  creator: mongoose.Types.ObjectId;
  createdAt: Date;
}

const GroupChatSchema: Schema = new Schema({
  name: { type: String, required: true },
  members: [{ type: Schema.Types.ObjectId, ref: "User", required: true }],
  creator: { type: Schema.Types.ObjectId, ref: "User", required: true },
  createdAt: { type: Date, default: Date.now },
});

// Pre-save hook to ensure unique members
GroupChatSchema.pre<IGroupChat>("save", function (next) {
  this.members = Array.from(
    new Set(this.members.map((member) => member.toString()))
  ).map((id) => new mongoose.Types.ObjectId(id));
  next();
});

const GroupChat: mongoose.Model<IGroupChat> = mongoose.model<IGroupChat>(
  "GroupChat",
  GroupChatSchema
);

export default GroupChat;
