import { NextFunction, Response } from "express";
import { userRequest } from "../interfaces";
import { CustomError } from "../utils/CustomError";
import { ProfileService } from "../services/profile.service";

const profileService = new ProfileService();

export const getProfile = async (
  req: userRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user) throw new CustomError("Unauthorized", 401);
    const userId = req.user.id;
    const profile = await profileService.getProfile(userId);
    res.status(200).json({ message: "Profile found", profile });
  } catch (error) {
    next(error);
  }
};
export const createProfile = async (
  req: userRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user) throw new CustomError("Unauthorized", 401);
    const userId = req.user.id;
    const { website, firstName, lastName, bio, avatarUrl } = req.body;
    const profile = await profileService.createProfile(userId, {
      website,
      firstName,
      lastName,
      bio,
      avatarUrl,
    });
    res.status(201).json({ message: "Profile created", profile });
  } catch (error) {
    next(error);
  }
};

export const changeProfileDetails = async (
  req: userRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user) throw new CustomError("Unauthorized", 401);
    const userId = req.user.id;
    const { website, firstName, lastName, bio, avatarUrl } = req.body;
    const profile = await profileService.updateProfile(userId, {
      website,
      firstName,
      lastName,
      bio,
      avatarUrl,
    });
    res.status(200).json({ message: "Profile updated", profile });
  } catch (error) {
    next(error);
  }
};
export const deleteProfile = async (
  req: userRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user) throw new CustomError("Unauthorized", 401);
    const userId = req.user.id;
    await profileService.deleteProfile(userId);
    res.status(200).json({ message: "Profile deleted" });
  } catch (error) {
    next(error);
  }
};
