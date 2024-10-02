import mongoose, { Document, Schema } from "mongoose";
import { IPinnedMessage } from "./pinned-message.interface";

const PinnedMessageSchema: Schema = new Schema({
  message: { type: Schema.Types.ObjectId, ref: "GroupMessage" },
  group: { type: Schema.Types.ObjectId, ref: "GroupChat" },
  pinnedBy: { type: Schema.Types.ObjectId, ref: "User" },
  createdAt: { type: Date, default: Date.now },
});

const PinnedMessage: mongoose.Model<IPinnedMessage> =
  mongoose.model<IPinnedMessage>("PinnedMessage", PinnedMessageSchema);

export default PinnedMessage;
