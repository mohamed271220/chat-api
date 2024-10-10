import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*', // Adjust CORS as needed for your environment
  },
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Socket;

  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  // Listening for new messages in a conversation
  @SubscribeMessage('privateMessage')
  handlePrivateMessage(
    client: Socket,
    payload: { sender: string; receiverId: string; message: string },
  ) {
    console.log(
      `Received private message from ${payload.sender} to ${payload.receiverId}: ${payload.message}`,
    );

    // Emit the message to the specific receiver
    this.server.to(payload.receiverId).emit('privateMessage', payload);
  }

  // Listening for new messages in a group chat
  @SubscribeMessage('groupMessage')
  handleGroupMessage(
    client: Socket,
    payload: { sender: string; groupId: string; message: string },
  ) {
    console.log(
      `Received group message from ${payload.sender} in group ${payload.groupId}: ${payload.message}`,
    );

    // Emit the message to all clients in the group
    this.server.to(payload.groupId).emit('groupMessage', payload);
  }

  // Join a room for group chat (can be called by client)
  @SubscribeMessage('joinGroup')
  handleJoinGroup(client: Socket, groupId: string) {
    client.join(groupId);
    console.log(`Client ${client.id} joined group ${groupId}`);
  }

  // Leave a room for group chat (can be called by client)
  @SubscribeMessage('leaveGroup')
  handleLeaveGroup(client: Socket, groupId: string) {
    client.leave(groupId);
    console.log(`Client ${client.id} left group ${groupId}`);
  }
}
