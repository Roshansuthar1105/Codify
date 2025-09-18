import React, { useState } from "react";
import { Search, Filter, Plus, ChevronDown } from "lucide-react";
import { useQuestions } from "../context/QuestionContext";
import { useTheme } from "../context/ThemeContext";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { motion } from "framer-motion";

function Modal({ children, onClose, isDark }) {
  const bgPrimary = isDark ? "bg-gray-900" : "bg-white";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div
        className={`${bgPrimary} rounded-2xl w-full max-w-lg max-h-[90vh] overflow-auto p-6 shadow-xl`}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}

export default function PageHeader() {
  const { search, setSearch, sort, setSort, askQuestion } = useQuestions(); // backend-aware function
  const { theme, authorizationToken } = useTheme(); // if needed for headers
  const isDark = theme === "dark";
  const [modalOpen, setModalOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState("");
  const [questionContent, setQuestionContent] = useState("");

  const textPrimary = isDark ? "text-white" : "text-gray-900";
  const textSecondary = isDark ? "text-gray-300" : "text-gray-500";
  const bgTertiary = isDark ? "bg-gray-800" : "bg-gray-100";
  const borderColor = isDark ? "border-gray-700" : "border-gray-200";
  const bgSecondaryHover = isDark
    ? "hover:bg-gray-700/50"
    : "hover:bg-gray-200";

  const headerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const handleSubmit = async () => {
    if (!title || !questionContent) return alert("Please fill all fields");

    try {
      // Call context function that hits backend

      await askQuestion({
        title,
        excerpt: questionContent.replace(/<[^>]+>/g, "").slice(0, 100),
        description: questionContent,
        tags: tags
          .split(",")
          .map((t) => t.trim())
          .filter((t) => t.length > 0),
      });

      // Reset modal
      setModalOpen(false);
      setTitle("");
      setTags("");
      setQuestionContent("");
    } catch (err) {
      console.error("Error submitting question:", err);
    }
  };

  return (
    <div className="space-y-6">
      {/* Enchanced Header Title and Button */}
      <motion.div
        variants={headerVariants}
        initial="hidden"
        animate="visible"
        className="text-center mb-12"
      >
        <div className="inline-block">
          <h1
            className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-righteous tracking-wider mb-4 ${
              isDark ? "text-dark-text-primary" : "text-light-text-primary"
            }`}
          >
            Questions
          </h1>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className={`h-1 rounded-full bg-gradient-to-r ${
              isDark
                ? "from-primary via-primary-dark to-primary"
                : "from-primary via-primary-dark to-primary"
            }`}
          ></motion.div>
        </div>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className={`mt-6 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed ${
            isDark ? "text-dark-text-secondary" : "text-light-text-secondary"
          }`}
        >
          Please maintain a respectful and civil tone in all interactions.
        </motion.p>
        <button
          onClick={() => setModalOpen(true)}
          className={`inline-flex mt-5 items-center gap-2 rounded-2xl px-4 py-2 text-md font-medium bg-primary-500 hover:bg-primary-700 transition ${
            isDark ? "text-dark-text-primary" : "text-light-text-primary"
          } `}
        >
          <Plus size={26} /> Ask a Question
        </button>
      </motion.div>

      {/* Enhanced Search and Filters */}
      <div className="flex flex-col   md:flex-row gap-3">
        <div className="flex-1 relative w-full">
          <div
            className={`absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none`}
          >
            <Search size={18} />
          </div>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search questions..."
            className={`w-full pl-12 pr-12 py-4 text-lg rounded-2xl border-2 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary ${
              isDark
                ? "bg-dark-bg-secondary border-dark-border text-dark-text-primary placeholder-dark-text-secondary focus:border-primary"
                : "bg-light-bg-secondary border-light-border text-light-text-primary placeholder-light-text-secondary focus:border-primary"
            }`}
          />
        </div>
        <div className="flex flex-wrap gap-2 md:gap-2">
          <button
            className={`inline-flex items-center gap-2 rounded-xl border px-3 py-2 text-sm hover:border-primary hover:bg-primary-600  transition-colors`}
          >
            <Filter size={20}/> Filters
          </button>
          <div className="relative w-full md:w-auto">
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className={`appearance-none rounded-xl border px-3 py-2 pr-8 text-sm w-full h-full md:w-auto bg-primary-dark ${
                isDark ? "text-dark-text-primary" : "text-light-text-primary"
              } ${borderColor} focus:outline-none transition-colors`}
            >
              <option value="latest">Sort by: Latest</option>
              <option value="upvotes">Sort by: Upvotes</option>
              <option value="replies">Sort by: Replies</option>
            </select>
            <ChevronDown
              className={`pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 ${textSecondary} transition-colors`}
              size={16}
            />
          </div>
        </div>
      </div>

      {/* Modal */}
      {modalOpen && (
        <Modal onClose={() => setModalOpen(false)} isDark={isDark}>
          <h2
            className={`text-xl font-bold mb-4 ${
              isDark ? "text-dark-text-primary" : "text-light-text-primary"
            }`}
          >
            Ask a Question
          </h2>
          <label
            className={`block mb-2 text-sm font-medium ${
              isDark ? "text-dark-text-primary" : "text-light-text-primary"
            }`}
          >
            Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={`w-full mb-4 rounded-xl border px-3 py-2 ${bgTertiary} ${
              isDark ? "text-dark-text-primary" : "text-light-text-primary"
            } ${borderColor} focus:outline-none focus:ring-2 focus:ring-primary/60`}
            placeholder="Enter your question title"
          />
          <label
            className={`block mb-2 text-sm font-medium ${
              isDark ? "text-dark-text-primary" : "text-light-text-primary"
            }`}
          >
            Tags (comma separated)
          </label>
          <input
            type="text"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            className={`w-full mb-4 rounded-xl border px-3 py-2 ${bgTertiary} ${
              isDark ? "text-dark-text-primary" : "text-light-text-primary"
            } ${borderColor} focus:outline-none focus:ring-2 focus:ring-primary/60`}
            placeholder="e.g., javascript, react"
          />
          <label
            className={`block mb-2 text-sm font-medium ${
              isDark ? "text-dark-text-primary" : "text-light-text-primary"
            }`}
          >
            Question
          </label>
          <div className={`mb-4 ${isDark ? "quill-dark" : ""}`}>
            <ReactQuill
              theme="snow"
              value={questionContent}
              onChange={setQuestionContent}
              modules={{
                toolbar: [
                  [{ header: [1, 2, false] }],
                  ["bold", "italic", "underline", "strike", "blockquote"],
                  [{ list: "ordered" }, { list: "bullet" }],
                  ["code-block", "link"],
                  ["clean"],
                ],
              }}
              formats={[
                "header",
                "bold",
                "italic",
                "underline",
                "strike",
                "blockquote",
                "list",
                "bullet",
                "code-block",
                "link",
              ]}
            />
          </div>
          <div className="flex flex-col md:flex-row justify-end gap-2 mt-2">
            <button
              onClick={() => setModalOpen(false)}
              className={`px-4 py-2 rounded-xl border ${textSecondary} ${borderColor} ${bgSecondaryHover} transition-colors`}
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className={`px-4 py-2 rounded-xl bg-primary text-black dark:text-white hover:bg-primary-600 transition-colors`}
            >
              Submit
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}
