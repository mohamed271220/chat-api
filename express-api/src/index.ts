import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import { errorHandler } from "./middleware/error-handler";

import authRoutes from "./routes/auth.route";
import profileRoutes from "./routes/profile.route";
import directMessageRoutes from "./routes/direct-message.route";
import uploadRoutes from "./routes/upload.route";
import groupRoutes from "./routes/group.route";

dotenv.config();

import connectDB from "./config/database";
import swaggerRouter from "./config/swagger";

const app = express();
app.use(express.json());
app.use(morgan("dev"));
app.use(helmet());
app.use(
  cors({
    origin: "*",
    optionsSuccessStatus: 200,
    credentials: true,
  })
);
app.use(cookieParser());

// Connect to the database
connectDB();

// Routes
app.use("/api/v1/media", uploadRoutes);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/direct-messages", directMessageRoutes);
app.use("/api/v1/groups", groupRoutes);
app.use(errorHandler);

// Swagger docs route
app.use("/api/v1/official-docs/express-api-docs", swaggerRouter);

export default app;
