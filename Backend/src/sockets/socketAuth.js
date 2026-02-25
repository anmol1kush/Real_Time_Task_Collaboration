import jwt from "jsonwebtoken";
import { prisma } from "../utils/prisma.js";

export async function socketAuthMiddleware(socket, next) {
  try {
    const token = socket.handshake.auth?.token;
    if (!token) return next(new Error("No token"));

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await prisma.user.findUnique({
      where: { id: decoded.userId }
    });

    if (!user) return next(new Error("Invalid user"));

    socket.user = user; // attach user to socket
    next();
  } catch (err) {
    next(new Error("Unauthorized socket"));
  }
}