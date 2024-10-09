import { Schema } from 'mongoose';

export const ReactionTypeSchema = new Schema({
  name: { type: String, required: true, unique: true },
  emoji: { type: String, required: true },
});
