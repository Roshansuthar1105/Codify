import Course from "../models/courseSchema.js";
import Feedback from "../models/feedbackSchema.js";
import User from "../models/userSchema.js";
import CourseYt from "../models/courseYtSchema.js"; // For YouTube API courses
import axios from "axios";
import NodeCache from "node-cache";

const ytCache = new NodeCache({ stdTTL: 3600 }); // Cache for 1 hour

// -------------------- Users --------------------
const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({}, { password: 0 });
    if (!users.length)
      return res.status(404).json({ message: "No users found" });
    return res.status(200).json(users.reverse());
  } catch (error) {
    next(error);
  }
};

const findOneUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id, { password: 0 });
    return res.status(200).json(user);
  } catch (error) {
    console.error(error);
    next(error);
  }
};

const updateOneUser = async (req, res, next) => {
  try {
    const updatedData = await User.updateOne(
      { _id: req.params.id },
      { $set: req.body }
    );
    return res.status(200).json(updatedData);
  } catch (error) {
    next(error);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    await User.deleteOne({ _id: req.params.id });
    return res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

// -------------------- Contacts --------------------
const getAllContacts = async (req, res, next) => {
  try {
    const contacts = await Feedback.find();
    if (!contacts.length)
      return res.status(404).json({ message: "No feedback found" });
    return res.status(200).json(contacts.reverse());
  } catch (error) {
    next(error);
  }
};

const deleteContact = async (req, res, next) => {
  try {
    await Feedback.deleteOne({ _id: req.params.id });
    return res.status(200).json({ message: "Contact deleted successfully" });
  } catch (error) {
    console.error("Error deleting contact:", error);
    next(error);
  }
};

// -------------------- Courses --------------------
const getAllCourses = async (req, res, next) => {
  try {
    const courses = await Course.find();
    if (!courses.length)
      return res.status(404).json({ message: "No courses found" });
    return res.status(200).json(courses.reverse());
  } catch (error) {
    next(error);
  }
};

const getOneCourse = async (req, res, next) => {
  try {
    const course = await Course.findById(req.params.id);
    return res.status(200).json(course);
  } catch (error) {
    next(error);
  }
};

const addNewCourse = async (req, res, next) => {
  try {
    await Course.create(req.body);
    return res.status(200).json({ message: "Course added successfully" });
  } catch (error) {
    next(error);
  }
};

const updateCourse = async (req, res, next) => {
  try {
    if (!req.body || !Object.keys(req.body).length) {
      return res.status(400).json({ message: "Request body is empty" });
    }

    const updatedCourse = await Course.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedCourse)
      return res.status(404).json({ message: "Course not found" });

    return res
      .status(200)
      .json({ message: "Course updated successfully", course: updatedCourse });
  } catch (error) {
    next(error);
  }
};

const deleteCourse = async (req, res, next) => {
  try {
    const deletedCourse = await Course.deleteOne({ _id: req.params.id });
    return res.status(200).json(deletedCourse);
  } catch (error) {
    next(error);
  }
};

// -------------------- YouTube Course --------------------
const fetchYoutubeCourseData = async (req, res) => {
  try {
    const { course_youtube_id, course_category, course_type } = req.body;

    if (!course_youtube_id || !course_category || !course_type) {
      return res
        .status(400)
        .json({
          message:
            "course_youtube_id, course_category, and course_type are required",
        });
    }

    // Check DB first
    const existingCourse = await CourseYt.findOne({ course_youtube_id });
    if (existingCourse)
      return res
        .status(200)
        .json({ message: "Course already exists", course: existingCourse });

    // Check cache
    const cachedData = ytCache.get(course_youtube_id);
    if (cachedData) {
      const savedCourse = await CourseYt.create({
        ...cachedData,
        course_category,
        course_type,
        course_youtube_id,
      });
      return res.status(200).json({ ...savedCourse._doc, cached: true });
    }

    // Fetch video details
    const videoRes = await axios.get(
      "https://www.googleapis.com/youtube/v3/videos",
      {
        params: {
          part: "snippet",
          id: course_youtube_id,
          key: process.env.YOUTUBE_API_KEY,
        },
      }
    );

    if (!videoRes.data.items?.length)
      return res.status(404).json({ message: "Invalid YouTube Video ID" });

    const video = videoRes.data.items[0].snippet;

    // Fetch channel details
    const channelRes = await axios.get(
      "https://www.googleapis.com/youtube/v3/channels",
      {
        params: {
          part: "snippet",
          id: video.channelId,
          key: process.env.YOUTUBE_API_KEY,
        },
      }
    );

    const channel = channelRes.data.items[0].snippet;

    const result = {
      course_category,
      course_type,
      course_youtube_id,
      course_title: video.title,
      description: video.description,
      course_image: video.thumbnails.high.url,
      creator_name: channel.title,
      creator_image: channel.thumbnails.high.url,
      creator_youtube_link: `https://www.youtube.com/channel/${video.channelId}`,
    };

    // Cache & save
    ytCache.set(course_youtube_id, result);
    const savedCourse = await CourseYt.create(result);

    return res
      .status(201)
      .json({ message: "Course added successfully", course: savedCourse });
  } catch (error) {
    console.error("YouTube API fetch error:", error.message);
    return res.status(500).json({
      message:
        "Failed to fetch YouTube data. You can enter course details manually.",
    });
  }
};

export {
  getAllUsers,
  getAllContacts,
  deleteContact,
  getAllCourses,
  deleteUser,
  findOneUser,
  updateOneUser,
  addNewCourse,
  updateCourse,
  deleteCourse,
  getOneCourse,
  fetchYoutubeCourseData,
};
