import { Schema } from 'mongoose';

export const AdminControlSchema = new Schema({
  group: { type: Schema.Types.ObjectId, ref: 'GroupChat', required: true },
  admin: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now },
});
