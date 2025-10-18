import express from "express";
import {
  getAllQuestions,
  getQuestionById,
  createQuestion,
  updateQuestion,
  deleteQuestion,
  upvoteQuestion,
  downvoteQuestion,
  toggleBookmark,
} from "../controllers/questionController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();
console.log("entered route");
// Question Routes
// Public: allow fetching questions without auth
router.get("/getAll", getAllQuestions);          // GET /questions
router.get("/getOne/:id",authMiddleware, getQuestionById);       // GET /questions/:id
router.post("/create", authMiddleware,createQuestion);          // POST /questions
router.patch("/update/:id",authMiddleware, updateQuestion);      // PATCH /questions/:id
router.delete("/delete/:id", authMiddleware,deleteQuestion);     // DELETE /questions/:id
// Voting
router.post("/upvote/:id",authMiddleware, upvoteQuestion);
router.post("/downvote/:id",authMiddleware, downvoteQuestion);

// Bookmark
router.post("/bookmark/:id",authMiddleware, toggleBookmark);   

export default router;
