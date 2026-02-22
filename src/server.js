import express from "express";
import cookieParser from "cookie-parser";
import {ENV} from "./lib/env.js";
import { createServer } from "http";
import { Server } from "socket.io";
import { setIO } from "./lib/socket.js";
//IMPORTS
import authroutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import { connectDb } from "./lib/db.js";
import cors from "cors";

const app = express()
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: ENV.CLIENT_URL,
    credentials: true
  }
});

setIO(io);

//MIDDLEWARE
app.use(express.json());
app.use(cors({
  origin: ENV.CLIENT_URL,
  credentials: true
}))
app.use(cookieParser());

const PORT = ENV.PORT

//STORE ACTIVE USERS
const activeUsers = new Map(); // userId -> socketId

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("user_online", (userId) => {
    activeUsers.set(userId, socket.id);
    io.emit("user_status_changed", { userId, status: "online" });
  });

  socket.on("send_message", (data) => {
    const { receiverId } = data;
    const receiverSocketId = activeUsers.get(receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("receive_message", data);
    }
  });

  socket.on("user_typing", (data) => {
    const { receiverId, senderId } = data;
    const receiverSocketId = activeUsers.get(receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("user_typing", { senderId });
    }
  });

  socket.on("user_stopped_typing", (data) => {
    const { receiverId, senderId } = data;
    const receiverSocketId = activeUsers.get(receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("user_stopped_typing", { senderId });
    }
  });

  socket.on("disconnect", () => {
    let disconnectedUserId;
    for (const [userId, sockId] of activeUsers.entries()) {
      if (sockId === socket.id) {
        disconnectedUserId = userId;
        activeUsers.delete(userId);
        break;
      }
    }
    if (disconnectedUserId) {
      io.emit("user_status_changed", { userId: disconnectedUserId, status: "offline" });
    }
    console.log("User disconnected:", socket.id);
  });
});

//ENDPOINTS
app.use("/api/auth", authroutes);
app.use("/api/messages", messageRoutes)


httpServer.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
    connectDb()
})