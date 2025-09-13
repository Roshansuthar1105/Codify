import Question from "../models/questionsSchema.js";
import Reply from "../models/replySchema.js";

/**
 * @desc Get all questions with populated replies
 * @route GET /questions
 */
export const getAllQuestions = async (req, res) => {
  try {
    const questions = await Question.find()
      .sort({ createdAt: -1 })
      .populate({
        path: "replies",
        options: { sort: { createdAt: 1 } }, // replies sorted oldest → newest
      })
      .lean();

    res.json(questions);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch questions" });
  }
};

/**
 * @desc Get single question by ID with populated replies
 * @route GET /questions/:id
 */
export const getQuestionById = async (req, res) => {
  try {
    const { id } = req.params;

    const question = await Question.findById(id)
    .populate({
      path: "replies",
      options: { sort: { createdAt: 1 } },
    })
    .lean();
  
  // 🔥 filter replies so only parent + one-level children exist
  question.replies = question.replies.map(r => ({
    ...r,
    children: question.replies.filter(c => String(c.parentId) === String(r._id)),
  }));
  
    if (!question) return res.status(404).json({ error: "Question not found" });

    res.json(question);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch question" });
  }
};

/**
 * @desc Create a new question
 * @route POST /questions
 */
export const createQuestion = async (req, res) => {
  try {
    const { title, excerpt, tags } = req.body;

    if (!req.user) return res.status(401).json({ message: "Unauthorized" });
    console.log(req.user.username)
    const question = new Question({
      author: {
        _id: req.user._id,
        name: req.user.username || "Anonymous",
      },
      title,
      excerpt,
      tags,
    });

    await question.save();
    res.status(201).json(question);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to create question" });
  }
};

/**
 * @desc Update a question
 * @route PATCH /questions/:id
 */
export const updateQuestion = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const question = await Question.findById(id);
    if (!question) return res.status(404).json({ error: "Question not found" });

    // Only author can update
    if (!question.author._id.equals(req.user?._id))
      return res.status(403).json({ message: "Unauthorized to update this question" });

    Object.assign(question, updates);
    await question.save();

    res.json(question);
  } catch (err) {
    res.status(500).json({ error: "Failed to update question" });
  }
};

/**
 * @desc Delete a question
 * @route DELETE /questions/:id
 */
export const deleteQuestion = async (req, res) => {
  try {
    const { id } = req.params;

    const question = await Question.findById(id);
    if (!question) return res.status(404).json({ error: "Question not found" });

    if (!question.author._id.equals(req.user?._id))
      return res.status(403).json({ message: "Unauthorized to delete this question" });

    await question.remove();
    await Reply.deleteMany({ questionId: id });

    res.json({ message: "Question and its replies deleted" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete question" });
  }
};

// ✅ Upvote a question
// ✅ Upvote a question
export const upvoteQuestion = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;

    const question = await Question.findById(id);
    if (!question)
      return res.status(404).json({ message: "Question not found" });

    let update = {};
    let inc = {};

    if (question.upvotedBy.includes(userId)) {
      // remove upvote
      update.$pull = { upvotedBy: userId };
      inc.upvotes = -1;
    } else {
      // add upvote and remove downvote
      update.$addToSet = { upvotedBy: userId };
      update.$pull = { downvotedBy: userId };
      inc.upvotes = 1;

      if (question.downvotedBy.includes(userId)) {
        inc.downvotes = -1;
      }
    }

    if (Object.keys(inc).length > 0) {
      update.$inc = inc;
    }

    const updated = await Question.findByIdAndUpdate(id, update, { new: true })
      .populate({
        path: "replies",
        options: { sort: { createdAt: 1 } },
      })
      .lean();

    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Downvote a question
export const downvoteQuestion = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;

    const question = await Question.findById(id);
    if (!question)
      return res.status(404).json({ message: "Question not found" });

    let update = {};
    let inc = {};

    if (question.downvotedBy.includes(userId)) {
      // remove downvote
      update.$pull = { downvotedBy: userId };
      inc.downvotes = -1;
    } else {
      // add downvote and remove upvote
      update.$addToSet = { downvotedBy: userId };
      update.$pull = { upvotedBy: userId };
      inc.downvotes = 1;

      if (question.upvotedBy.includes(userId)) {
        inc.upvotes = -1;
      }
    }

    if (Object.keys(inc).length > 0) {
      update.$inc = inc;
    }

    const updated = await Question.findByIdAndUpdate(id, update, { new: true })
      .populate({
        path: "replies",
        options: { sort: { createdAt: 1 } },
      })
      .lean();

    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// ✅ Toggle Bookmark
// ✅ Toggle Bookmark on a Question
export const toggleBookmark = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;

    const question = await Question.findById(id);
    if (!question) return res.status(404).json({ message: "Question not found" });

    let update = {};

    if (question.bookmarkedBy.includes(userId)) {
      // Remove bookmark
      update = { $pull: { bookmarkedBy: userId } };
    } else {
      // Add bookmark
      update = { $addToSet: { bookmarkedBy: userId } };
    }

    const updated = await Question.findByIdAndUpdate(id, update, { new: true })
      .populate({
        path: "replies",
        options: { sort: { createdAt: 1 } },
      })
      .lean();

    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

