import { body } from "express-validator";
import { handleValidationErrors } from "./reportErrors";

export const createMessageValidator = [
  body("message")
    .notEmpty()
    .withMessage("Message content is required")
    .isLength({ max: 500 })
    .optional()
    .withMessage("Message content cannot exceed 500 characters"),
  body("media").optional().isURL().withMessage("Media must be a valid URL"),
  handleValidationErrors,
];

export const addReactionValidator = [
  body("reactionTypeId")
    .notEmpty()
    .withMessage("Reaction type is required")
    .isMongoId()
    .withMessage("Reaction type must be a valid ID"),
  handleValidationErrors,
];
