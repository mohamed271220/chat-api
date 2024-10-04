import { NextFunction, Response } from "express";
import { userRequest } from "../interfaces";
import { CustomError } from "../utils/CustomError";
import { GroupMessageService } from "../services/group-message.service";

const groupMessageService = new GroupMessageService();

export const sendGroupMessage = async (
  req: userRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user) throw new CustomError("Unauthorized", 401);
    const senderId = req.user.id;
    const { groupId } = req.params;
    const { message, media } = req.body;

    const groupMessage = await groupMessageService.sendGroupMessage(
      senderId,
      groupId,
      {
        message,
        media,
      }
    );

    res
      .status(201)
      .json({ message: "Message sent successfully", groupMessage });
  } catch (error) {
    next(error);
  }
};

export const getGroupMessages = async (
  req: userRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user) throw new CustomError("Unauthorized", 401);
    const userId = req.user.id;
    const groupId = req.params.groupId;
    const messages = await groupMessageService.getGroupMessages(
      userId,
      groupId
    );
    res
      .status(200)
      .json({ message: "Fetched messages successfully", messages });
  } catch (error) {
    next(error);
  }
};

export const editGroupMessage = async (
  req: userRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user) throw new CustomError("Unauthorized", 401);
    const userId = req.user.id;
    const { groupId, messageId } = req.params;
    const { message, media } = req.body;

    const updatedMessage = await groupMessageService.editGroupMessage(
      userId,
      groupId,
      messageId,
      message
    );

    res
      .status(200)
      .json({ message: "Message updated successfully", updatedMessage });
  } catch (error) {
    next(error);
  }
};

export const deleteGroupMessage = async (
  req: userRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user) throw new CustomError("Unauthorized", 401);
    const userId = req.user.id;
    const { groupId, messageId } = req.params;

    await groupMessageService.deleteGroupMessage(userId, groupId, messageId);

    res.status(200).json({ message: "Message deleted successfully" });
  } catch (error) {
    next(error);
  }
};

export const addReactionToGroupMessage = async (
  req: userRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user) throw new CustomError("Unauthorized", 401);
    const userId = req.user.id;
    const { messageId, groupId } = req.params;
    const { reactionTypeId } = req.body;

    const updatedMessage = await groupMessageService.addReactionToGroupMessage(
      userId,
      groupId,
      messageId,
      reactionTypeId
    );

    res
      .status(200)
      .json({ message: "Reaction added successfully", updatedMessage });
  } catch (error) {
    next(error);
  }
};
