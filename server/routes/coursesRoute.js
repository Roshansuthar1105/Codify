import express from "express";
import courses, { enrollCourse, ytCourses,downloadCourseSummary,getCoursesByCategory } from "../controllers/coursesController.js";
import  authMiddleware  from "../middlewares/authMiddleware.js";

const coursesRouter = express.Router();

// Get all courses
coursesRouter.route("/").get(courses);
coursesRouter.route("/yt").get(ytCourses);
coursesRouter.route("/summary/:videoId").get(downloadCourseSummary);
coursesRouter.route("/:courseCategory").get(getCoursesByCategory); //by category

// Enroll in a course (protected route)
coursesRouter.route("/enroll").post(authMiddleware, enrollCourse);

export default coursesRouter;