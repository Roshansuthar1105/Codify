import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useMemo,
} from "react";

const QuestionsContext = createContext(null);

export function useQuestions() {
  const ctx = useContext(QuestionsContext);
  if (!ctx)
    throw new Error("useQuestions must be used within <QuestionsProvider>");
  return ctx;
}

// 🔹 Helpers for reply updates in nested structures
const updateReplyInArray = (replies, replyId, updatedReply) =>
  replies.map((reply) =>
    reply._id === replyId
      ? { ...updatedReply, children: reply.children || [] }
      : reply.children
      ? {
          ...reply,
          children: updateReplyInArray(reply.children, replyId, updatedReply),
        }
      : reply
  );

const removeReplyFromArray = (replies, replyId) =>
  replies
    .filter((reply) => reply._id !== replyId)
    .map((reply) =>
      reply.children
        ? { ...reply, children: removeReplyFromArray(reply.children, replyId) }
        : reply
    );

// 🔹 Extract userId from token
const getUserIdFromToken = (token) => {
  if (!token) return null;
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload?.id || null;
  } catch (err) {
    console.warn("Failed to decode JWT", err);
    return null;
  }
};

// 🔹 Normalize a question with a bookmarked field
const transformQuestion = (q, userId) => ({
  ...q,
  bookmarked: q.bookmarkedBy?.includes(userId) || false,
});

export function QuestionsProvider({ children }) {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("latest");

  const API =  import.meta.env.VITE_SERVER_API;
  const token = localStorage.getItem("token");
  const userId = getUserIdFromToken(token);

  const getAuthHeader = () =>
    token ? { Authorization: `Bearer ${token}` } : {};

  // 🔹 Centralized fetch wrapper
  const apiFetch = async (url, options = {}) => {
    try {
      const res = await fetch(url, {
        headers: {
          "Content-Type": "application/json",
          ...getAuthHeader(),
          ...options.headers,
        },
        ...options,
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message || `Request failed: ${res.status}`);
      }
      return res.json();
    } catch (err) {
      console.error("API Error:", err);
      throw err;
    }
  };

  // Fetch all questions
  const fetchQuestions = async () => {
    setLoading(true);
    try {
      const data = await apiFetch(`${API}/api/questions/getAll`);
      const withBookmark = Array.isArray(data)
        ? data.map((q) => transformQuestion(q, userId))
        : [];
      setQuestions(withBookmark);
      setError(null);
    } catch (err) {
      setError(err.message);
      setQuestions([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, [token]);

  // Create question
  const askQuestion = async (payload) => {
    const newQuestion = await apiFetch(`${API}/api/questions/create`, {
      method: "POST",
      body: JSON.stringify(payload),
    });
    setQuestions((prev) => [transformQuestion(newQuestion, userId), ...prev]);
  };

  // Add reply
  const addReply = async (questionId, reply) => {
    const newReply = await apiFetch(
      `${API}/api/questions/${questionId}/replies`,
      {
        method: "POST",
        body: JSON.stringify(reply),
      }
    );
    setQuestions((prev) =>
      prev.map((q) =>
        q._id === questionId
          ? { ...q, replies: [...(q.replies || []), newReply] }
          : q
      )
    );
  };

  // Update reply
  const updateReply = async (replyId, text) => {
    const updatedReply = await apiFetch(`${API}/api/replies/${replyId}`, {
      method: "PATCH",
      body: JSON.stringify({ text }),
    });
    setQuestions((prev) =>
      prev.map((q) => ({
        ...q,
        replies: updateReplyInArray(q.replies || [], replyId, updatedReply),
      }))
    );
  };

  // Delete reply
  const deleteReply = async (replyId, questionId) => {
    await apiFetch(`${API}/api/replies/${replyId}`, { method: "DELETE" });
    setQuestions((prev) =>
      prev.map((q) =>
        q._id === questionId
          ? { ...q, replies: removeReplyFromArray(q.replies || [], replyId) }
          : q
      )
    );
  };

  // Vote question
  const voteQuestion = async (id, type) => {
    const updated = await apiFetch(`${API}/api/questions/${type}/${id}`, {
      method: "POST",
    });
    setQuestions((prev) =>
      prev.map((q) => (q._id === id ? transformQuestion(updated, userId) : q))
    );
  };

  // Vote reply
  const voteReply = async (replyId, type) => {
    const updatedReply = await apiFetch(`${API}/api/replies/${replyId}/vote`, {
      method: "POST",
      body: JSON.stringify({ type }),
    });
    setQuestions((prev) =>
      prev.map((q) => ({
        ...q,
        replies: updateReplyInArray(q.replies || [], replyId, updatedReply),
      }))
    );
  };

  // Bookmark toggle
  const toggleBookmark = async (id) => {
    // Optimistic update
    setQuestions((prev) =>
      prev.map((q) => (q._id === id ? { ...q, bookmarked: !q.bookmarked } : q))
    );

    try {
      await apiFetch(`${API}/api/questions/bookmark/${id}`, { method: "POST" });
    } catch (err) {
      console.error("Bookmark toggle failed", err);
      // Rollback if API fails
      setQuestions((prev) =>
        prev.map((q) =>
          q._id === id ? { ...q, bookmarked: !q.bookmarked } : q
        )
      );
    }
  };

  // Filter & Sort
  const filtered = useMemo(() => {
    if (!Array.isArray(questions)) return [];
    let result = [...questions];

    if (search.trim()) {
      const term = search.toLowerCase();
      result = result.filter(
        (q) =>
          q.title?.toLowerCase().includes(term) ||
          q.excerpt?.toLowerCase().includes(term)
      );
    }

    if (sort === "upvotes")
      result.sort((a, b) => (b.upvotes || 0) - (a.upvotes || 0));
    if (sort === "replies")
      result.sort((a, b) => (b.replies?.length || 0) - (a.replies?.length || 0));

    return result;
  }, [questions, search, sort]);

  return (
    <QuestionsContext.Provider
      value={{
        questions: filtered,
        loading,
        error,
        search,
        sort,
        setSearch,
        setSort,
        askQuestion,
        addReply,
        updateReply,
        deleteReply,
        voteQuestion,
        voteReply,
        toggleBookmark,
        fetchQuestions,
      }}
    >
      {children}
    </QuestionsContext.Provider>
  );
}
