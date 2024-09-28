import mongoose, { Document, Schema } from 'mongoose';

export interface IPinnedMessage extends Document {
  message: mongoose.Types.ObjectId;
  group: mongoose.Types.ObjectId;
  pinnedBy: mongoose.Types.ObjectId;
  createdAt: Date;
}

const PinnedMessageSchema: Schema = new Schema({
  message: { type: Schema.Types.ObjectId, ref: 'GroupMessage' },
  group: { type: Schema.Types.ObjectId, ref: 'GroupChat' },
  pinnedBy: { type: Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model<IPinnedMessage>('PinnedMessage', PinnedMessageSchema);
