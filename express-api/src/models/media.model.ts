import mongoose, { Document, Schema } from "mongoose";

export interface IMediaSharing extends Document {
  user: mongoose.Types.ObjectId;
  url: string;
  createdAt: Date;
}

const MediaSharingSchema: Schema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  
  url: { type: String, required: true },

  createdAt: { type: Date, default: Date.now },
});

const MediaSharing: mongoose.Model<IMediaSharing> =
  mongoose.model<IMediaSharing>("MediaSharing", MediaSharingSchema);

export default MediaSharing;
