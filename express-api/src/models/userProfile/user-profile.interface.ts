import mongoose, { Document } from "mongoose";

export interface IUserRef {
  user: mongoose.Types.ObjectId;
}

export interface IUserDetails {
  website?: string;
  firstName?: string;
  lastName?: string;
  bio?: string;
  avatarUrl?: string;
}

export interface IUserProfile extends IUserRef, IUserDetails, Document {
  createdAt: Date;
}
