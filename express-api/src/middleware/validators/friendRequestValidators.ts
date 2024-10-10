import { body, param } from 'express-validator';
import { handleValidationErrors } from './reportErrors';

export const sendFriendRequestValidator = [
  param('receiverId').isMongoId().withMessage('Receiver ID must be a valid Mongo ID'),
  handleValidationErrors,
];

export const acceptRejectFriendRequestValidator = [
  param('requestId').isMongoId().withMessage('Request ID must be a valid Mongo ID'),
  handleValidationErrors,
];

export const removeFriendValidator = [
  param('friendId').isMongoId().withMessage('Friend ID must be a valid Mongo ID'),
  handleValidationErrors,
];
