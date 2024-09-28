import mongoose, { Document, Schema } from 'mongoose';

export interface IAdminControl extends Document {
  group: mongoose.Types.ObjectId;
  admin: mongoose.Types.ObjectId;
  permissions: string[];
  createdAt: Date;
}

const AdminControlSchema: Schema = new Schema({
  group: { type: Schema.Types.ObjectId, ref: 'GroupChat', required: true },
  admin: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  permissions: [{ type: String, enum: ['add_member', 'remove_member', 'ban_user', 'change_settings'] }],
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model<IAdminControl>('AdminControl', AdminControlSchema);
