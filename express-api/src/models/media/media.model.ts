import mongoose, { Schema } from "mongoose";
import { IMediaSharing } from "./media.interface";

const MediaSharingSchema: Schema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },

  url: { type: String, required: true },

  createdAt: { type: Date, default: Date.now },
});

const MediaSharing: mongoose.Model<IMediaSharing> =
  mongoose.model<IMediaSharing>("MediaSharing", MediaSharingSchema);

export default MediaSharing;
