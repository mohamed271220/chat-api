// src/socket/index.ts
import { Server, Socket } from "socket.io";
import cookie from "cookie";
import GroupMessage from "../models/groupMessage/group-message.model";
import DirectMessage from "../models/directMessage/direct-message.model";
import { verifyToken } from "../utils/jwt"; // Ensure this path is correct
export interface AuthenticatedSocket extends Socket {
  user: {
    id: string;
  };
}
export default function initializeSocketIO(server: any) {
  const io = new Server(server, {
    cors: {
      origin: true, // Adjust this according to your needs
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
      console.error(error);
      return next(new Error("Authentication error"));
    }
  });

  io.on("connection", (socket) => {
    const authenticatedSocket = socket as AuthenticatedSocket;
    const userId = authenticatedSocket.user.id;
    socket.join(userId); // User joins their personal room

    console.log(`User connected: ${userId}`);

    // Handle user joining a chat room
    authenticatedSocket.on("joinRoom", (room) => {
      authenticatedSocket.join(room);
    });

    // Handle sending a group message
    authenticatedSocket.on("sendGroupMessage", async ({ room, message }) => {
      const newMessage = new GroupMessage({
        group: room,
        sender: userId,
        encryptedMessage: message,
        createdAt: new Date(),
        isRead: false,
      });

      await newMessage.save();

      io.to(room).emit("receiveGroupMessage", newMessage);
    });

    // Handle sending a direct message
    authenticatedSocket.on(
      "sendDirectMessage",
      async ({ receiverId, message }) => {
        const newMessage = new DirectMessage({
          sender: userId,
          receiver: receiverId,
          encryptedMessage: message,
          createdAt: new Date(),
        });

        await newMessage.save();

        io.to(receiverId).emit("receiveDirectMessage", newMessage);
      }
    );

    // Handle user disconnecting
    authenticatedSocket.on("disconnect", () => {
      console.log(`User disconnected: ${userId}`);
    });
  });

  return io;
}
