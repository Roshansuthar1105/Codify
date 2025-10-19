import React from "react";
import { motion } from "framer-motion";
import QuestionCard from "./QuestionCard";
import { useQuestions } from "../context/QuestionContext";
import { useTheme } from "../context/ThemeContext";

export default function QuestionsGrid() {
  const { questions, loading, error } = useQuestions();
  const { isDark } = useTheme();

  // Theme-based colors
  const bgTertiary = isDark ? "#2d2d2d" : "#f3f4f6";
  const bgPrimary = isDark ? "#1f1f1f" : "#ffffff";
  const borderColor = isDark ? "#374151" : "#e5e7eb";
  const textSecondary = isDark ? "#d1d5db" : "#6b7280";

  if (loading) {
    return (
      <div className="grid gap-4 md:gap-6 grid-cols-1 md:grid-cols-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: i * 0.05 }}
            style={{ backgroundColor: bgTertiary }}
            className="h-40 rounded-2xl animate-pulse transition-colors"
          />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div
        style={{ borderColor, backgroundColor: bgPrimary, color: textSecondary }}
        className="rounded-xl border px-4 py-3 transition-colors"
      >
        {error}
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div
        style={{ borderColor, backgroundColor: bgPrimary }}
        className="rounded-xl border p-10 text-center transition-colors"
      >
        <p style={{ color: textSecondary }}>No questions found.</p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:gap-6 grid-cols-1 md:grid-cols-2">
      {questions.map((q) => (
        // Use _id from MongoDB instead of id
        <QuestionCard key={q._id} q={q} />
      ))}
    </div>
  );
}
