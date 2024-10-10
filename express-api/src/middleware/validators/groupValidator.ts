import { body, param } from "express-validator";
import { handleValidationErrors } from "./reportErrors";

export const validateCreateGroup = [
    body("name").isString().withMessage("Name must be a string"),
    body("members")
      .isArray()
      .withMessage("Members must be an array of user IDs"),
    body("members.*").isString().withMessage("Each member ID must be a string"),
    handleValidationErrors,
]

export const validateUpdateGroup = [
    param("groupId").isMongoId().withMessage("Invalid group ID"),
    body("name").isString().withMessage("Name must be a string"),
    handleValidationErrors,
]


export const validateDeleteGroup = [
    param("groupId").isMongoId().withMessage("Invalid group ID"),
    handleValidationErrors,
]

export const validateAddUserToGroup = [
    param("groupId").isMongoId().withMessage("Invalid group ID"),
    body("userId").isString().withMessage("User ID must be a string"),
    handleValidationErrors,
]

export const validateRemoveUserFromGroup = [
    param("groupId").isMongoId().withMessage("Invalid group ID"),
    param("userId").isString().withMessage("User ID must be a string"),
    handleValidationErrors,
]

export const validateMakeUserAdmin = [
    param("groupId").isMongoId().withMessage("Invalid group ID"),
    param("userId").isString().withMessage("User ID must be a string"),
    handleValidationErrors,
]