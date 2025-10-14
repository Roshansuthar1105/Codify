// src/components/QuestionCard.jsx
import React from "react";
import { Link } from "react-router-dom";
import { ArrowBigUp, ArrowBigDown, MessageCircle, Bookmark } from "lucide-react";
import { motion } from "framer-motion";
import { useQuestions } from "../context/QuestionContext";
import { useTheme } from "../context/ThemeContext";

export default function QuestionCard({ q }) {
  const { voteQuestion, voteReply, toggleBookmark } = useQuestions(); // use backend-aware functions
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  // Animation variants matching Dashboard
  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 30,
      scale: 0.95
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    },
    hover: {
      y: -6,
      scale: 1.02,
      transition: {
        duration: 0.2,
        ease: "easeInOut"
      }
    }
  };

  const buttonVariants = {
    hover: {
      scale: 1.05,
      y: -2,
      transition: {
        duration: 0.2,
        ease: "easeInOut"
      }
    },
    tap: {
      scale: 0.95
    }
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      className={`group relative overflow-hidden rounded-2xl shadow-lg bg-gradient-to-br backdrop-blur-xl transition-all duration-300 hover:shadow-2xl ${
        isDark 
          ? 'from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-secondary-1000' 
          : 'from-blue-50 to-indigo-50 border border-light-border hover:border-primary/50'
      }`}
    >
      {/* Animated borders on hover */}
      <motion.div 
        className="absolute top-0 right-0 w-0 h-full bg-primary rounded-r-2xl"
        whileHover={{ 
          width: "3px",
          transition: { duration: 0.3, ease: "easeOut" }
        }}
      />
      <motion.div 
        className="absolute bottom-0 left-0 w-full h-0 bg-primary rounded-b-2xl"
        whileHover={{ 
          height: "3px",
          transition: { duration: 0.3, ease: "easeOut", delay: 0.05 }
        }}
      />

      <div className="p-6 flex flex-col gap-4">
        {/* Title */}
        <Link to={`/questions/${q._id}`} className="group/title">
          <motion.h2
            whileHover={{ x: 4 }}
            transition={{ duration: 0.2 }}
            className={`text-lg lg:text-xl font-semibold transition-all duration-300 group-hover/title:text-primary ${
              isDark ? 'text-dark-text-primary' : 'text-light-text-primary'
            }`}
          >
            {q.title}
          </motion.h2>
        </Link>

        {/* Excerpt */}
        <p className={`text-sm lg:text-base line-clamp-2 leading-relaxed ${
          isDark ? 'text-dark-text-secondary' : 'text-light-text-secondary'
        }`}>
          {q.excerpt || (q.replies?.[0]?.text ?? "")}
        </p>

        {/* Tags */}
        <div className="flex gap-2 flex-wrap">
          {q.tags?.length > 0 ? (
            q.tags.map((tag, i) => (
              <motion.span
                key={`${tag}-${i}`}
                whileHover={{ scale: 1.05, y: -1 }}
                transition={{ duration: 0.2 }}
                className={`px-3 py-1.5 text-xs font-medium rounded-full border transition-all duration-300 cursor-pointer hover:border-primary/50 ${
                  isDark 
                    ? 'bg-dark-bg-tertiary text-dark-text-secondary border-dark-border hover:bg-primary/10' 
                    : 'bg-light-bg-tertiary text-light-text-secondary border-light-border hover:bg-primary/10'
                }`}
              >
                {tag || "Untitled"}
              </motion.span>
            ))
          ) : (
            <span
              className={`px-3 py-1.5 text-xs font-medium rounded-full border italic ${
                isDark 
                  ? 'bg-dark-bg-tertiary text-dark-text-secondary border-dark-border' 
                  : 'bg-light-bg-tertiary text-light-text-secondary border-light-border'
              }`}
            >
              No tags
            </span>
          )}
        </div>

        {/* Stats */}
        <div className="flex gap-3 items-center pt-2 flex-wrap">
          {/* Upvote Button */}
          <motion.button
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            onClick={() => voteQuestion(q._id, "upvote")}
            className={`group/btn flex items-center gap-2 px-3 py-2 rounded-xl border font-medium text-sm transition-all duration-300 ${
              isDark 
                ? 'border-dark-border bg-dark-bg-secondary hover:bg-green-500/10 hover:border-green-500/50 text-dark-text-primary hover:text-green-400' 
                : 'border-light-border bg-light-bg-secondary hover:bg-green-500/10 hover:border-green-500/50 text-light-text-primary hover:text-green-600'
            }`}
          >
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
            >
              <ArrowBigUp size={16} />
            </motion.div>
            <span>{q.upvotes || 0}</span>
          </motion.button>

          {/* Downvote Button */}
          <motion.button
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            onClick={() => voteQuestion(q._id, "downvote")}
            className={`group/btn flex items-center gap-2 px-3 py-2 rounded-xl border font-medium text-sm transition-all duration-300 ${
              isDark 
                ? 'border-dark-border bg-dark-bg-secondary hover:bg-red-500/10 hover:border-red-500/50 text-dark-text-primary hover:text-red-400' 
                : 'border-light-border bg-light-bg-secondary hover:bg-red-500/10 hover:border-red-500/50 text-light-text-primary hover:text-red-600'
            }`}
          >
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
            >
              <ArrowBigDown size={16} />
            </motion.div>
            <span>{q.downvotes || 0}</span>
          </motion.button>

          {/* Replies Link */}
          <motion.div
            variants={buttonVariants}
            whileHover="hover"
          >
            <Link
              to={`/questions/${q._id}`}
              className={`group/btn flex items-center gap-2 px-3 py-2 rounded-xl border font-medium text-sm transition-all duration-300 ${
                isDark 
                  ? 'border-dark-border bg-dark-bg-secondary hover:bg-blue-500/10 hover:border-blue-500/50 text-dark-text-primary hover:text-blue-400' 
                  : 'border-light-border bg-light-bg-secondary hover:bg-blue-500/10 hover:border-blue-500/50 text-light-text-primary hover:text-blue-600'
              }`}
            >
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                <MessageCircle size={16} />
              </motion.div>
              <span>{Array.isArray(q.replies) ? q.replies.length : 0} replies</span>
            </Link>
          </motion.div>

          {/* Bookmark Button */}
          <motion.button
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            onClick={() => toggleBookmark(q._id)}
            className={`group/btn flex items-center gap-2 px-3 py-2 rounded-xl border font-medium text-sm transition-all duration-300 ml-auto ${
              q.bookmarked 
                ? 'border-primary bg-primary/10 text-primary hover:bg-primary/20' 
                : isDark 
                  ? 'border-dark-border bg-dark-bg-secondary hover:bg-yellow-500/10 hover:border-yellow-500/50 text-dark-text-primary hover:text-yellow-400' 
                  : 'border-light-border bg-light-bg-secondary hover:bg-yellow-500/10 hover:border-yellow-500/50 text-light-text-primary hover:text-yellow-600'
            }`}
          >
            <motion.div
              animate={{ 
                scale: q.bookmarked ? [1, 1.2, 1] : 1,
                rotate: q.bookmarked ? [0, 15, -15, 0] : 0
              }}
              transition={{ 
                duration: q.bookmarked ? 0.5 : 0.3,
                ease: "easeInOut"
              }}
              whileHover={{ 
                scale: 1.1,
                rotate: q.bookmarked ? 0 : 15
              }}
            >
              <Bookmark size={16} fill={q.bookmarked ? "currentColor" : "none"} />
            </motion.div>
            <span>{q.bookmarked ? "Saved" : "Save"}</span>
          </motion.button>
        </div>

        {/* Additional Info Bar */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className={`flex items-center justify-between text-xs pt-2 border-t border-dashed ${
            isDark ? 'border-dark-border text-dark-text-secondary' : 'border-light-border text-light-text-secondary'
          }`}
        >
          <span>Asked recently</span>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span>Active discussion</span>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
