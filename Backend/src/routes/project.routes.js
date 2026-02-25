import express from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { requireProjectRole } from "../middlewares/role.middleware.js";

import {
  createProject,
  getMyProjects,
  updateProject,
  deleteProject
} from "../controllers/project.controller.js";

import {
  createInvite,
  acceptInvite
} from "../controllers/invite.controller.js";

const router = express.Router();

/* -------- PROJECTS -------- */
router.post("/", authMiddleware, createProject);
router.get("/", authMiddleware, getMyProjects);

router.put(
  "/:projectId",
  authMiddleware,
  requireProjectRole("ADMIN"),
  updateProject
);

router.delete(
  "/:projectId",
  authMiddleware,
  requireProjectRole("ADMIN"),
  deleteProject
);

/* -------- INVITES -------- */
router.post(
  "/:projectId/invite",
  authMiddleware,
  requireProjectRole("ADMIN"),
  createInvite
);

router.post("/invite/:inviteId/accept", authMiddleware, acceptInvite);

export default router;