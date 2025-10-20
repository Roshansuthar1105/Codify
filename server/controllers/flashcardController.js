import Flashcard from "../models/Flashcard.js";

// Add a new flashcard
export const addFlashcard = async (req, res) => {
  try {
    const { term, definition, topic } = req.body;
    if (!term || !definition || !topic) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const flashcard = new Flashcard({ term, definition, topic });
    await flashcard.save();
    res.status(201).json(flashcard);
  } catch (err) {
    console.error("Error adding flashcard:", err);
    res.status(500).json({ message: "Failed to add flashcard", error: err.message });
  }
};

// Get all flashcards
export const getFlashcards = async (req, res) => {
  try {
    const flashcards = await Flashcard.find().sort({ createdAt: -1 });
    res.status(200).json(flashcards);
  } catch (err) {
    console.error("Error fetching flashcards:", err);
    res.status(500).json({ message: "Failed to get flashcards", error: err.message });
  }
};
