import { Schema } from 'mongoose';

export const MessageReactionSchema = new Schema({
  message: { type: Schema.Types.ObjectId, ref: 'GroupMessage', required: true },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  reactionType: {
    type: Schema.Types.ObjectId,
    ref: 'ReactionType',
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
});

MessageReactionSchema.index(
  { message: 1, user: 1, reactionType: 1 },
  { unique: true },
);
