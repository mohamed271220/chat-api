import { Document } from 'mongoose';

export interface IFriendRequest extends Document {
  sender: string;
  receiver: string;
  status: 'pending' | 'accepted' | 'rejected';
  createdAt: Date;
}
