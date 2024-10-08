import express, { NextFunction, Response } from "express";

import { authenticateToken } from "../middleware/auth.middleware";
import { userRequest } from "../interfaces";
import ReactionType from "../models/reactionType/reaction-type.model";
import { CustomError } from "../utils/CustomError";

// /api/v1/reactions

const router = express.Router();

// get all reactions for a message
router.get(
  "/",
  authenticateToken,
  async (req: userRequest, res: Response, next: NextFunction) => {
    try {
      if (!req.user) throw new CustomError("Unauthorized", 401);
      const reactions = await ReactionType.find();
      res
        .status(200)
        .json({ message: "Fetched reactions successfully", reactions });
    } catch (error) {
      next(error);
    }
  }
);

export default router;