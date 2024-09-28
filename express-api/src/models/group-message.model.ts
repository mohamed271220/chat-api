import mongoose, { Document, Schema } from 'mongoose';

export interface IGroupMessage extends Document {
  group: mongoose.Types.ObjectId;
  sender: mongoose.Types.ObjectId;
  encryptedMessage: string;
  createdAt: Date;
}

const GroupMessageSchema: Schema = new Schema({
  group: { type: Schema.Types.ObjectId, ref: 'GroupChat', required: true },
  sender: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  encryptedMessage: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model<IGroupMessage>('GroupMessage', GroupMessageSchema);
