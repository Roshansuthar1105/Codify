import User from "../models/userSchema.js";
import Course from "../models/courseSchema.js";
import UserActivity from "../models/userActivitySchema.js";
import mongoose from "mongoose";

// Toggle a course in user's watchlist
export const toggleWatchlist = async (req, res) => {
  const { courseId } = req.body;
  const userId = req.user.id;

  try {
    if (!courseId || !mongoose.Types.ObjectId.isValid(courseId)) {
      return res.status(400).json({ error: "Invalid courseId" });
    }

    const user = await User.findById(userId);
    const course = await Course.findById(courseId);

    if (!user || !course) {
      return res.status(404).json({ error: "User or Course not found" });
    }

    const exists = user.watchlist.some((id) => id.toString() === courseId);
    const activityType = exists
      ? "removed_from_watchlist"
      : "added_to_watchlist";

    if (exists) {
      user.watchlist = user.watchlist.filter(
        (id) => id.toString() !== courseId
      );
    } else {
      user.watchlist.push(courseId);
    }

    await user.save();

    await UserActivity.create({ userId, courseId, activityType });

    return res.status(200).json({
      message: exists
        ? "Course removed from watchlist"
        : "Course added to watchlist",
    });
  } catch (error) {
    console.error("toggleWatchlist error", error);
    return res.status(500).json({ error: "Server error" });
  }
};

// Get the user's watchlist
export const getWatchlist = async (req, res) => {
  const userId = req.user.id;

  try {
    const user = await User.findById(userId).populate("watchlist");
    if (!user) return res.status(404).json({ error: "User not found" });

    return res.status(200).json({ watchlist: user.watchlist });
  } catch (error) {
    console.error("getWatchlist error", error);
    return res.status(500).json({ error: "Server error" });
  }
};

// Get logged-in user's details
export const user = async (req, res) => {
  try {
    return res.status(200).json({ user: req.user });
  } catch (error) {
    console.error("user error", error);
    return res.status(400).json({ message: error.message || error });
  }
};

// Update logged-in user's profile
export const updateProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const allowedFields = [
      "username",
      "email",
      "firstName",
      "lastName",
      "bio",
      "profileImage",
      "phone",
    ];
    const update = {};

    allowedFields.forEach((field) => {
      if (typeof req.body[field] === "string") update[field] = req.body[field];
    });

    if (Object.keys(update).length === 0) {
      return res.status(400).json({ message: "No valid fields to update" });
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: update },
      { new: true, runValidators: true }
    );
    if (!updatedUser)
      return res.status(404).json({ message: "User not found" });

    return res
      .status(200)
      .json({ message: "Profile updated", user: updatedUser });
  } catch (error) {
    console.error("updateProfile error", error);
    return res.status(500).json({ message: "Server error" });
  }
};
