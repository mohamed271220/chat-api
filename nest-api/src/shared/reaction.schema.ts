import { Schema } from 'mongoose';

export const ReactionSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  reactionType: {
    type: Schema.Types.ObjectId,
    ref: 'ReactionType',
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
});

export interface IReaction {
  user: string;
  reactionType: string;
  createdAt: Date;
}
