import mongoose, { Schema } from "mongoose";
import { IReactionType } from "./reaction-type.interface";

const ReactionTypeSchema: Schema = new Schema({
  name: { type: String, required: true, unique: true },
  emoji: { type: String, required: true },
});

const ReactionType: mongoose.Model<IReactionType> =
  mongoose.model<IReactionType>("ReactionType", ReactionTypeSchema);

export default ReactionType;
