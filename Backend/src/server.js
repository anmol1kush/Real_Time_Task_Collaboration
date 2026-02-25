import http from "http";
import dotenv from "dotenv";
import { Server } from "socket.io";

import app from "./app.js";
import { connectMongo } from "./utils/mongo.js";
import { initRedis } from "./utils/redis.js";
import { prisma } from "./utils/prisma.js";

// import { socketAuthMiddleware } from "./sockets/socketAuth.js";
// import { registerSocketHandlers } from "./sockets/socketHandlers.js";

dotenv.config();

const server = http.createServer(app);

const io = new Server(server, {
  cors: { origin: "*", methods: ["GET", "POST"] }
});

/* -------- Socket.IO -------- */
// io.use(socketAuthMiddleware);
// io.on("connection", (socket) => {
//   registerSocketHandlers(io, socket);
// });

const PORT = process.env.PORT || 3000;

async function start() {
  await prisma.$connect();
  // await connectMongo();
  // await initRedis();

  server.listen(PORT, () => {
    console.log(`🚀 Backend running at http://localhost:${PORT}`);
  });
}

start();