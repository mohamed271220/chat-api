import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import { errorHandler } from "./middleware/error-handler";

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
app.use(errorHandler);

// Swagger docs route
app.use("/api/v1/official-docs/express-api-docs", swaggerRouter);

export default app;