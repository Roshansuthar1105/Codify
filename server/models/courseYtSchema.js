//C:\Users\Administrator\Codify\server\models\courseYtSchema.js
import mongoose from "mongoose";

const courseYtSchema = mongoose.Schema({
    course_category: {
    type: String,
    required: true,  //e.g., "Web Development"
  },
  course_type: {
    type: String,
    required: true, // e.g., "Beginner Friendly"
  },
  course_youtube_id: {
    type: String,
    required: true, // e.g., "dQw4w9WgXcQ"
  },
  //Auto-populated from here
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
const CourseYt = mongoose.model("CourseYt", courseYtSchema);
export default CourseYt;
