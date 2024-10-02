import mongoose, {  Model, Schema } from "mongoose";
import { IUserProfile } from "./user-profile.interface";

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
