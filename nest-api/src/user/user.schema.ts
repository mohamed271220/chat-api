import { model, Schema } from 'mongoose';
import { IUser } from './user.interface';

const UserSchema = new Schema<IUser>({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  friends: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  isOnline: { type: Boolean, default: false },
  resetPasswordToken: { type: String },
  resetPasswordExpires: { type: Date },
  lastSeen: { type: Date },
  createdAt: { type: Date, default: Date.now },
});

export const User = model<IUser>('User', UserSchema);
