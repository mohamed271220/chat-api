import { Document } from 'mongoose';

export interface INotification extends Document {
  user: string;
  type: 'message' | 'friend_request' | 'group_invite' | 'announcement';
  message: string;
  isRead: boolean;
  createdAt: Date;
}
