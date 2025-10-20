import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import {
  ArrowBigUp,
  ArrowBigDown,
  Reply,
  Bookmark,
  ArrowLeft,
  MessageCircle,
  Edit3,
  Trash2,
  User,
} from "lucide-react";
import { useQuestions } from "../context/QuestionContext";
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../store/auth";
import { useNavigate, useParams } from "react-router-dom";

export default function QuestionDetail() {
  const { id: questionId } = useParams();
  const {
    questions,
    voteQuestion,
    voteReply,
    toggleBookmark,
    addReply,
    updateReply,
    deleteReply,
    loading,
    error,
  } = useQuestions();
  const { isDark, themeColor, availableColors } = useTheme();
  const { user: userdata } = useAuth();
  const Navigate = useNavigate();
  const messagesEndRef = useRef(null);

  const question = questions.find((q) => q._id === questionId);
  const [replyText, setReplyText] = useState("");
  const [showReplyEditor, setShowReplyEditor] = useState(false);
  const [expandedReplies, setExpandedReplies] = useState(new Set());
  // console.log(userdata)
  const currentThemeColor = availableColors[themeColor];

  const colors = isDark
    ? {
        textPrimary: "#ffffff",
        textSecondary: "#d1d5db",
        textMuted: "#9ca3af",
        bgPrimary: "#0a0a0a",
        bgSecondary: "#1f1f1f",
        bgCard: "#141414",
        bgHover: "#252525",
        bgTertiary: "#2d2d2d",
        border: "#2a2a2a",
        accent: currentThemeColor.value,
        accentHover: currentThemeColor.dark,
        success: "#22c55e",
        warning: "#f59e0b",
        danger: "#ef4444",
      }
    : {
        textPrimary: "#0f172a",
        textSecondary: "#334155",
        textMuted: "#64748b",
        bgPrimary: "#f8fafc",
        bgSecondary: "#ffffff",
        bgCard: "#ffffff",
        bgHover: "#f1f5f9",
        bgTertiary: "#f3f4f6",
        border: "#e2e8f0",
        accent: currentThemeColor.value,
        accentHover: currentThemeColor.dark,
        success: "#10b981",
        warning: "#f59e0b",
        danger: "#dc2626",
      };

  // Background grid and gradient pattern
  const gridPattern = isDark ? "bg-grid-pattern-dark" : "bg-grid-pattern-light";
  const gradientOverlay = isDark
    ? "bg-gradient-to-br from-dark-bg-primary/90 via-transparent to-dark-bg-primary/50"
    : "bg-gradient-to-br from-light-bg-primary/90 via-transparent to-light-bg-primary/50";

  const backgroundVariants = {
    hidden: { opacity: 0, scale: 1.05 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 1, ease: "easeOut" },
    },
  };

  // Background effects component
  const BackgroundEffects = () => (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Animated background grid + gradient */}
      <motion.div
        variants={backgroundVariants}
        initial="hidden"
        animate="visible"
        className={`absolute inset-0 z-8 bg-[size:30px_30px] ${gridPattern}`}
      >
        {/* Gradient overlay */}
        <div className={`absolute inset-0 ${gradientOverlay}`} />
      </motion.div>
    </div>
  );

  // Loading skeleton component
  const LoadingSkeleton = () => (
    <div
      className="min-h-screen px-4 py-6"
      style={{
        backgroundColor: colors.bgPrimary,
        color: colors.textPrimary,
      }}
    >
      <BackgroundEffects />

      {/* Header Skeleton */}
      <div className="max-w-4xl mx-auto mb-6 flex items-center gap-3">
        <motion.div
          className="w-10 h-10 rounded"
          style={{ backgroundColor: colors.bgTertiary }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />
        <motion.div
          className="h-6 w-32 rounded"
          style={{ backgroundColor: colors.bgTertiary }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        />
      </div>

      {/* Question Card Skeleton */}
      <motion.div
        className="max-w-4xl mx-auto p-6 rounded-xl shadow-sm mb-8 animate-pulse"
        style={{
          backgroundColor: colors.bgCard,
          border: `1px solid ${colors.border}`,
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        {/* Author info skeleton */}
        <div className="flex items-center gap-3 mb-4">
          <div
            className="w-10 h-10 rounded-full"
            style={{ backgroundColor: colors.bgTertiary }}
          />
          <div className="space-y-2">
            <div
              className="h-4 w-24 rounded"
              style={{ backgroundColor: colors.bgTertiary }}
            />
            <div
              className="h-3 w-16 rounded"
              style={{ backgroundColor: colors.bgTertiary }}
            />
          </div>
        </div>

        {/* Title skeleton */}
        <div
          className="h-7 w-3/4 rounded mb-3"
          style={{ backgroundColor: colors.bgTertiary }}
        />

        {/* Content skeleton */}
        <div className="space-y-2 mb-4">
          <div
            className="h-4 w-full rounded"
            style={{ backgroundColor: colors.bgTertiary }}
          />
          <div
            className="h-4 w-5/6 rounded"
            style={{ backgroundColor: colors.bgTertiary }}
          />
          <div
            className="h-4 w-2/3 rounded"
            style={{ backgroundColor: colors.bgTertiary }}
          />
        </div>

        {/* Tags skeleton */}
        <div className="flex gap-2 mb-4">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-6 w-16 rounded"
              style={{ backgroundColor: colors.bgTertiary }}
            />
          ))}
        </div>

        {/* Actions skeleton */}
        <div className="flex items-center justify-between">
          <div className="flex gap-3">
            <div
              className="h-8 w-16 rounded"
              style={{ backgroundColor: colors.bgTertiary }}
            />
            <div
              className="h-8 w-16 rounded"
              style={{ backgroundColor: colors.bgTertiary }}
            />
          </div>
          <div
            className="h-8 w-8 rounded"
            style={{ backgroundColor: colors.bgTertiary }}
          />
        </div>
      </motion.div>

      {/* Replies Section Skeleton */}
      <div className="max-w-4xl mx-auto">
        <motion.div
          className="h-6 w-32 rounded mb-4"
          style={{ backgroundColor: colors.bgTertiary }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.4 }}
        />

        {/* Reply skeletons */}
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <motion.div
              key={i}
              className="p-4 rounded-xl border animate-pulse"
              style={{
                backgroundColor: colors.bgCard,
                borderColor: colors.border,
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.5 + i * 0.1 }}
            >
              <div className="flex items-start gap-3">
                <div
                  className="w-8 h-8 rounded-full"
                  style={{ backgroundColor: colors.bgTertiary }}
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <div
                      className="h-4 w-20 rounded"
                      style={{ backgroundColor: colors.bgTertiary }}
                    />
                    <div
                      className="h-3 w-16 rounded"
                      style={{ backgroundColor: colors.bgTertiary }}
                    />
                  </div>
                  <div className="space-y-2 mb-3">
                    <div
                      className="h-4 w-full rounded"
                      style={{ backgroundColor: colors.bgTertiary }}
                    />
                    <div
                      className="h-4 w-3/4 rounded"
                      style={{ backgroundColor: colors.bgTertiary }}
                    />
                  </div>
                  <div className="flex gap-3">
                    {[1, 2, 3].map((j) => (
                      <div
                        key={j}
                        className="h-6 w-12 rounded"
                        style={{ backgroundColor: colors.bgTertiary }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );

  // Show loading skeleton
  if (loading) {
    return <LoadingSkeleton />;
  }

  // Show error state
  if (error) {
    return (
      <div
        className="min-h-screen flex items-center justify-center px-4"
        style={{
          backgroundColor: colors.bgPrimary,
          color: colors.textPrimary,
        }}
      >
        <BackgroundEffects />
        <div className="text-center">
          <h2 className="text-lg font-semibold mb-2">Error loading question</h2>
          <p className="text-sm" style={{ color: colors.textMuted }}>
            {error}
          </p>
        </div>
      </div>
    );
  }

  // Show question not found
  if (!question) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{
          backgroundColor: colors.bgPrimary,
          color: colors.textPrimary,
        }}
      >
        <BackgroundEffects />
        <div className="text-center">
          <h2 className="text-lg font-semibold mb-2">Question not found</h2>
          <p className="text-sm" style={{ color: colors.textMuted }}>
            The question you're looking for doesn't exist or has been removed.
          </p>
        </div>
      </div>
    );
  }

  // Organize replies into hierarchical structure
  const organizeReplies = (replies) => {
    const map = {};
    replies.forEach((r) => (map[r._id] = { ...r, children: [] }));
    const topLevel = [];
    replies.forEach((r) => {
      if (r.parentId && map[r.parentId]) {
        map[r.parentId].children.push(map[r._id]);
      } else {
        topLevel.push(map[r._id]);
      }
    });
    return topLevel;
  };

  const organizedReplies = organizeReplies(question.replies || []);

  const handleMainReplySubmit = () => {
    if (!replyText.trim()) return;
    addReply(question._id, { text: replyText });
    setReplyText("");
    setShowReplyEditor(false);
  };

  const handleInlineReplySubmit = (replyId, text) => {
    if (!text.trim()) return;
    addReply(question._id, {
      text,
      parentId: replyId,
    });
    setExpandedReplies((prev) => {
      const newSet = new Set(prev);
      newSet.delete(replyId);
      return newSet;
    });
  };

  const handleUpdateReply = async (replyId, text) => {
    await updateReply(replyId, text);
  };

  const handleDeleteReply = async (replyId) => {
    if (window.confirm("Are you sure you want to delete this reply?")) {
      await deleteReply(replyId, question._id);
    }
  };

  const getInitials = (name) =>
    name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);

  const getAvatarColor = (name) => {
    const colorKeys = Object.keys(availableColors);
    const index = name.length % colorKeys.length;
    return availableColors[colorKeys[index]].value;
  };

  return (
    <div
      className="min-h-screen px-4 py-6 relative"
      style={{
        backgroundColor: colors.bgPrimary,
        color: colors.textPrimary,
      }}
    >
      <BackgroundEffects />

      {/* Header */}
      <motion.div
        className="max-w-4xl mx-auto mb-6 flex items-center gap-3 relative z-10"
        style={{ borderColor: colors.border }}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <button
          className={`p-2 rounded hover:opacity-80 transition-opacity bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-secondary-1000 backdrop-blur-xl ${
            isDark ? "border border-dark-border" : "border border-light-border"
          }`}
          style={{ backgroundColor: colors.bgHover }}
          onClick={() => Navigate("/Questions")}
        >
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-lg font-semibold">Replies</h1>
      </motion.div>

      {/* Question Card */}
      <motion.div
        className={`max-w-4xl mx-auto p-6 rounded-xl shadow-sm mb-8 relative z-10 
    bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-secondary-1000 backdrop-blur-xl ${
      isDark ? "border border-dark-border" : "border border-light-border"
    }`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <div className="flex items-center gap-3 mb-4">
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center font-medium text-white text-sm"
            style={{ backgroundColor: getAvatarColor(question.author.name) }}
          >
            {getInitials(question.author.name)}
          </div>
          <div>
            <p className="text-sm font-medium">{question.author.name}</p>
            <p className="text-xs" style={{ color: colors.textMuted }}>
              {question.updatedAgo || "just now"}
            </p>
          </div>
        </div>

        <h2 className="text-xl font-semibold mb-3">{question.title}</h2>
        <p
          className="text-base leading-relaxed mb-4"
          style={{ color: colors.textSecondary }}
        >
          {question.excerpt}
        </p>

        {question.tags?.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {question.tags.map((tag, idx) => (
              <span
                key={idx}
                className="px-2 py-1 rounded text-xs font-medium"
                style={{
                  backgroundColor: colors.bgHover,
                  color: colors.textSecondary,
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => voteQuestion(question._id, "upvote")}
              className="flex items-center gap-1 px-2 py-1 rounded text-sm hover:opacity-80 transition-opacity"
              style={{
                backgroundColor: colors.bgHover,
                color: colors.textMuted,
              }}
            >
              <ArrowBigUp size={16} /> {question.upvotes || 0}
            </button>
            <button
              onClick={() => voteQuestion(question._id, "downvote")}
              className="flex items-center gap-1 px-2 py-1 rounded text-sm hover:opacity-80 transition-opacity"
              style={{
                backgroundColor: colors.bgHover,
                color: colors.textMuted,
              }}
            >
              <ArrowBigDown size={16} /> {question.downvotes || 0}
            </button>
          </div>
          <button
            onClick={() => toggleBookmark(question._id)}
            className="p-2 rounded hover:opacity-80 transition-opacity"
            style={{ backgroundColor: colors.bgHover }}
          >
            <Bookmark
              size={16}
              fill={question.bookmarked ? colors.warning : "none"}
              style={{
                color: question.bookmarked ? colors.warning : colors.textMuted,
              }}
            />
          </button>
        </div>
      </motion.div>

      {/* Replies Section */}
      <motion.div
        className="max-w-4xl mx-auto relative z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <h3 className="text-lg font-semibold mb-4">
          {organizedReplies.length}{" "}
          {organizedReplies.length === 1 ? "Reply" : "Replies"}
        </h3>

        {organizedReplies.length === 0 && (
          <div className="text-center py-8">
            <MessageCircle
              size={32}
              className="mx-auto mb-3 opacity-40"
              style={{ color: colors.textMuted }}
            />
            <p style={{ color: colors.textMuted }}>
              No replies yet. Be the first to respond!
            </p>
          </div>
        )}

        <div className="space-y-4">
          {organizedReplies.map((reply, index) => (
            <motion.div
              key={reply._id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.4 + index * 0.05 }}
            >
              <ReplyThread
                reply={reply}
                colors={colors}
                isDark={isDark}
                expandedReplies={expandedReplies}
                setExpandedReplies={setExpandedReplies}
                handleInlineReplySubmit={handleInlineReplySubmit}
                handleUpdateReply={handleUpdateReply}
                handleDeleteReply={handleDeleteReply}
                voteReply={voteReply}
                getInitials={getInitials}
                getAvatarColor={getAvatarColor}
                isChild={false}
                currentUser={userdata}
              />
            </motion.div>
          ))}
        </div>

        {/* Main Reply Editor */}
        <motion.div
          className="mt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          {!showReplyEditor ? (
            <button
              onClick={() => setShowReplyEditor(true)}
              className="w-full p-4 text-left rounded border hover:opacity-80 transition-opacity bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-secondary-1000 "
              style={{
                backgroundColor: colors.bgCard,
                borderColor: colors.border,
                color: colors.textMuted,
              }}
            >
              Add a reply...
            </button>
          ) : (
            <div>
              <textarea
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                className="w-full h-28 p-4 rounded border resize-none text-sm bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-950  dark:border-dark-border  border-light-border"
                placeholder="Write your reply..."
              />
              <div className="flex justify-end gap-3 mt-3">
                <button
                  onClick={() => setShowReplyEditor(false)}
                  className="px-4 py-2 rounded text-sm hover:opacity-80 transition-opacity"
                  style={{
                    color: colors.textMuted,
                    backgroundColor: colors.bgHover,
                  }}
                >
                  Cancel
                </button>
                <button
                  onClick={handleMainReplySubmit}
                  className="px-6 py-2 rounded text-white text-sm hover:opacity-90 transition-opacity"
                  style={{ backgroundColor: colors.accent }}
                >
                  Reply
                </button>
              </div>
            </div>
          )}
        </motion.div>
        <div ref={messagesEndRef} />
      </motion.div>
    </div>
  );
}

/* ---------------- Reply Thread Component ---------------- */
function ReplyThread({
  reply,
  colors,
  isDark,
  expandedReplies,
  setExpandedReplies,
  handleInlineReplySubmit,
  handleUpdateReply,
  handleDeleteReply,
  voteReply,
  getInitials,
  getAvatarColor,
  isChild,
  currentUser,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(reply.text);

  const handleEditSave = async () => {
    if (!editText.trim()) return;
    await handleUpdateReply(reply._id, editText);
    setIsEditing(false);
  };

  const handleEditCancel = () => {
    setEditText(reply.text); // Reset to original text
    setIsEditing(false);
  };

  const handleDelete = () => {
    handleDeleteReply(reply._id);
  };

  // Check if current user is the author of this reply
  const isAuthor = currentUser && reply.author._id === currentUser._id;

  return (
    <div
      className={`p-4 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-secondary-1000  border dark:border-dark-border border-light-border`}
    >
      <div className="flex items-start gap-3">
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center text-white font-medium text-xs"
          style={{
            backgroundColor: getAvatarColor(reply.author?.name || "Anonymous"),
          }}
        >
          {getInitials(reply.author?.name || "Anonymous")}
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between mb-1">
            <p
              className="text-sm font-medium"
              style={{ color: colors.textPrimary }}
            >
              {reply.author?.name}
            </p>
            <span className="text-xs" style={{ color: colors.textMuted }}>
              {reply.updatedAgo || "just now"}
            </span>
          </div>

          {isEditing ? (
            <div>
              <textarea
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                className="w-full h-24 p-3 rounded border resize-none text-sm"
                style={{
                  backgroundColor: colors.bgHover,
                  borderColor: colors.border,
                  color: colors.textPrimary,
                }}
              />
              <div className="flex justify-end gap-2 mt-2">
                <button
                  onClick={handleEditCancel}
                  className="px-3 py-1 rounded text-sm hover:opacity-80 transition-opacity"
                  style={{
                    color: colors.textMuted,
                    backgroundColor: colors.bgHover,
                  }}
                >
                  Cancel
                </button>
                <button
                  onClick={handleEditSave}
                  className="px-4 py-1 rounded text-white text-sm hover:opacity-90 transition-opacity"
                  style={{ backgroundColor: colors.accent }}
                  disabled={!editText.trim()}
                >
                  Save
                </button>
              </div>
            </div>
          ) : (
            <p
              className="text-sm leading-relaxed mb-3"
              style={{ color: colors.textSecondary }}
            >
              {reply.text}
            </p>
          )}

          <div className="flex items-center gap-3">
            {/* Reply button only for parent replies */}
            {!isChild && (
              <button
                onClick={() =>
                  setExpandedReplies((prev) => {
                    const newSet = new Set(prev);
                    if (newSet.has(reply._id)) newSet.delete(reply._id);
                    else newSet.add(reply._id);
                    return newSet;
                  })
                }
                className="text-xs flex items-center gap-1 hover:opacity-80 transition-opacity"
                style={{ color: colors.textMuted }}
              >
                <Reply size={12} /> Reply
              </button>
            )}

            {/* Vote buttons */}
            <button
              onClick={() => voteReply(reply._id, "upvote")}
              className="flex items-center gap-1 px-2 py-1 rounded text-xs hover:opacity-80 transition-opacity"
              style={{
                backgroundColor: colors.bgHover,
                color: colors.textMuted,
              }}
            >
              <ArrowBigUp size={14} /> {reply.upvotes || 0}
            </button>
            <button
              onClick={() => voteReply(reply._id, "downvote")}
              className="flex items-center gap-1 px-2 py-1 rounded text-xs hover:opacity-80 transition-opacity"
              style={{
                backgroundColor: colors.bgHover,
                color: colors.textMuted,
              }}
            >
              <ArrowBigDown size={14} /> {reply.downvotes || 0}
            </button>

            {/* Edit and Delete buttons - only show for author */}
            {isAuthor && !isEditing && (
              <>
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex items-center gap-1 text-xs px-2 py-1 rounded hover:opacity-80 transition-opacity"
                  style={{
                    backgroundColor: colors.bgHover,
                    color: colors.textMuted,
                  }}
                >
                  <Edit3 size={12} /> Edit
                </button>
                <button
                  onClick={handleDelete}
                  className="flex items-center gap-1 text-xs px-2 py-1 rounded hover:opacity-80 transition-opacity"
                  style={{
                    backgroundColor: colors.bgHover,
                    color: colors.danger,
                  }}
                >
                  <Trash2 size={12} /> Delete
                </button>
              </>
            )}
          </div>

          {/* Child replies */}
          {reply.children?.length > 0 && (
            <div
              className="mt-4 pl-6 space-y-4 border-l-2"
              style={{ borderColor: colors.border }}
            >
              {reply.children.map((child) => (
                <ReplyThread
                  key={child._id}
                  reply={child}
                  colors={colors}
                  isDark={isDark}
                  expandedReplies={expandedReplies}
                  setExpandedReplies={setExpandedReplies}
                  handleInlineReplySubmit={handleInlineReplySubmit}
                  handleUpdateReply={handleUpdateReply}
                  handleDeleteReply={handleDeleteReply}
                  voteReply={voteReply}
                  getInitials={getInitials}
                  getAvatarColor={getAvatarColor}
                  isChild={true}
                  currentUser={currentUser}
                />
              ))}
            </div>
          )}

          {/* Inline Reply Editor (only for top-level replies) */}
          {expandedReplies.has(reply._id) && !isChild && (
            <InlineReplyEditor
              replyId={reply._id}
              onSubmit={handleInlineReplySubmit}
              onCancel={() =>
                setExpandedReplies((prev) => {
                  const newSet = new Set(prev);
                  newSet.delete(reply._id);
                  return newSet;
                })
              }
              colors={colors}
              isDark={isDark}
            />
          )}
        </div>
      </div>
    </div>
  );
}

/* ---------------- Inline Reply Editor ---------------- */
function InlineReplyEditor({ replyId, onSubmit, onCancel, colors, isDark }) {
  const [text, setText] = useState("");

  const handleSubmit = () => {
    if (!text.trim()) return;
    onSubmit(replyId, text);
    setText("");
  };

  return (
    <div
      className="mt-3 p-3 rounded border"
      style={{
        backgroundColor: colors.bgCard,
        borderColor: colors.border,
      }}
    >
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        className={`w-full h-20 p-3 rounded border resize-none text-sm ${
          isDark
            ? "border-dark-border bg-dark-bg-secondary hover:bg-green-500/10 hover:border-green-500/50 text-dark-text-primary hover:text-green-400"
            : "border-light-border bg-light-bg-secondary hover:bg-green-500/10 hover:border-green-500/50 text-light-text-primary hover:text-green-600"
        }`}
        placeholder="Write your reply..."
        autoFocus
      />
      <div className="flex justify-end gap-2 mt-2">
        <button
          onClick={onCancel}
          className="px-3 py-1 rounded text-sm hover:opacity-80 transition-opacity"
          style={{
            color: colors.textMuted,
            backgroundColor: colors.bgHover,
          }}
        >
          Cancel
        </button>
        <button
          onClick={handleSubmit}
          className="px-4 py-1 rounded text-white text-sm hover:opacity-90 transition-opacity"
          style={{ backgroundColor: colors.accent }}
          disabled={!text.trim()}
        >
          Reply
        </button>
      </div>
    </div>
  );
}
