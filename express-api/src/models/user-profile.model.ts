import mongoose, { Document, Schema } from 'mongoose';

export interface IUserProfile extends Document {
  user: mongoose.Types.ObjectId;
  bio?: string;
  avatarUrl?: string;
  createdAt: Date;
}

const UserProfileSchema: Schema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  bio: { type: String },
  avatarUrl: { type: String },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model<IUserProfile>('UserProfile', UserProfileSchema);
