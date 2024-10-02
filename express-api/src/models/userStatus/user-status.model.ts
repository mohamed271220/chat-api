import mongoose, { Schema } from "mongoose";
import { IUserOnlineStatus } from "./user-status.interface";

const UserOnlineStatusSchema: Schema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  status: {
    type: String,
    enum: ["online", "offline", "busy", "away"],
    default: "offline",
  },
  updatedAt: { type: Date, default: Date.now },
});

const UserOnlineStatus: mongoose.Model<IUserOnlineStatus> =
  mongoose.model<IUserOnlineStatus>("UserOnlineStatus", UserOnlineStatusSchema);

export default UserOnlineStatus;
