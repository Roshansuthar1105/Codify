import Reply from "../models/replySchema.js";
import Question from "../models/questionsSchema.js";

// Add a reply
export const addReply = async (req, res) => {
  try {
    const { id } = req.params; // question ID
    const { text, parentId, replyToAuthor } = req.body;

    if (!text) return res.status(400).json({ message: "Reply text is required" });

    const question = await Question.findById(id);
    if (!question) return res.status(404).json({ message: "Question not found" });
    console.log(req.user.usersname)
    // Create reply
    const newReply = await Reply.create({
      questionId: id,
      author: {
        _id: req.user._id,
        name: req.user.username || "Anonymous",
      },
      text,
      parentId: parentId || null,
      replyToAuthor: replyToAuthor || null,
    });

    // Link reply to the question
    question.replies.push(newReply._id);
    await question.save();

    // Populate newly added reply
    const populatedReply = await Reply.findById(newReply._id)
      .populate("author._id", "name")
      .lean();

    res.status(201).json(populatedReply);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update a reply
export const updateReply = async (req, res) => {
  try {
    const { replyId } = req.params;
    const { text } = req.body;

    const reply = await Reply.findById(replyId);
    if (!reply) return res.status(404).json({ message: "Reply not found" });

    if (!reply.author._id.equals(req.user._id))
      return res.status(403).json({ message: "Unauthorized to update this reply" });

    reply.text = text || reply.text;
    await reply.save();

    const populatedReply = await Reply.findById(reply._id)
      .populate("author._id", "name")
      .lean();

    res.json(populatedReply);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete a reply
export const deleteReply = async (req, res) => {
  try {
    const { replyId } = req.params;

    const reply = await Reply.findById(replyId);
    if (!reply) return res.status(404).json({ message: "Reply not found" });

    if (!reply.author._id.equals(req.user._id))
      return res.status(403).json({ message: "Unauthorized to delete this reply" });

    await reply.remove();

    await Question.findByIdAndUpdate(reply.questionId, {
      $pull: { replies: reply._id },
    });

    res.json({ message: "Reply deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Vote a reply
export const voteReply = async (req, res) => {
  try {
    const { replyId } = req.params;
    const { type } = req.body; // "upvote" or "downvote"
    const userId = req.user._id;

    const reply = await Reply.findById(replyId);
    if (!reply) return res.status(404).json({ message: "Reply not found" });

    // Remove any existing vote by this user
    reply.upvotedBy = reply.upvotedBy.filter(
      (id) => !id.equals(userId)
    );
    reply.downvotedBy = reply.downvotedBy.filter(
      (id) => !id.equals(userId)
    );

    if (type === "upvote") {
      reply.upvotedBy.push(userId);
    } else if (type === "downvote") {
      reply.downvotedBy.push(userId);
    }

    // Recalculate counts
    reply.upvotes = reply.upvotedBy.length;
    reply.downvotes = reply.downvotedBy.length;

    await reply.save();

    const populatedReply = await Reply.findById(reply._id)
      .populate("author._id", "name")
      .lean();

    res.json(populatedReply);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
