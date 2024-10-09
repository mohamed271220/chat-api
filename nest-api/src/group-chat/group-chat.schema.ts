import mongoose, { Schema } from 'mongoose';

export const GroupChatSchema = new Schema({
  name: { type: String, required: true },
  members: [{ type: Schema.Types.ObjectId, ref: 'User', required: true }],
  creator: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now },
});

GroupChatSchema.pre('save', function (next) {
  this.members = Array.from(
    new Set(this.members.map((member) => member.toString())),
  ).map((id) => new mongoose.Types.ObjectId(id));
  next();
});
