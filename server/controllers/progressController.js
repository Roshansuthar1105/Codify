import CourseProgress from "../models/courseProgressSchema.js";
import UserActivity from "../models/userActivitySchema.js";
import Course from "../models/courseSchema.js";
import User from "../models/userSchema.js";

// ✅ Get user's progress for all courses
export const getUserProgress = async (req, res) => {
  try {
    const userId = req.user.id;

    const progress = await CourseProgress.find({ userId })
      .populate("courseId")
      .sort({ lastAccessedAt: -1 });

    return res.status(200).json({ progress: progress || [] });
  } catch (error) {
    console.error("Error fetching user progress:", error);
    return res.status(500).json({ error: "Server error" });
  }
};

// ✅ Get user's progress for a specific course
export const getCourseProgress = async (req, res) => {
  try {
    const userId = req.user.id;
    const { courseId } = req.params;

    const progress = await CourseProgress.findOne({
      userId,
      courseId,
    }).populate("courseId");

    if (!progress) {
      return res.status(404).json({ error: "Progress not found" });
    }

    return res.status(200).json({ progress });
  } catch (error) {
    console.error("Error fetching course progress:", error);
    return res.status(500).json({ error: "Server error" });
  }
};

// ✅ Update course progress
export const updateCourseProgress = async (req, res) => {
  try {
    const userId = req.user.id;
    const { courseId } = req.params;
    const {
      progress,
      currentVideoTime,
      totalHoursSpent,
      status,
      videoProgress,
      currentVideoId,
    } = req.body;

    let progressRecord = await CourseProgress.findOne({ userId, courseId });

    // Create new record if not found
    if (!progressRecord) {
      const courseExists = await Course.findById(courseId);
      if (!courseExists)
        return res.status(404).json({ error: "Course not found" });

      progressRecord = new CourseProgress({
        userId,
        courseId,
        progress: progress || 0,
        currentVideoTime: currentVideoTime || 0,
        totalHoursSpent: totalHoursSpent || 0,
        status: status || "in-progress",
        currentVideoId: currentVideoId || "",
        videoProgress: videoProgress || {},
      });

      await new UserActivity({
        userId,
        courseId,
        activityType: "started_course",
      }).save();
    } else {
      progressRecord.lastAccessedAt = Date.now();

      if (progress !== undefined) progressRecord.progress = progress;
      if (currentVideoTime !== undefined)
        progressRecord.currentVideoTime = currentVideoTime;
      if (totalHoursSpent !== undefined)
        progressRecord.totalHoursSpent = totalHoursSpent;
      if (status !== undefined) {
        progressRecord.status = status;

        if (status === "completed" && !progressRecord.completedAt) {
          progressRecord.completedAt = Date.now();
          await new UserActivity({
            userId,
            courseId,
            activityType: "completed_course",
          }).save();
        }
      }

      if (currentVideoId) progressRecord.currentVideoId = currentVideoId;

      if (videoProgress && Object.keys(videoProgress).length > 0) {
        progressRecord.videoProgress ||= {};

        for (const [videoId, data] of Object.entries(videoProgress)) {
          if (!videoId) {
            console.warn("Skipping invalid videoId:", videoId);
            continue;
          }

          progressRecord.videoProgress[videoId] = {
            currentTime: data.currentTime || 0,
            progress: data.progress || 0,
            duration: data.duration || 0,
            lastUpdated: new Date(),
            status: data.status || "in-progress",
          };
        }

        if (
          currentVideoId &&
          progressRecord.currentVideoId !== currentVideoId
        ) {
          await new UserActivity({
            userId,
            courseId,
            activityType: "video_change",
            details: {
              videoId: currentVideoId,
              previousVideoId: progressRecord.currentVideoId || null,
            },
          }).save();
        }
      }
    }

    await progressRecord.save();

    return res.status(200).json({
      message: "Progress updated successfully",
      progress: progressRecord,
    });
  } catch (error) {
    console.error("Error updating course progress:", error);
    return res.status(500).json({ error: "Server error" });
  }
};

// ✅ Update module progress
export const updateModuleProgress = async (req, res) => {
  try {
    const userId = req.user.id;
    const { courseId } = req.params;
    const { moduleId, moduleName, completed } = req.body;

    if (!moduleId || !moduleName) {
      return res.status(400).json({ error: "Module ID and name are required" });
    }

    const progressRecord = await CourseProgress.findOne({ userId, courseId });
    if (!progressRecord)
      return res.status(404).json({ error: "Course progress not found" });

    const moduleIndex = progressRecord.modules.findIndex(
      (m) => m.moduleId === moduleId
    );

    if (moduleIndex === -1) {
      progressRecord.modules.push({
        moduleId,
        moduleName,
        completed: completed || false,
        completedAt: completed ? Date.now() : null,
      });
    } else if (
      completed !== undefined &&
      completed !== progressRecord.modules[moduleIndex].completed
    ) {
      progressRecord.modules[moduleIndex].completed = completed;
      progressRecord.modules[moduleIndex].completedAt = completed
        ? Date.now()
        : null;

      if (completed) {
        await new UserActivity({
          userId,
          courseId,
          moduleId,
          moduleName,
          activityType: "completed_module",
        }).save();
      }
    }

    const totalModules = progressRecord.modules.length;
    const completedModules = progressRecord.modules.filter(
      (m) => m.completed
    ).length;

    if (totalModules > 0) {
      progressRecord.progress = Math.round(
        (completedModules / totalModules) * 100
      );

      if (completedModules === totalModules) {
        progressRecord.status = "completed";
        progressRecord.completedAt = Date.now();

        await new UserActivity({
          userId,
          courseId,
          activityType: "completed_course",
        }).save();
      }
    }

    progressRecord.lastAccessedAt = Date.now();
    await progressRecord.save();

    return res.status(200).json({
      message: "Module progress updated successfully",
      progress: progressRecord,
    });
  } catch (error) {
    console.error("Error updating module progress:", error);
    return res.status(500).json({ error: "Server error" });
  }
};

// ✅ Get user's recent activity
export const getUserActivity = async (req, res) => {
  try {
    const userId = req.user.id;
    const limit = parseInt(req.query.limit, 10) || 10;

    const activities = await UserActivity.find({ userId })
      .populate("courseId")
      .sort({ timestamp: -1 })
      .limit(limit);

    return res.status(200).json({ activities });
  } catch (error) {
    console.error("Error fetching user activity:", error);
    return res.status(500).json({ error: "Server error" });
  }
};
