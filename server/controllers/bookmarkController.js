import User from "../models/userSchema.js";
import Activity from "../models/userActivitySchema.js";

// -------------------- Bookmarks --------------------

// Get all bookmarks for logged-in user
export const getBookmarks = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId, "bookmarkedRoadmaps");
    if (!user) return res.status(404).json({ error: "User not found" });
    res.status(200).json({ data: user.bookmarkedRoadmaps });
  } catch (error) {
    console.error("Error fetching bookmarks:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// Add a roadmap to bookmarks
export const addBookmark = async (req, res) => {
  try {
    const userId = req.user.id;
    const { name, link, icon, type } = req.body;
    if (!name || !link || !type)
      return res.status(400).json({ error: "Incomplete roadmap info" });

    await User.findByIdAndUpdate(userId, {
      $addToSet: { bookmarkedRoadmaps: { name, link, icon, type } },
    });

    // Log activity
    await Activity.create({
      userId,
      activityType: "bookmark_added",
      details: { name, link, type },
      timestamp: new Date(),
    });

    res.status(200).json({ message: "Roadmap bookmarked successfully" });
  } catch (error) {
    console.error("Error adding bookmark:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// Remove a roadmap from bookmarks
export const removeBookmark = async (req, res) => {
  try {
    const userId = req.user.id;
    const { name } = req.body;
    if (!name) return res.status(400).json({ error: "Roadmap name required" });

    await User.findByIdAndUpdate(userId, {
      $pull: { bookmarkedRoadmaps: { name } },
    });

    // Log activity
    await Activity.create({
      userId,
      activityType: "bookmark_removed",
      details: { name },
      timestamp: new Date(),
    });

    res.status(200).json({ message: "Bookmark removed successfully" });
  } catch (error) {
    console.error("Error removing bookmark:", error);
    res.status(500).json({ error: "Server error" });
  }
};
