import React from "react";
import { QuestionsProvider } from "../context/QuestionContext"
import PageHeader from "../components/PageHeader";
import QuestionsGrid from "../components/QuestionsGrid";
import { motion } from "framer-motion";
import { useTheme } from "../context/ThemeContext"; // use your ThemeProvider

export default function QuestionsPage() {
  const { isDark, themeColor } = useTheme();

  // Use theme-aware classes
  const bgClass = isDark ? "dark:bg-dark.bg.primary" : "bg-light-bg-primary";
  const textClass = isDark
    ? "dark:text-dark-text-primary"
    : "text-light-text-primary";
  const gridPattern = isDark ? "bg-grid-pattern-dark" : "bg-grid-pattern-light";
  const gradientOverlay = isDark
    ? "bg-gradient-to-br from-dark-bg-primary/90 via-transparent to-dark-bg-primary/50"
    : "bg-gradient-to-br from-light-bg-primary/90 via-transparent to-light-bg-primary/50";

  // Theme color CSS variable fallback
  const primaryColorStyle = {
    "--primary-color": `var(--color-primary)`,
  };

  const backgroundVariants = {
    hidden: { opacity: 0, scale: 1.05 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 1, ease: "easeOut" },
    },
  };

  return (
    <div
      className={`relative min-h-screen-minus-nav overflow-hidden z-10 ${isDark ? 'bg-dark-bg-primary text-dark-text-primary' : 'bg-light-bg-primary text-light-text-primary'}`}
    >
      {/* Enhanced Background with grid overlay */}
      <motion.div
        variants={backgroundVariants}
        initial="hidden"
        animate="visible"
        className={`absolute top-0 left-0 w-full h-full -z-10 bg-[size:30px_30px] ${isDark ? 'bg-grid-pattern-dark' : 'bg-grid-pattern-light'}`}
      >
        {/* Gradient overlay */}
        <div className={`absolute inset-0 ${isDark ? 'bg-gradient-to-br from-dark-bg-primary/90 via-transparent to-dark-bg-primary/50' : 'bg-gradient-to-br from-light-bg-primary/90 via-transparent to-light-bg-primary/50'}`}></div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-10 ">
        <PageHeader />
        <div className="mt-6">
          <QuestionsGrid />
        </div>
      </div>
    </div>
  );
}
