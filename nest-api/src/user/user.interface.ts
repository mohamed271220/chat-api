import { Document } from 'mongoose';

export interface IUser extends Document {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  phone?: string;
  dateOfBirth?: Date;
  gender?: 'male' | 'female' | 'other';
  role: 'admin' | 'user';
  lastLogin?: Date;
  createdAt: Date;
  updatedAt: Date;
}
