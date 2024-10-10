import { body } from "express-validator";
import { handleValidationErrors } from "./reportErrors";

export const validateCreateProfile = [
  body("website").optional().isURL().withMessage("Website must be a valid URL"),
  body("firstName").notEmpty().withMessage("First name is required"),
  body("lastName").notEmpty().withMessage("Last name is required"),
  body("bio")
    .optional()
    .isLength({ max: 500 })
    .withMessage("Bio must be less than 500 characters"),
  body("avatarUrl")
    .optional()
    .isURL()
    .withMessage("Avatar URL must be a valid URL"),
  handleValidationErrors,
];

export const validateUpdateProfile = [
  body("website").optional().isURL().withMessage("Website must be a valid URL"),
  body("firstName").notEmpty().withMessage("First name is required"),
  body("lastName").notEmpty().withMessage("Last name is required"),
  body("bio")
    .optional()
    .isLength({ max: 500 })
    .withMessage("Bio must be less than 500 characters"),
  body("avatarUrl")
    .optional()
    .isURL()
    .withMessage("Avatar URL must be a valid URL"),
  handleValidationErrors,
];
