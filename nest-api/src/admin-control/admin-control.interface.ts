import { Document } from 'mongoose';

export interface IAdminControl extends Document {
  group: string;
  admin: string;
  createdAt: Date;
}
