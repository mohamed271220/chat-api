import { Document } from 'mongoose';

export interface IGroupChat extends Document {
  name: string;
  members: string[];
  creator: string;
  createdAt: Date;
}
