import { verifyToken } from "../utils/jwt.js";
import { prisma } from "../utils/prisma.js";

export async function authMiddleware(req, res, next) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = verifyToken(token);

    const user = await prisma.user.findUnique({
      where: { id: decoded.userId }
    });

    if (!user) {
      return res.status(401).json({ message: "Invalid user" });
    }

    req.user = user; // attach user to request
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
}