// subdocument schema for reaction
import mongoose, { Schema, Document } from "mongoose";

export interface IReaction extends Document {
  user: mongoose.Types.ObjectId;
  reactionType: mongoose.Types.ObjectId;
}

const ReactionSchema: Schema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  reactionType: {
    type: Schema.Types.ObjectId,
    ref: "ReactionType",
    required: true,
  },
});

export default ReactionSchema;
