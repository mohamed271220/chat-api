import mongoose, {  Schema } from "mongoose";
import { IAdminControl } from "./admin-controls.interface";

const AdminControlSchema: Schema = new Schema({
  group: { type: Schema.Types.ObjectId, ref: "GroupChat", required: true },
  admin: { type: Schema.Types.ObjectId, ref: "User", required: true },
  createdAt: { type: Date, default: Date.now },
});

const AdminControl: mongoose.Model<IAdminControl> =
  mongoose.model<IAdminControl>("AdminControl", AdminControlSchema);

export default AdminControl;
