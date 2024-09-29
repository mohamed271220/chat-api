import { NextFunction, Response } from "express";
import { userRequest } from "../interfaces";
import { CustomError } from "../utils/CustomError";
import { DirectMessageService } from "../services/direct-message.service";

const directMessageService = new DirectMessageService();

export const getDirectMessages = async (
  req: userRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user) throw new CustomError("Unauthorized", 401);
    const senderId = req.user.id;
    const receiverId = req.params.receiverId;

    const messages = await directMessageService.getDirectMessages(
      senderId,
      receiverId
    );
    res
      .status(200)
      .json({ message: "Fetched messages successfully", messages });
  } catch (error) {
    next(error);
  }
};

export const createDirectMessage = async (
  req: userRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user) throw new CustomError("Unauthorized", 401);
    const senderId = req.user.id;
    const receiverId = req.params.receiverId;
    const { message, media } = req.body;

    const dm = await directMessageService.createDirectMessage(
      senderId,
      receiverId,
      message,
      media
    );

    res.status(201).json({ message: "Message sent successfully", dm });
  } catch (error) {
    next(error);
  }
};

export const deleteDirectMessage = async (
  req: userRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user) throw new CustomError("Unauthorized", 401);
    const senderId = req.user.id;
    const receiverId = req.params.receiverId;
    const messageId = req.params.messageId;

    await directMessageService.deleteDirectMessage(
      senderId,
      receiverId,
      messageId
    );

    res.status(200).json({ message: "Message deleted successfully" });
  } catch (error) {
    next(error);
  }
};
