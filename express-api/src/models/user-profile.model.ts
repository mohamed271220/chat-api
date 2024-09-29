import mongoose, { Document, Model, Schema } from "mongoose";

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

const UserProfileSchema: Schema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true,
  },
  website: { type: String },
  firstName: { type: String },
  lastName: { type: String },
  bio: { type: String },
  avatarUrl: { type: String },
  createdAt: { type: Date, default: Date.now },
});

const UserProfile: Model<IUserProfile> = mongoose.model<IUserProfile>(
  "UserProfile",
  UserProfileSchema
);

export default UserProfile;
