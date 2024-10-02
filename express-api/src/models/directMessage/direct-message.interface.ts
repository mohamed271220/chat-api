import mongoose, { Document } from "mongoose";
import { IReaction } from "../shared/reaction.schema";

export interface IDirectMessage extends Document {
    sender: mongoose.Types.ObjectId;
    receiver: mongoose.Types.ObjectId;
    conversation: mongoose.Types.ObjectId;
    message?: string;
    media?: mongoose.Types.ObjectId;
    createdAt: Date;
    isRead: boolean;
    deliveredAt?: Date;
    readAt?: Date;
    reactions: IReaction[];
  }
  