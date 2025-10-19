import express from "express";
import {
  addReply,
  updateReply,
  deleteReply,
  voteReply, // ✅ import it
} from "../controllers/replyController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

// Add a reply (nested replies supported via parentId)
router.post("/questions/:id/replies", authMiddleware, addReply);

// Update a reply
router.patch("/replies/:replyId", authMiddleware, updateReply);

// Delete a reply
router.delete("/replies/:replyId", authMiddleware, deleteReply);

// Vote on a reply
router.post("/replies/:replyId/vote", authMiddleware, voteReply);

export default router;
