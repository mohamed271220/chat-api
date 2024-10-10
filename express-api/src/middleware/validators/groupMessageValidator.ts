import { body, param } from "express-validator";
import { handleValidationErrors } from "./reportErrors";

export const validateSendGroupMessage = [
  param("groupId").isMongoId().withMessage("Invalid group ID"),
  body("message").optional().isString().withMessage("Message must be a string"),
  body("media").optional().isURL().withMessage("Media must be a valid URL"),
  handleValidationErrors,
];

export const validateEditGroupMessage = [
  param("groupId").isMongoId().withMessage("Invalid group ID"),
  param("messageId").isMongoId().withMessage("Invalid message ID"),
  body("message").isString().withMessage("Message must be a string"),
  handleValidationErrors,
];

export const validateDeleteGroupMessage = [
  param("groupId").isMongoId().withMessage("Invalid group ID"),
  param("messageId").isMongoId().withMessage("Invalid message ID"),
  handleValidationErrors,
];

export const validateAddReactionToGroupMessage = [
  param("groupId").isMongoId().withMessage("Invalid group ID"),
  param("messageId").isMongoId().withMessage("Invalid message ID"),
  body("reactionTypeId").isMongoId().withMessage("Invalid reaction type ID"),
  handleValidationErrors,
];
