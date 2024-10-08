# Chat API

## Overview

The Chat API is a powerful and flexible application built with Express and TypeScript that enables users to engage in real-time communication through direct messaging, group chats, and more. This API supports various features such as friend requests, media sharing, profile management, and message reactions, making it an ideal solution for building chat applications.

## Table of Contents

- [Features](#features)
- [Getting Started](#getting-started)
- [Authentication](#authentication)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)
- [License](#license)

## Features

- **Direct Chat**: Communicate one-on-one with other users in real-time.
- **Groups**: Create and manage group chats for larger conversations.
- **Friend Requests**: Send and accept friend requests to connect with other users.
- **Media Sharing**: Share images, videos, and other media files within chats.
- **Profile Management**: Users can manage their profiles, including updating their information and profile pictures.
- **Message Reactions**: Express feelings with various reactions on messages.

## Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (version 14 or higher)
- TypeScript
- MongoDB (or your preferred database)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/mohamed271220/chat-api
   cd express-api
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add the following variables:

   ```bash
   PORT=3000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```


## Authentication

This API uses JWT (JSON Web Tokens) for authentication. After logging in, users receive a token that must be included in the `Authorization` header for protected routes.

### Example:

```bash
Authorization: Bearer your_jwt_token
```

## Technologies Used

- **Express**: Fast and minimalist web framework for Node.js.
- **TypeScript**: A strict syntactical superset of JavaScript that adds optional static typing.
- **MongoDB**: NoSQL database to store user and message data.
- **JWT**: Token-based authentication system.
- **Socket.IO**: For real-time communication.

## Contributing

Contributions are welcome! If you have suggestions or improvements, please create a pull request or open an issue.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a pull request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

