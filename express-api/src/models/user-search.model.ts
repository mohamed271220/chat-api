import mongoose, { Document, Schema } from 'mongoose';

export interface IUserSearchHistory extends Document {
  user: mongoose.Types.ObjectId;
  searchQuery: string;
  createdAt: Date;
}

const UserSearchHistorySchema: Schema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  searchQuery: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const UserSearchHistory: mongoose.Model<IUserSearchHistory> = mongoose.model<IUserSearchHistory>('UserSearchHistory', UserSearchHistorySchema);

export default UserSearchHistory;