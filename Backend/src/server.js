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
import { createProxyMiddleware } from "http-proxy-middleware";

// ...

// io.use(socketAuthMiddleware);
// io.on("connection", (socket) => {
//   registerSocketHandlers(io, socket);
// });

/* -------- CODESPACE PROXY -------- */
app.use(
  "/codespace/:projectId",
  createProxyMiddleware({
    // Using a dynamic router to find the target dynamically based on projectId
    router: async function (req) {
      const { projectId } = req.params;

      // Look up the port in the Memory map from docker service
      const port = await import("./services/docker.service.js").then(m => m.codespacePorts.get(projectId));

      if (port) {
        return `http://localhost:${port}`;
      }

      // Fallback
      return "http://localhost:8080";
    },
    changeOrigin: true,
    ws: true, // Websockets needed for VS Code server
    pathRewrite: (path, req) => path.replace(`/codespace/${req.params.projectId}`, ""),
  })
);

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