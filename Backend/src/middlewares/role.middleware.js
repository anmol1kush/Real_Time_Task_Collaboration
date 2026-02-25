import { prisma } from "../utils/prisma.js";

export function requireProjectRole(requiredRole) {
  return async (req, res, next) => {
    const { projectId } = req.params;
    const userId = req.user.id;

    const membership = await prisma.membership.findUnique({
      where: {
        userId_projectId: {
          userId,
          projectId
        }
      }
    });

    if (!membership) {
      return res.status(403).json({ message: "Not a project member" });
    }

    if (requiredRole === "ADMIN" && membership.role !== "ADMIN") {
      return res.status(403).json({ message: "Admin access required" });
    }

    next();
  };
}