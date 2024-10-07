import { NextFunction, Response } from "express";
import { userRequest } from "../interfaces";
import FriendRequestService from "../services/friend-request.service";
import { CustomError } from "../utils/CustomError";

const friendRequestService = new FriendRequestService();

export const getFriendRequests = async (
  req: userRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user) throw new CustomError("Unauthorized", 401);
    const friendRequests = await friendRequestService.getFriendRequests(
      req.user.id
    );
    res.status(200).json({
      message: "Fetched friend requests successfully",
      friendRequests,
    });
  } catch (error) {
    next(error);
  }
};

export const getSentFriendRequests = async (
  req: userRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user) throw new CustomError("Unauthorized", 401);
    const sentFriendRequests = await friendRequestService.getSentFriendRequests(
      req.user.id
    );
    res.status(200).json({
      message: "Fetched sent friend requests successfully",
      sentFriendRequests,
    });
  } catch (error) {
    next(error);
  }
};

export const getFriends = async (
  req: userRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user) throw new CustomError("Unauthorized", 401);
    const friends = await friendRequestService.getFriends(req.user.id);
    res.status(200).json({ message: "Fetched friends successfully", friends });
  } catch (error) {
    next(error);
  }
};

export const getFriend = async (
  req: userRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user) throw new CustomError("Unauthorized", 401);
    const friendId = req.params.friendId;
    const friend = await friendRequestService.getFriend(req.user.id, friendId);
    res.status(200).json({ message: "Fetched friend successfully", friend });
  } catch (error) {
    next(error);
  }
};

export const sendFriendRequest = async (
  req: userRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user) throw new CustomError("Unauthorized", 401);
    const receiverId = req.params.receiverId;
    await friendRequestService.sendFriendRequest(req.user.id, receiverId);
    res.status(201).json({ message: "Friend request sent successfully" });
  } catch (error) {
    next(error);
  }
};

export const acceptFriendRequest = async (
  req: userRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user) throw new CustomError("Unauthorized", 401);
    const requestId = req.params.requestId;
    await friendRequestService.acceptFriendRequest(req.user.id, requestId);
    res.status(200).json({ message: "Friend request accepted successfully" });
  } catch (error) {
    next(error);
  }
};

export const rejectFriendRequest = async (
  req: userRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user) throw new CustomError("Unauthorized", 401);
    const requestId = req.params.requestId;
    await friendRequestService.rejectFriendRequest(req.user.id, requestId);
    res.status(200).json({ message: "Friend request rejected successfully" });
  } catch (error) {
    next(error);
  }
};

export const removeFriend = async (
  req: userRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user) throw new CustomError("Unauthorized", 401);
    const friendId = req.params.friendId;
    await friendRequestService.removeFriend(req.user.id, friendId);
    res.status(200).json({ message: "Friend removed successfully" });
  } catch (error) {
    next(error);
  }
};
