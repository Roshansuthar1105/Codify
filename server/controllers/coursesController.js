import Course from "../models/courseSchema.js";
import CourseYt from "../models/courseYtSchema.js";
import UserActivity from "../models/userActivitySchema.js";
import User from "../models/userSchema.js";

// -------------------- Courses --------------------

// Get all courses
const ytCourses = async (req, res) => {
  try {
    const response = await CourseYt.find({});
    res.status(200).json({ data: response });
  } catch (error) {
    console.error("Error fetching YouTube courses:", error);
    res.status(500).json({ error: "Server error" });
  }
};

const courses = async (req, res) => {
  try {
    const response = await Course.find({});
    res.status(200).json({ data: response });
  } catch (error) {
    console.error("Error fetching courses:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// Get courses by category
const getCoursesByCategory = async (req, res) => {
  try {
    const { courseCategory } = req.params;
    const lowerCategory = courseCategory.toLowerCase();
    const response = await Course.find({ course_category: lowerCategory });
    res.status(200).json({
      success: true,
      count: response.length,
      data: response,
    });
  } catch (error) {
    console.error("Error fetching courses by category:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

// Enroll in a course
const enrollCourse = async (req, res) => {
  try {
    const { courseId } = req.body;
    const userId = req.user.id;

    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ error: "Course not found" });

    await User.findByIdAndUpdate(userId, {
      $addToSet: { enrolledCourses: courseId },
    });

    const activity = await UserActivity.create({
      userId,
      courseId,
      activityType: "course_enrolled",
      details: {
        courseName: course.title,
        enrollmentDate: new Date(),
      },
    });

    res
      .status(200)
      .json({ message: "Successfully enrolled in course", activity });
  } catch (error) {
    console.error("Error enrolling in course:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// Download course summary as PDF
const downloadCourseSummary = async (req, res) => {
  try {
    const { videoId } = req.params;

    const response = await fetch(`http://localhost:5001/transcript/${videoId}`);
    if (!response.ok)
      throw new Error(`Python service error: ${response.status}`);

    const pdfBuffer = Buffer.from(await response.arrayBuffer());

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="${videoId}_summary.pdf"`
    );
    res.setHeader("Content-Length", pdfBuffer.length);

    res.send(pdfBuffer);
  } catch (error) {
    console.error("Error downloading course summary:", error);
    res
      .status(500)
      .json({
        error: "Server error",
        details: error.message,
        videoId: req.params.videoId,
      });
  }
};

export {
  courses as default,
  enrollCourse,
  ytCourses,
  downloadCourseSummary,
  getCoursesByCategory,
};
