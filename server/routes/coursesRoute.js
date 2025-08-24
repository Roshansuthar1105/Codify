import express from "express";
import courses, { enrollCourse } from "../controllers/coursesController.js";
import { authenticate } from "../middlewares/authMiddleware.js";

const coursesRouter = express.Router();

// Get all courses
coursesRouter.route("/").get(courses);

// Enroll in a course (protected route)
coursesRouter.route("/enroll").post(authenticate, enrollCourse);

export default coursesRouter;