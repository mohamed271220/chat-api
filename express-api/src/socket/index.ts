import { Server, Socket } from "socket.io";
import cookie from "cookie";
import GroupMessage from "../models/groupMessage/group-message.model";
import DirectMessage from "../models/directMessage/direct-message.model";
import { verifyToken } from "../utils/jwt";

export interface AuthenticatedSocket extends Socket {
  user: {
    id: string;
  };
}

import { Server as HTTPServer } from "http";

export default function initializeSocketIO(server: HTTPServer): Server {
  const io = new Server(server, {
    cors: {
      origin: true,
      credentials: true,
    },
  });

  io.use((socket, next) => {
    const cookies = cookie.parse(socket.handshake.headers.cookie || "");
    const token = cookies.auth_token;

    if (!token) {
      return next(new Error("Authentication error"));
    }

    try {
      const user = verifyToken(token);
      if (!user) {
        return next(new Error("Authentication error"));
      }
      (socket as AuthenticatedSocket).user = { id: user.id };
      next();
    } catch (error) {
      console.error("Authentication error:", error);
      return next(new Error("Authentication error"));
    }
  });


  io.on("connection", (socket: Socket) => {
    const authenticatedSocket = socket as AuthenticatedSocket;
    const userId = authenticatedSocket.user.id;
    authenticatedSocket.join(userId);
    console.log(`User connected: ${userId}`);

    socket.on("joinRoom", (room: string) => {
      socket.join(room);
      console.log(`User ${userId} joined room: ${room}`);
    });

    socket.on("sendGroupMessage", async ({ room, message, media }) => {
      const newMessage = new GroupMessage({
        group: room,
        sender: userId,
        message: message,
        media: media,
        createdAt: new Date(),
        isRead: false,
      });

      await newMessage.save();
      io.to(room).emit("receiveGroupMessage", newMessage);
    });

    socket.on("sendDirectMessage", async ({ receiverId, message, media }) => {
      const newMessage = new DirectMessage({
        sender: userId,
        receiver: receiverId,
        message: message,
        media: media,
        createdAt: new Date(),
      });
      await newMessage.save();
      io.to(receiverId).emit("receiveDirectMessage", newMessage);
    });

    socket.on("disconnect", () => {
      console.log(`User disconnected: ${userId}`);
    });
  });

  return io;
}
