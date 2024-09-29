import mongoose, { Document, Schema } from 'mongoose';

export interface IMessageReaction extends Document {
  message: mongoose.Types.ObjectId;
  user: mongoose.Types.ObjectId;
  emoji: string;
  createdAt: Date;
}

const MessageReactionSchema: Schema = new Schema({
  message: { type: Schema.Types.ObjectId, ref: 'DirectMessage' }, // Can refer to either DirectMessage or GroupMessage
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  emoji: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});


const MessageReaction: mongoose.Model<IMessageReaction> = mongoose.model<IMessageReaction>('MessageReaction', MessageReactionSchema);

export default MessageReaction;