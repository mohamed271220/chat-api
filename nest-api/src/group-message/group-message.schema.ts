import { Schema } from 'mongoose';
import { ReactionSchema } from '../shared/reaction.schema';

export const GroupMessageSchema = new Schema({
  group: { type: Schema.Types.ObjectId, ref: 'GroupChat', required: true },
  sender: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  message: { type: String },
  media: { type: Schema.Types.ObjectId, ref: 'MediaSharing' },
  createdAt: { type: Date, default: Date.now },
  isRead: { type: Boolean, default: false },
  deliveredAt: { type: Date },
  readAt: { type: Date },
  reactions: { type: [ReactionSchema], default: [] },
});

GroupMessageSchema.pre('validate', function (next) {
  if (!this.message && !this.media) {
    const err = new Error(
      "At least one of 'message' or 'media' must be provided.",
    );
    next(err);
  } else {
    next();
  }
});
