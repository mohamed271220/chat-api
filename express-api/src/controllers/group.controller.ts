import { NextFunction, Response } from "express";
import { userRequest } from "../interfaces";
import { GroupService } from "../services/group.service";
import { CustomError } from "../utils/CustomError";

const groupService = new GroupService();

export const createGroup = async (
  req: userRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user) throw new CustomError("Unauthorized", 401);
    const creatorId = req.user.id;
    const { name, members } = req.body;
    const group = await groupService.createGroup(creatorId, name, members);
    res.status(201).json({ message: "Group created successfully", group });
  } catch (error) {
    next(error);
  }
};

export const getGroup = async (
  req: userRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const groupId = req.params.groupId;
    const group = await groupService.getGroup(groupId);
    res.status(200).json({ message: "Group fetched successfully", group });
  } catch (error) {
    next(error);
  }
};

export const updateGroup = async (
  req: userRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user) throw new CustomError("Unauthorized", 401);
    const requestorId = req.user.id;
    const groupId = req.params.groupId;
    const { name } = req.body;
    const group = await groupService.updateGroupDetails(
      requestorId,
      groupId,
      name
    );
    res.status(200).json({ message: "Group updated successfully", group });
  } catch (error) {
    next(error);
  }
};

export const deleteGroup = async (
  req: userRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user) throw new CustomError("Unauthorized", 401);
    const requestorId = req.user.id;
    const groupId = req.params.groupId;
    await groupService.deleteGroup(requestorId, groupId);
    res.status(200).json({ message: "Group deleted successfully" });
  } catch (error) {
    next(error);
  }
};

export const getAllGroups = async (
  req: userRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user) throw new CustomError("Unauthorized", 401);
    const limit = parseInt(req.query.limit as string) || 10;
    const offset = parseInt(req.query.offset as string) || 0;
    const search = req.query.search as string | undefined; //
    const userId = req.user?.id;
    const { groups, pagination } = await groupService.getAllGroups(
      userId,
      limit,
      offset,
      search
    );
    res
      .status(200)
      .json({ message: "Groups fetched successfully", groups, pagination });
  } catch (error) {
    next(error);
  }
};

export const addUserToGroup = async (
  req: userRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user) throw new CustomError("Unauthorized", 401);
    const requestorId = req.user.id;
    const groupId = req.params.groupId;
    const userId = req.body.userId;
    const group = await groupService.addUserToGroup(
      requestorId,
      groupId,
      userId
    );
    res
      .status(200)
      .json({ message: "User added to group successfully", group });
  } catch (error) {
    next(error);
  }
};

export const removeUserFromGroup = async (
  req: userRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user) throw new CustomError("Unauthorized", 401);
    const requestorId = req.user.id;
    const groupId = req.params.groupId;
    const userId = req.params.userId;
    await groupService.removeUserFromGroup(requestorId, groupId, userId);
    res.status(200).json({ message: "User removed from group successfully" });
  } catch (error) {
    next(error);
  }
};

export const getUsersInGroup = async (
  req: userRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const groupId = req.params.groupId;
    const users = await groupService.getUsersInGroup(groupId);
    res.status(200).json({ message: "Users fetched successfully", users });
  } catch (error) {
    next(error);
  }
};

export const makeUserAdmin = async (
  req: userRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user) throw new CustomError("Unauthorized", 401);
    const requestorId = req.user.id;
    const groupId = req.params.groupId;
    const userId = req.params.userId;
    const group = await groupService.makeUserAdmin(
      requestorId,
      groupId,
      userId
    );
    res
      .status(200)
      .json({ message: "User is now an admin of the group", group });
  } catch (error) {
    next(error);
  }
};
