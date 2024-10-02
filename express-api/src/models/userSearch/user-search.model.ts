import mongoose, { Schema } from "mongoose";
import { IUserSearchHistory } from "./user-search.interface";

const UserSearchHistorySchema: Schema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  searchQuery: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const UserSearchHistory: mongoose.Model<IUserSearchHistory> =
  mongoose.model<IUserSearchHistory>(
    "UserSearchHistory",
    UserSearchHistorySchema
  );

export default UserSearchHistory;
