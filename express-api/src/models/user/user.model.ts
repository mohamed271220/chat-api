import mongoose, {  Schema } from "mongoose";
import { IUser } from "./user.interface";

const UserSchema: Schema = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  friends: [{ type: Schema.Types.ObjectId, ref: "User" }],
  isOnline: { type: Boolean, default: false },
  resetPasswordToken: { type: String },
  resetPasswordExpires: { type: Date },
  lastSeen: { type: Date },
  createdAt: { type: Date, default: Date.now },
});

const User: mongoose.Model<IUser> = mongoose.model<IUser>("User", UserSchema);

export default User;
