import Course from "../models/courseSchema.js";
import CourseYt from "../models/courseYtSchema.js";
import UserActivity from "../models/userActivitySchema.js";
import User from "../models/userSchema.js";

// Get all courses
const ytCourses = async(req,res)=>{
    try {
      const response = await CourseYt.find({});
      if(!response){
        return res.status(400).send(`fetching courses error : ${error}`);
      }
      res.status(200).json( {data:response});
    } catch (error) {
      res.status(400).send(`fetching courses error :  ${error}`);
    }
}
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
// Get courses by category
const getCoursesByCategory = async (req, res) => {
    try {
        const { courseCategory } = req.params;
        const lowerCategory = courseCategory.toLowerCase();  //converting to lowercase to match DB entries
        //console.log("Backend: Fetching courses for category ->", lowerCategory); //check category received
        const response = await Course.find({ course_category: lowerCategory });
        //console.log("Backend: Courses found ->", response.length); //check how many courses are returned
        return res.status(200).json({
            success: true,
            count: response.length,
            data: response
        });
    } catch (error) {
        console.error("Error fetching courses by category:", error);
        res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message
        });
    }
};

// Enroll in a course
const enrollCourse = async (req, res) => {
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
const downloadCourseSummary = async (req, res) => {
    try {
        const { videoId } = req.params;
        
        console.log("Fetching transcript for video:", videoId);
        
        // Call Python transcript service
        const response = await fetch(`http://localhost:5001/transcript/${videoId}`);
        
        if (!response.ok) {
            throw new Error(`Python service error: ${response.status}`);
        }

        // Get the PDF as buffer
        const pdfBuffer = await response.arrayBuffer();
        const buffer = Buffer.from(pdfBuffer);
        
        // Set headers for PDF download
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `attachment; filename="${videoId}_summary.pdf"`);
        res.setHeader('Content-Length', buffer.length);
        
        // Send the PDF buffer
        res.send(buffer);
        
    } catch (error) {
        console.error("Error downloading course summary:", error);
        res.status(500).json({ 
            error: "Server error", 
            details: error.message,
            videoId: req.params.videoId 
        });
    }
};

export { courses as default, enrollCourse, ytCourses, downloadCourseSummary,getCoursesByCategory };