import mongoose, { Model, Schema } from "mongoose";
import ReactionSchema from "../shared/reaction.schema";
import { IDirectMessage } from "./direct-message.interface";

const DirectMessageSchema: Schema = new Schema({
  sender: { type: Schema.Types.ObjectId, ref: "User", required: true },
  receiver: { type: Schema.Types.ObjectId, ref: "User", required: true },
  conversation: {
    type: Schema.Types.ObjectId,
    ref: "Conversation",
    required: true,
  },
  message: { type: String },
  media: { type: Schema.Types.ObjectId, ref: "MediaSharing" },
  createdAt: { type: Date, default: Date.now },
  isRead: { type: Boolean, default: false },
  deliveredAt: { type: Date },
  readAt: { type: Date },
  reactions: { type: [ReactionSchema], default: [] },
});

// Custom validation to ensure at least one of message or media is provided
DirectMessageSchema.pre("validate", function (next) {
  if (!this.message && !this.media) {
    const err = new Error(
      "At least one of 'message' or 'media' must be provided."
    );
    next(err);
  } else {
    next();
  }
});

const DirectMessage: Model<IDirectMessage> = mongoose.model<IDirectMessage>(
  "DirectMessage",
  DirectMessageSchema
);

export default DirectMessage;
