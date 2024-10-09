import { Document } from 'mongoose';

export interface IMediaSharing extends Document {
  user: string;
  url: string;
  createdAt: Date;
}
