import { Request } from "express";

export interface JwtPayload {
  id: string;
}

export interface userRequest extends Request {
  user?: {
    id: string;
  };
}
