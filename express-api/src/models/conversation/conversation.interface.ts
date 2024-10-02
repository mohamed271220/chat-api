import { Document } from "mongoose";
import { IUser } from "../user/user.interface";

export interface ConversationDocument extends Document {
  participants: IUser["_id"][];
  createdAt: Date;
  updatedAt: Date;
}
