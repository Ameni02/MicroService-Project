# 💬 Real-time Discussion Forum Service

<div align="center">
  <img src="https://img.shields.io/badge/Node.js-18-green" alt="Node.js">
  <img src="https://img.shields.io/badge/Express-4.18-blue" alt="Express">
  <img src="https://img.shields.io/badge/Socket.IO-4.7-red" alt="Socket.IO">
  <img src="https://img.shields.io/badge/Sequelize-6.31-orange" alt="Sequelize">
</div>


## 🎯 Why These Technologies?

### Core Technologies
- **Node.js**: Chosen for its event-driven, non-blocking I/O model, making it perfect for real-time applications. Its vast npm ecosystem provides numerous ready-to-use packages, accelerating development.

- **Express.js**: Selected as our web framework for its minimalist approach, robust routing system, and middleware support. It provides the perfect balance between features and flexibility.

- **Socket.IO**: Implemented for real-time, bidirectional communication between clients and server. Essential for features like:
  - Live message updates
  - Typing indicators
  - Instant notifications
  - Active user presence

- **Sequelize ORM**: Utilized for:
  - Database abstraction
  - Easy data modeling
  - Cross-database compatibility
  - Built-in data validation
  - Transaction support

## 🚀 Features

- Real-time discussion threads
- Instant messaging capabilities
- Thread categorization
- User notifications
- Message history
- Rich text support
- File attachments

## 💻 Technical Architecture

```plaintext
Discussion Forum Service
├── Real-time Communication (Socket.IO)
├── REST API (Express)
├── Data Layer (Sequelize)
└── Database (SQLite)
```

## 🛠️ Setup & Installation

### Prerequisites
- Node.js 18+
- npm/yarn


## 🐳 Docker Deployment

```bash
# Build image
docker build -t discussion-forum-service .

# Run container
docker run -p 3000:3000 discussion-forum-service
```



## 📡 API Endpoints

### Threads
- `GET /api/threads` - List all threads
- `POST /api/threads` - Create new thread
- `GET /api/threads/:id` - Get thread details
- `PUT /api/threads/:id` - Update thread
- `DELETE /api/threads/:id` - Delete thread

### Replies
- `GET /api/threads/:threadId/replies` - Get thread replies
- `POST /api/threads/:threadId/replies` - Add reply
- `PUT /api/threads/:threadId/replies/:replyId` - Update reply
- `DELETE /api/threads/:threadId/replies/:replyId` - Delete reply

## 🔌 WebSocket Events

```javascript
// Client-side events
socket.emit('join_thread', threadId);
socket.emit('new_message', messageData);
socket.emit('typing_start', userData);
socket.emit('typing_end', userData);

// Server-side events
socket.on('message_received', messageData);
socket.on('user_joined', userData);
socket.on('typing_update', typingData);
```




---

<div align="center">
  <sub>Built with ❤️ by the Training Platform Team</sub>
</div>