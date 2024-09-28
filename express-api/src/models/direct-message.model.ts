import mongoose, { Document, Schema } from 'mongoose';

export interface IDirectMessage extends Document {
  sender: mongoose.Types.ObjectId;
  receiver: mongoose.Types.ObjectId;
  encryptedMessage: string;
  createdAt: Date;
}

const DirectMessageSchema: Schema = new Schema({
  sender: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  receiver: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  encryptedMessage: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model<IDirectMessage>('DirectMessage', DirectMessageSchema);
