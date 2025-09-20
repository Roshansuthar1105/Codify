import express from "express";
import {
  saveCodeSnippet,
  getUserSnippets,
  getSnippetById,
  updateSnippet,
  deleteSnippet,
  executeCode,
  getPublicSnippets,
  getAICompletion
} from "../controllers/ideController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const ideRouter = express.Router();

// Code execution routes
ideRouter.route("/execute")
  .post(executeCode); // Allow execution without auth for demo purposes

// AI completion routes
ideRouter.route("/ai/complete")
  .post(getAICompletion);

// Public snippets (no auth required)
ideRouter.route("/public/snippets")
  .get(getPublicSnippets);

// Protected routes (require authentication)
ideRouter.use(authMiddleware); // All routes below require authentication

// Code snippet management routes
ideRouter.route("/snippets")
  .get(getUserSnippets)
  .post(saveCodeSnippet);

ideRouter.route("/snippets/:id")
  .get(getSnippetById)
  .put(updateSnippet)
  .delete(deleteSnippet);

export default ideRouter;
