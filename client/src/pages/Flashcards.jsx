import { useState, useEffect } from "react";
import Modal from "../components/Modal";
import { useTheme } from "../context/ThemeContext";
import { fetchFlashcards, addFlashcard } from "../utils/api";

export default function Flashcards() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const defaultTopics = [
    "JavaScript Fundamentals",
    "Git and Version Control",
    "CSS Mastery",
    "Python Basics",
    "UI/UX Design Patterns",
    "React Patterns",
    "TypeScript Essentials",
    "Database Systems",
    "Node.js Development",
    "API Design and REST",
    "Testing Strategies",
    "Docker Container",
    "DSA",
    "Web Security",
    "Performance Optimization",
    "AWS Cloud Service",
    "Microservice Architecture",
    "DevOps and CI/CD",
  ];

  const [topics, setTopics] = useState(defaultTopics);
  const [flashcards, setFlashcards] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState("All");
  const [reviewCount, setReviewCount] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flipped, setFlipped] = useState(false); // single-card flip state
  const [isModalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState({ term: "", definition: "", topic: "" });
  const [topicChoice, setTopicChoice] = useState("select");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [reviewedCards, setReviewedCards] = useState(new Set());


  // Filtered flashcards based on selected topic
  const filteredFlashcards =
    selectedTopic === "All"
      ? flashcards
      : flashcards.filter((f) => f.topic === selectedTopic);

  // Load flashcards from backend
  const loadFlashcards = async () => {
    try {
      const data = await fetchFlashcards();
      setFlashcards(data || []);
      // reset currentIndex safely
      setCurrentIndex(0);
      setFlipped(false);
    } catch (err) {
      console.error("Error loading flashcards:", err);
    }
  };

  useEffect(() => {
    loadFlashcards();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Handle adding a new flashcard
  const handleAddCard = async (e) => {
    e.preventDefault();
    const topicFinal = (form.topic || "").trim();
    if (!topicFinal || !form.term.trim() || !form.definition.trim()) return;

    const newCard = {
      term: form.term.trim(),
      definition: form.definition.trim(),
      topic: topicFinal.charAt(0).toUpperCase() + topicFinal.slice(1),
    };

    try {
      // Save to backend
      const savedCard = await addFlashcard(newCard);

      // add saved card to local state (show newest first)
      setFlashcards((prev) => [savedCard, ...prev]);

      // Update topics if new
      if (!topics.includes(savedCard.topic)) {
        setTopics((prev) => [...prev, savedCard.topic]);
      }

      // Reset form & close modal
      setForm({ term: "", definition: "", topic: "" });
      setTopicChoice("select");
      setModalOpen(false);
      // Ensure the new card is visible (set topic filter to All or to its topic)
      setSelectedTopic("All");
      setCurrentIndex(0);
      setFlipped(false);
    } catch (err) {
      console.error("Error adding flashcard:", err);
    }
  };

  // Flashcard navigation
  const nextCard = () => {
    if (filteredFlashcards.length > 0) {
      setFlipped(false);
      setCurrentIndex((i) => (i + 1) % filteredFlashcards.length);
    }
  };
  const prevCard = () => {
    if (filteredFlashcards.length > 0) {
      setFlipped(false);
      setCurrentIndex(
        (i) => (i - 1 + filteredFlashcards.length) % filteredFlashcards.length
      );
    }
  };

  // Toggle flip 
 const toggleFlip = () => {
  setFlipped((prev) => {
    const newFlip = !prev;

    // If flipping to the back and the card wasn't reviewed before → increment count
    if (newFlip) {
      const currentCard = filteredFlashcards[currentIndex];
      if (currentCard && !reviewedCards.has(currentCard._id)) {
        setReviewCount((c) => c + 1);
        setReviewedCards((prevSet) => new Set(prevSet).add(currentCard._id));
      }
    }

    return newFlip;
  });
};



  const handleReview = () => setReviewCount((c) => c + 1);
  const resetFilter = () => {
    setSelectedTopic("All");
    setReviewCount(0);
    setCurrentIndex(0);
    setFlipped(false);
  };
  const handleOpenModal = () => {
    setForm({ term: "", definition: "", topic: "" });
    setTopicChoice("select");
    setModalOpen(true);
  };
  const handleCloseModal = () => setModalOpen(false);

  // Safety: current card or placeholder
  const hasCards = filteredFlashcards.length > 0;
  const currentCard = hasCards ? filteredFlashcards[currentIndex] : null;

  return (
    <div
      className={`relative min-h-screen ${
        isDark ? "text-white" : "text-gray-900"
      } overflow-x-hidden`}
    >
      {/* Grid Background */}
      <div
        className="absolute top-0 left-0 w-full h-full -z-10"
        style={{
          backgroundImage: `
          linear-gradient(to right, rgba(168, 85, 247, 0.08) 1px, transparent 1.5px),
          linear-gradient(to bottom, rgba(168, 85, 247, 0.08) 1px, transparent 1.5px)
        `,
          backgroundSize: "30px 30px",
        }}
      ></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12">
        {/* Heading */}
        <div className="text-center mb-12">
          <h1 className="page-heading">Flashcards</h1>
          <p className="mt-3 text-gray-600 dark:text-gray-300">
            Flip the card to view definitions. Practice one at a time.
          </p>
        </div>

        {/* Topic Dropdown */}
        <div className="flex justify-center mb-8">
          <div className="relative w-full max-w-md">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className={`w-full flex justify-between items-center px-4 py-3 rounded-lg font-medium border ${
                isDark
                  ? "bg-gray-800 border-gray-700 text-white"
                  : "bg-white border-gray-300 text-gray-900"
              }`}
            >
              {selectedTopic === "All" ? "Select Topic" : selectedTopic}
              <span className="text-lg">{dropdownOpen ? "▲" : "▼"}</span>
            </button>

            {dropdownOpen && (
              <div
                className={`absolute mt-2 w-full max-h-60 overflow-y-auto rounded-lg shadow-lg border z-50 ${
                  isDark
                    ? "bg-gray-900 border-gray-700 text-white"
                    : "bg-white border-gray-300 text-gray-900"
                }`}
              >
                <button
                  onClick={() => {
                    setSelectedTopic("All");
                    setDropdownOpen(false);
                    setCurrentIndex(0);
                    setFlipped(false);
                  }}
                  className="block w-full text-left px-4 py-2 hover:bg-purple-100 dark:hover:bg-gray-800 rounded-t-lg"
                >
                  All Topics
                </button>
                {topics.map((t) => (
                  <button
                    key={t}
                    onClick={() => {
                      setSelectedTopic(t);
                      setDropdownOpen(false);
                      setCurrentIndex(0);
                      setFlipped(false);
                    }}
                    className="block w-full text-left px-4 py-2 hover:bg-purple-100 dark:hover:bg-gray-800"
                  >
                    {t}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Review & Add */}
        <div className="flex flex-wrap justify-between items-center mb-8 gap-4">
          <div className="flex gap-4">
            <button
              onClick={handleReview}
              className="p-2 bg-purple-100 text-purple-800 rounded font-medium"
            >
              Reviewed: {reviewCount}
            </button>
            <button
              onClick={resetFilter}
              className="p-2 bg-red-100 text-red-700 rounded font-medium"
            >
              Reset
            </button>
          </div>

          <div className="flex flex-col items-end gap-2">
            <button
              onClick={handleOpenModal}
              className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600"
            >
              + Add Flashcard
            </button>
            <div className="text-sm text-gray-600 dark:text-gray-300">
              Selected: <span className="font-medium">{selectedTopic}</span>
            </div>
          </div>
        </div>

        {/* Flashcard */}
        {hasCards ? (
          <>
            <div className="w-full flex justify-center items-center min-h-[400px]">
              <div
                className={`flip-card w-[600px] h-[350px]`}
                onClick={toggleFlip}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") toggleFlip();
                }}
              >
                <div
                  className={`flip-card-inner ${flipped ? "flipped" : ""} transition-transform duration-700`}
                >
                  <div
                    className={`flip-card-front flex flex-col justify-center items-center text-center p-8 rounded-2xl shadow-2xl ${
                      isDark ? "bg-gray-800 text-white" : "bg-white text-gray-900"
                    }`}
                  >
                    <h2 className="text-3xl font-bold mb-2">{currentCard.term}</h2>
                    <p className="text-sm opacity-60">(Click to flip)</p>
                  </div>

                  <div
                    className={`flip-card-back flex flex-col justify-center items-center text-center p-8 rounded-2xl shadow-2xl ${
                      isDark ? "bg-purple-800 text-white" : "bg-purple-200 text-gray-900"
                    }`}
                  >
                    <h2 className="text-2xl font-semibold mb-3">Definition</h2>
                    <p className="text-lg leading-relaxed">{currentCard.definition}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex justify-center gap-6 mt-8">
              <button
                onClick={prevCard}
                className="px-6 py-2 rounded bg-purple-200 hover:bg-purple-300 text-purple-900 font-medium"
              >
                ← Previous
              </button>
              <button
                onClick={nextCard}
                className="px-6 py-2 rounded bg-purple-500 hover:bg-purple-600 text-white font-medium"
              >
                Next →
              </button>
            </div>

            <div className="mt-4 text-sm text-gray-500 dark:text-gray-400 text-center">
              {currentIndex + 1} / {filteredFlashcards.length}
            </div>
          </>
        ) : (
          <p className="text-gray-500 italic text-center mt-10">No flashcards for this topic yet.</p>
        )}
      </div>

      {/* Modal */}
      <Modal open={isModalOpen} onClose={handleCloseModal} title="Add Flashcard">
        <form onSubmit={handleAddCard} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Term</label>
            <input
              className="w-full border rounded p-2"
              value={form.term}
              onChange={(e) => setForm({ ...form, term: e.target.value })}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Definition</label>
            <textarea
              className="w-full border rounded p-2"
              value={form.definition}
              onChange={(e) => setForm({ ...form, definition: e.target.value })}
              rows={3}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Topic</label>
            <div className="flex gap-3">
              <select
                className="border rounded p-2 flex-1"
                value={topicChoice === "custom" ? "custom" : form.topic || ""}
                onChange={(e) => {
                  const val = e.target.value;
                  if (val === "custom") {
                    setTopicChoice("custom");
                    setForm((f) => ({ ...f, topic: "" }));
                  } else {
                    setTopicChoice("select");
                    setForm((f) => ({ ...f, topic: val }));
                  }
                }}
              >
                <option value="">-- choose topic --</option>
                {topics.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
                <option value="custom">Other (type below)</option>
              </select>

              <input
                className="border rounded p-2 flex-1"
                placeholder="Or type a new topic"
                value={topicChoice === "custom" ? form.topic : ""}
                onChange={(e) => {
                  setTopicChoice("custom");
                  setForm((f) => ({ ...f, topic: e.target.value }));
                }}
              />
            </div>
          </div>

          <div className="flex justify-end gap-3">
            <button type="button" onClick={handleCloseModal} className="px-4 py-2 rounded border">
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 rounded bg-purple-500 text-white hover:bg-purple-600">
              Add
            </button>
          </div>
        </form>
      </Modal>

      {/* Styles */}
      <style jsx>{`
        .page-heading {
          font-size: 3rem;
          font-weight: 900;
          font-family: "Righteous", sans-serif;
          letter-spacing: 1px;
          color: var(--text_clr);
          text-align: center;
        }

        /* Flip card effect (kept same names you already used) */
        .flip-card {
          perspective: 1000px;
          cursor: pointer;
        }
        .flip-card-inner {
          position: relative;
          width: 100%;
          height: 100%;
          transform-style: preserve-3d;
          transition: transform 0.7s;
        }
        .flip-card-inner.flipped {
          transform: rotateY(180deg);
        }
        .flip-card-front,
        .flip-card-back {
          position: absolute;
          width: 100%;
          height: 100%;
          backface-visibility: hidden;
          border-radius: 1rem;
        }
        .flip-card-back {
          transform: rotateY(180deg);
        }
      `}</style>
    </div>
  );
}
