const API_URL = "http://localhost:5050/api/flashcards";

export const addFlashcard = async (flashcard) => {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(flashcard),
  });
  if (!res.ok) throw new Error("Failed to add flashcard");
  return await res.json();
};

export const fetchFlashcards = async () => {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error("Failed to fetch flashcards");
  return await res.json();
};
