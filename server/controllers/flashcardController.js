import Flashcard from "../models/Flashcard.js";

// Add a new flashcard
export const addFlashcard = async (req, res) => {
  try {
    const { term, definition, topic } = req.body;

    if (!term || !definition || !topic) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const flashcard = await Flashcard.create({ term, definition, topic });
    return res.status(201).json(flashcard);
  } catch (error) {
    console.error("Error adding flashcard:", error);
    return res.status(500).json({
      message: "Failed to add flashcard",
      error: error.message,
    });
  }
};

// Get all flashcards
export const getFlashcards = async (req, res) => {
  try {
    const flashcards = await Flashcard.find().sort({ createdAt: -1 });
    return res.status(200).json(flashcards);
  } catch (error) {
    console.error("Error fetching flashcards:", error);
    return res.status(500).json({
      message: "Failed to fetch flashcards",
      error: error.message,
    });
  }
};
