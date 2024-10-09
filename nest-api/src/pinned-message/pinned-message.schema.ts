import { Schema } from 'mongoose';

export const PinnedMessageSchema = new Schema({
  message: { type: Schema.Types.ObjectId, ref: 'GroupMessage' },
  group: { type: Schema.Types.ObjectId, ref: 'GroupChat' },
  pinnedBy: { type: Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now },
});
