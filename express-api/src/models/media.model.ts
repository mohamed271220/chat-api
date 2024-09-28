import mongoose, { Document, Schema } from 'mongoose';

export interface IMediaSharing extends Document {
  user: mongoose.Types.ObjectId;
  group?: mongoose.Types.ObjectId;
  url: string;
  createdAt: Date;
}

const MediaSharingSchema: Schema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  group: { type: Schema.Types.ObjectId, ref: 'GroupChat' },
  url: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model<IMediaSharing>('MediaSharing', MediaSharingSchema);
