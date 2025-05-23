import UserActivity from "../models/userActivitySchema.js";
import Course from "../models/courseSchema.js";

/**
 * Add a new user activity
 * @route POST /activity/add
 * @access Private
 */
export const addActivity = async (req, res) => {
  try {
    const userId = req.user.id;
    const { courseId, activityType, details } = req.body;
    
    // Validate required fields
    if (!courseId || !activityType) {
      return res.status(400).json({ error: "Course ID and activity type are required" });
    }
    
    // Validate course exists
    const courseExists = await Course.findById(courseId);
    if (!courseExists) {
      return res.status(404).json({ error: "Course not found" });
    }
    
    // Create new activity
    const activity = new UserActivity({
      userId,
      courseId,
      activityType,
      details: details || {}
    });
    
    // Add module info if provided
    if (details && details.moduleId) {
      activity.moduleId = details.moduleId;
    }
    
    if (details && details.moduleName) {
      activity.moduleName = details.moduleName;
    }
    
    await activity.save();
    
    return res.status(201).json({ 
      message: "Activity recorded successfully",
      activity
    });
  } catch (error) {
    console.error("Error recording activity:", error);
    return res.status(500).json({ error: "Server error" });
  }
};

/**
 * Get all activities for a user
 * @route GET /activity
 * @access Private
 */
export const getUserActivities = async (req, res) => {
  try {
    const userId = req.user.id;
    const limit = parseInt(req.query.limit) || 10;
    
    const activities = await UserActivity.find({ userId })
      .populate('courseId')
      .sort({ timestamp: -1 })
      .limit(limit);
    
    return res.status(200).json({ activities });
  } catch (error) {
    console.error("Error fetching user activities:", error);
    return res.status(500).json({ error: "Server error" });
  }
};

/**
 * Get activities for a specific course
 * @route GET /activity/course/:courseId
 * @access Private
 */
export const getCourseActivities = async (req, res) => {
  try {
    const userId = req.user.id;
    const { courseId } = req.params;
    const limit = parseInt(req.query.limit) || 10;
    
    // Validate course exists
    const courseExists = await Course.findById(courseId);
    if (!courseExists) {
      return res.status(404).json({ error: "Course not found" });
    }
    
    const activities = await UserActivity.find({ 
      userId, 
      courseId 
    })
      .sort({ timestamp: -1 })
      .limit(limit);
    
    return res.status(200).json({ activities });
  } catch (error) {
    console.error("Error fetching course activities:", error);
    return res.status(500).json({ error: "Server error" });
  }
};
