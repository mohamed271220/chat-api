import mongoose, { startSession } from "mongoose";
import { IFriendRequest } from "../models/friendRequest/friend-request.interface";
import FriendRequest from "../models/friendRequest/friend-request.model";
import { IUser } from "../models/user/user.interface";
import User from "../models/user/user.model";
import { CustomError } from "../utils/CustomError";
import { checkUserExists } from "./utils/group-chat.service.utils";

export default class FriendRequestService {
  constructor(
    private friendRequestModel: typeof FriendRequest = FriendRequest,
    private userModel: typeof User = User
  ) {}

  async getFriendRequests(userId: string): Promise<IFriendRequest[]> {
    await checkUserExists(userId);
    const friendRequests = await this.friendRequestModel.find({
      receiver: userId,
      status: "pending",
    });

    return friendRequests;
  }

  async getSentFriendRequests(userId: string): Promise<IFriendRequest[]> {
    await checkUserExists(userId);
    const sentFriendRequests = await this.friendRequestModel.find({
      sender: userId,
      status: "pending",
    });

    return sentFriendRequests;
  }

  async getFriends(userId: string): Promise<IUser[]> {
    await checkUserExists(userId);
    const friends = await this.userModel
      .find({
        _id: userId,
        friends: { $ne: [] },
      })
      .select("friends username email")
      .populate("friends", "username");

    return friends;
  }

  async getFriend(userId: string, friendId: string) {
    await checkUserExists(userId);
    await checkUserExists(friendId);
    const friend = await this.userModel.findOne({
      _id: userId,
      friends: friendId,
    });

    return friend;
  }

  async sendFriendRequest(
    senderId: string,
    receiverId: string
  ): Promise<IFriendRequest> {
    await checkUserExists(senderId);
    await checkUserExists(receiverId);

    const friendRequestData = {
      sender: senderId,
      receiver: receiverId,
    };

    const friendRequest = await this.friendRequestModel.create(
      friendRequestData
    );

    return friendRequest;
  }

  async acceptFriendRequest(
    receiverId: string,
    friendRequestId: string
  ): Promise<IFriendRequest> {
    const session = await startSession();
    session.startTransaction();
    try {
      const receiver = await checkUserExists(receiverId);
      const friendRequest = await this.friendRequestModel
        .findById(friendRequestId)
        .session(session);

      if (!friendRequest)
        throw new CustomError("Friend request not found", 404);

      if (friendRequest.receiver.toString() !== receiverId)
        throw new CustomError("Unauthorized", 401);

      friendRequest.status = "accepted";
      await friendRequest.save({ session });

      receiver.friends.push(friendRequest.sender);
      await receiver.save({ session });

      await session.commitTransaction();
      session.endSession();

      return friendRequest;
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      throw new CustomError("An error occurred", 500);
    }
  }

  async rejectFriendRequest(
    receiverId: string,
    friendRequestId: string
  ): Promise<IFriendRequest> {
    const session = await startSession();
    session.startTransaction();
    try {
      const receiver = await checkUserExists(receiverId);
      const friendRequest = await this.friendRequestModel
        .findById(friendRequestId)
        .session(session);

      if (!friendRequest)
        throw new CustomError("Friend request not found", 404);

      if (friendRequest.receiver.toString() !== receiverId)
        throw new CustomError("Unauthorized", 401);

      friendRequest.status = "rejected";
      await friendRequest.save({ session });

      receiver.friends.push(friendRequest.sender);
      await receiver.save({ session });

      await session.commitTransaction();
      session.endSession();

      return friendRequest;
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      throw new CustomError("An error occurred", 500);
    }
  }

  async removeFriend(userId: string, friendId: string) {
    const session = await startSession();
    session.startTransaction();
    try {
      const user = await checkUserExists(userId);
      const friend = await checkUserExists(friendId);

      if (!user.friends.includes(new mongoose.Types.ObjectId(friendId)))
        throw new CustomError("User is not your friend", 400);

      user.friends = user.friends.filter(
        (friend) => friend.toString() !== friendId
      );
      await user.save({ session });

      friend.friends = friend.friends.filter(
        (friend) => friend.toString() !== userId
      );
      await friend.save({ session });

      await session.commitTransaction();
      session.endSession();

      return;
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      throw new CustomError("An error occurred", 500);
    }
  }
}
