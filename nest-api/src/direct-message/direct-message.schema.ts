import { model, Schema } from 'mongoose';
import { ReactionSchema } from '../shared/reaction.schema';
import { IDirectMessage } from './direct-message.interface';

const DirectMessageSchema = new Schema<IDirectMessage>({
  sender: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  receiver: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  conversation: {
    type: Schema.Types.ObjectId,
    ref: 'Conversation',
    required: true,
  },
  message: { type: String },
  media: { type: Schema.Types.ObjectId, ref: 'MediaSharing' },
  createdAt: { type: Date, default: Date.now },
  isRead: { type: Boolean, default: false },
  deliveredAt: { type: Date },
  readAt: { type: Date },
  reactions: { type: [ReactionSchema], default: [] },
});

DirectMessageSchema.pre('validate', function (next) {
  if (!this.message && !this.media) {
    const err = new Error(
      "At least one of 'message' or 'media' must be provided.",
    );
    next(err);
  } else {
    next();
  }
});

export const DirectMessage = model<IDirectMessage>(
  'DirectMessage',
  DirectMessageSchema,
);
