import { Router } from "express";
import {
    getCodespaceStatus,
    startProjectCodespace,
    stopProjectCodespace
} from "../controllers/codespace.controller.js";

// Optional: protect with authentication middleware
// import { protect } from "../middlewares/auth.js";

const router = Router();

router.get("/:projectId/status", getCodespaceStatus);
router.post("/:projectId/start", startProjectCodespace);
router.post("/:projectId/stop", stopProjectCodespace);

export default router;
