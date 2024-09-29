import mongoose, { Document, Schema } from "mongoose";

export interface IFriendRequest extends Document {
  sender: mongoose.Types.ObjectId;
  receiver: mongoose.Types.ObjectId;
  status: string;
  createdAt: Date;
}

const FriendRequestSchema: Schema = new Schema({
  sender: { type: Schema.Types.ObjectId, ref: "User", required: true },
  receiver: { type: Schema.Types.ObjectId, ref: "User", required: true },
  status: {
    type: String,
    enum: ["pending", "accepted", "rejected"],
    default: "pending",
  },
  createdAt: { type: Date, default: Date.now },
});

const FriendRequest: mongoose.Model<IFriendRequest> =
  mongoose.model<IFriendRequest>("FriendRequest", FriendRequestSchema);

export default FriendRequest;
