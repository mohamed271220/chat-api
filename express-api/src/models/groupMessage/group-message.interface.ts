import mongoose, { Document } from "mongoose";
import { IReaction } from "../shared/reaction.schema";

export interface IGroupMessageContent {
  message?: string;
  media?: mongoose.Types.ObjectId;
}

export interface IGroupMessage extends Document, IGroupMessageContent {
  group: mongoose.Types.ObjectId;
  sender: mongoose.Types.ObjectId;
  createdAt: Date;
  isRead: boolean;
  deliveredAt?: Date;
  readAt?: Date;
  reactions: IReaction[];
}
