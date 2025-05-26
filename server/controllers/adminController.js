import Course from "../models/courseSchema.js";
import Feedback from "../models/feedbackSchema.js";
import User from "../models/userSchema.js";

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({},{password:0});
    if (!users || users.length === 0) {
      return res.status(404).json({ message: "no User found " });
    }
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
    return res.status(200).json(contacts);
  } catch (error) {
    next(error);
  }
};
const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find();
    if (!courses || courses.length === 0) {
      return res.status(404).json({ message: "no course found " });
    }
    return res.status(200).json(courses);
  } catch (error) {
    next(error);
  }
};
const getOneCourse = async (req,res)=>{
  try {
    const id = req.params.id;
    const course = await Course.findOne({_id:id});
    return res.status(200).json(course);
  } catch (error) {
    next(error);
  }
}
const addNewCourse = async (req,res, next)=>{
  try {
    const courseData = { ...req.body };

    // If youtube_id is provided directly, use it
    if (courseData.youtube_id && courseData.youtube_content_type) {
      // Already have the required fields
    }
    // If only creator_youtube_link is provided, extract the ID
    else if (courseData.creator_youtube_link) {
      // The pre-save middleware in the Course model will handle extraction
    }
    // If neither is provided, return an error
    else {
      return res.status(400).json({
        message: "Either youtube_id and youtube_content_type OR creator_youtube_link must be provided"
      });
    }

    const newCourse = await Course.create(courseData);
    return res.status(200).json({
      message: "Course added successfully",
      course: newCourse
    });
  } catch (error) {
    next(error);
  }
}
const updateCourse = async (req,res, next)=>{
  try {
    const id = req.params.id;

    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ message: "Request body is empty" });
    }

    const courseData = { ...req.body };

    // If updating YouTube content
    if (courseData.creator_youtube_link && !courseData.youtube_id) {
      // Get the existing course
      const existingCourse = await Course.findById(id);
      if (!existingCourse) {
        return res.status(404).json({ message: "Course not found" });
      }

      // Extract YouTube info from the new link
      const url = courseData.creator_youtube_link;

      // Extract playlist ID
      const playlistMatch = url.match(/^.*(youtu.be\/|list=)([^#\&\?]*).*/);
      if (playlistMatch && playlistMatch[2]) {
        courseData.youtube_id = playlistMatch[2];
        courseData.youtube_content_type = 'playlist';
      }
      // Extract video ID
      else {
        const videoMatch = url.match(/^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#\&\?]*).*/);
        if (videoMatch && videoMatch[2].length === 11) {
          courseData.youtube_id = videoMatch[2];
          courseData.youtube_content_type = 'video';
        }
        // Extract channel ID or handle
        else {
          const channelMatch = url.match(/^.*(youtube.com\/channel\/)([^#\&\?]*).*/);
          if (channelMatch && channelMatch[2]) {
            courseData.youtube_id = channelMatch[2];
            courseData.youtube_content_type = 'channel';
          } else {
            const handleMatch = url.match(/^.*(youtube.com\/@)([^#\&\?\/]*).*/);
            if (handleMatch && handleMatch[2]) {
              courseData.youtube_id = handleMatch[2];
              courseData.youtube_content_type = 'channel';
            }
          }
        }
      }
    }

    const updatedCourse = await Course.findByIdAndUpdate(
      id,
      courseData,
      { new: true, runValidators: true }
    );

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
export { getAllUsers , getAllContacts , deleteContact ,getAllCourses , deleteUser, findOneUser ,updateOneUser , addNewCourse , updateCourse , deleteCourse , getOneCourse };
