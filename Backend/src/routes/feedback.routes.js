import { Router } from "express";
import { sendFeedback } from "../controllers/feedback.controller.js";

const router = Router();

router.post("/", sendFeedback);

export default router;
