import mongoose, { Document, Schema } from 'mongoose';

export interface IUserOnlineStatus extends Document {
  user: mongoose.Types.ObjectId;
  status: string;
  updatedAt: Date;
}

const UserOnlineStatusSchema: Schema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  status: { type: String, enum: ['online', 'offline', 'busy', 'away'], default: 'offline' },
  updatedAt: { type: Date, default: Date.now }
});

export default mongoose.model<IUserOnlineStatus>('UserOnlineStatus', UserOnlineStatusSchema);
