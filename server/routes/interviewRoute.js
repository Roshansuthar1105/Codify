import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import devAuthMiddleware from "../middlewares/devAuthMiddleware.js";
import { startSession, requestHint, submitSolution, getHistory, getSession } from "../controllers/interviewController.js";

const router = express.Router();

// Use devAuthMiddleware for testing when MongoDB is read-only
// TODO: Switch back to authMiddleware when you have a writable database
const authToUse = devAuthMiddleware; // Change to authMiddleware for production

router.post("/start", authToUse, startSession);
router.post("/hint", authToUse, requestHint);
router.post("/submit", authToUse, submitSolution);
router.get("/history", authToUse, getHistory);
router.get("/:id", authToUse, getSession);

export default router;