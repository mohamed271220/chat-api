import { Schema } from 'mongoose';

export const MediaSharingSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  url: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});
