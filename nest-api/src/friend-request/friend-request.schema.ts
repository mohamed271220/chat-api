import { model, Schema } from 'mongoose';
import { IFriendRequest } from './friend-request.interface';

export const FriendRequestSchema = new Schema<IFriendRequest>({
  sender: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  receiver: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  status: {
    type: String,
    enum: ['pending', 'accepted', 'rejected'],
    default: 'pending',
  },
  createdAt: { type: Date, default: Date.now },
});

FriendRequestSchema.index({ sender: 1, receiver: 1 }, { unique: true }); // A user can send only one request to another user

export const FriendRequest = model<IFriendRequest>(
  'FriendRequest',
  FriendRequestSchema,
);
