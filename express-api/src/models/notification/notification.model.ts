import mongoose, { Document, Schema } from "mongoose";
import { INotification } from "./notification.interface";

const NotificationSchema: Schema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  type: {
    type: String,
    enum: ["message", "friend_request", "group_invite", "announcement"],
    required: true,
  },
  message: { type: String, required: true },
  isRead: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

const Notification: mongoose.Model<INotification> =
  mongoose.model<INotification>("Notification", NotificationSchema);

export default Notification;
