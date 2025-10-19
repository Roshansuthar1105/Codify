import mongoose from "mongoose";

const courseSchema = mongoose.Schema({
  course_category: {
    type: String,
    required: true,
    lowercase: true, //to avoid case sensitivity issues while filter search, saving all categories in lowercase
  },
  course_title: {
    type: String,
    required: true,
  },
  creator_name: {
    type: String,
    required: true,
  },
  creator_youtube_link: {
    type: String,
    required: true,
  },
  creator_image: {
    type: String,
    required: true,
  },
  course_image: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});
const Course = mongoose.model("Course", courseSchema);
export default Course;
