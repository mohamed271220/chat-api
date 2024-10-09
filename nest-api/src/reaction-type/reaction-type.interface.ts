import { Document } from 'mongoose';

export interface IReactionType extends Document {
  name: string;
  emoji: string;
}
