import Course from "../models/courseSchema.js";
import UserActivity from "../models/userActivitySchema.js";
import User from "../models/userSchema.js";

// Get all courses
const courses = async(req,res)=>{
    try {
      const response = await Course.find({});
      if(!response){
        return res.status(400).send(`fetching courses error : ${error}`);
      }
      res.status(200).json( {data:response});
    } catch (error) {
      res.status(400).send(`fetching courses error :  ${error}`);
    }
}

// Enroll in a course
export const enrollCourse = async (req, res) => {
    try {
        const { courseId } = req.body;
        const userId = req.user.id;

        // Check if course exists
        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({ error: "Course not found" });
        }

        // Add course to user's enrolled courses (assuming this field exists in user schema)
        await User.findByIdAndUpdate(userId, {
            $addToSet: { enrolledCourses: courseId }
        });

        // Create activity record
        const activity = new UserActivity({
            userId,
            courseId,
            activityType: 'course_enrolled',
            details: {
                courseName: course.title,
                enrollmentDate: new Date()
            }
        });
        await activity.save();

        res.status(200).json({ 
            message: "Successfully enrolled in course",
            activity 
        });
    } catch (error) {
        console.error("Error enrolling in course:", error);
        res.status(500).json({ error: "Server error" });
    }
};

export { courses as default, enrollCourse };