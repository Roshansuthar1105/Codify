import express from "express";
import { addFlashcard, getFlashcards } from "../controllers/flashcardController.js";

const router = express.Router();

router.post("/", addFlashcard);
router.get("/", getFlashcards);

export default router;
