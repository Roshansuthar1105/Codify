import Course from "../models/courseSchema.js";
import Feedback from "../models/feedbackSchema.js";
import User from "../models/userSchema.js";
import CourseYt from "../models/courseYtSchema.js"; //for Youtube_API coursemodel 
import axios from "axios";
import NodeCache from "node-cache";
const ytCache = new NodeCache({ stdTTL: 3600 }); // Cache for 1 hour

const getAllUsers = async (req, res) => {
  try {
    const users = (await User.find({},{password:0}));
    if (!users || users.length === 0) {
      return res.status(404).json({ message: "no User found " });
    }
    users.reverse();
    return res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};
const getAllContacts = async (req, res) => {
  try {
    const contacts = await Feedback.find();
    if (!contacts || contacts.length === 0) {
      return res.status(404).json({ message: "no feedback found" });
    }
    contacts.reverse();
    return res.status(200).json(contacts);
  } catch (error) {
    next(error);
  }
};
const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find();
    // const courses = await CourseYt.find();
    if (!courses || courses.length === 0) {
      return res.status(404).json({ message: "no course found " });
    }
    courses.reverse();
    return res.status(200).json(courses);
  } catch (error) {
    next(error);
  }
};
const getOneCourse = async (req,res)=>{
  try {
    const id = req.params.id;
    // const course = await CourseYt.findOne({_id:id});
    const course = await Course.findOne({_id:id});
    return res.status(200).json(course);
  } catch (error) {
    next(error);
  }
}
const addNewCourse = async (req,res)=>{
  try {
    // const newCourse = await CourseYt.create(req.body);
    const newCourse = await Course.create(req.body);
    return res.status(200).json({message:"Course added successfully"});
  } catch (error) {
    next(error);
  }
}
const updateCourse = async (req,res)=>{
  try {
    const id = req.params.id;
    
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ message: "Request body is empty" });
    }

    const updatedCourse = await Course.findByIdAndUpdate(
      id,
      req.body,
      { new: true, runValidators: true }
    );
    // const updatedCourse = await CourseYt.findByIdAndUpdate(
    //   id,
    //   req.body,
    //   { new: true, runValidators: true }
    // );

    if (!updatedCourse) {
      return res.status(404).json({ message: "Course not found" });
    }

    return res.status(200).json({ 
      message: "Course updated successfully",
      course: updatedCourse 
    });
  } catch (error) {
    next(error);
  }
}
const deleteCourse = async (req,res)=>{
  try {
    const id = req.params.id;
    const deletedCourse = await Course.deleteOne({_id:id});
    // const deletedCourse = await CourseYt.deleteOne({_id:id});
    return res.status(200).json(deletedCourse);
  } catch (error) {
    next(error);
  }
}
const findOneUser = async (req,res)=>{
  try {
    const Id =await req.params.id;
    const user = await User.findOne({_id:Id},{password:0});
    return res.status(200).json(user);
  } catch (error) {
    console.log(error)
    next(error);
  }
}
const updateOneUser = async (req,res)=>{
  try{
    const id = req.params.id;
    const userData = req.body;
    const updatedData = await User.updateOne({_id:id},{$set : userData});
    return res.status(200).json(updatedData);
  }catch(error){
    next(error);
  }
}
const deleteUser = async (req,res)=>{
  try {
    const deleteId =await req.params.id;
    await User.deleteOne({_id:deleteId});
    return res.status(200).json({message:"User Deleted successfully"});
  } catch (error) {
    console.log(error)
    next(error);
  }
}
const deleteContact = async (req,res)=>{
  try {
    const deleteId =await req.params.id;
    const dlt =  await Feedback.deleteOne({_id:deleteId});
    return res.status(200).json({message:"Contact Deleted successfully"});
  } catch (error) {
    console.log("error from contact", error)
    next(error);
  }

}

const fetchYoutubeCourseData = async (req, res) => {
  try {
    const { course_youtube_id, course_category, course_type } = req.body;

    if (!course_youtube_id || !course_category || !course_type) {
      return res.status(400).json({ message: "course_youtube_id, course_category, and course_type are required" });
    }

    //Check DB first to avoid duplicates
    const existingCourse = await CourseYt.findOne({ course_youtube_id });
    if (existingCourse) {
      return res.status(200).json({ message: "Course already exists", course: existingCourse });
    }

    //Check Cache
    const cachedData = ytCache.get(course_youtube_id);
    if (cachedData) {
      const savedCourse = await CourseYt.create({ ...cachedData, course_category, course_type, course_youtube_id });
      return res.status(200).json({ ...savedCourse._doc, cached: true });
    }

    //Fetch video details from YouTube API
    const videoRes = await axios.get("https://www.googleapis.com/youtube/v3/videos", {
      params: {
        part: "snippet",
        id: course_youtube_id,
        key: process.env.YOUTUBE_API_KEY,
      },
    });

    if (!videoRes.data.items || videoRes.data.items.length === 0) {
      return res.status(404).json({ message: "Invalid YouTube Video ID" });
    }

    const video = videoRes.data.items[0].snippet;
    const channelId = video.channelId;

    //Fetch channel details
    const channelRes = await axios.get("https://www.googleapis.com/youtube/v3/channels", {
      params: {
        part: "snippet",
        id: channelId,
        key: process.env.YOUTUBE_API_KEY,
      },
    });

    const channel = channelRes.data.items[0].snippet;

    //Prepare course data
    const result = {
      course_category,
      course_type,
      course_youtube_id,
      course_title: video.title,
      description: video.description,
      course_image: video.thumbnails.high.url,
      creator_name: channel.title,
      creator_image: channel.thumbnails.high.url,
      creator_youtube_link: `https://www.youtube.com/channel/${channelId}`,
    };

    //Cache the data
    ytCache.set(course_youtube_id, result);

    //Save to DB
    const savedCourse = await CourseYt.create(result);

    return res.status(201).json({ message: "Course added successfully", course: savedCourse });
  } catch (error) {
    console.error("YouTube API fetch error:", error.message);
    return res.status(500).json({
      message: "Failed to fetch YouTube data. You can enter course details manually.",
    });
  }
};

export { getAllUsers , getAllContacts , deleteContact ,getAllCourses , deleteUser, findOneUser ,updateOneUser , addNewCourse , updateCourse , deleteCourse , getOneCourse,fetchYoutubeCourseData };
