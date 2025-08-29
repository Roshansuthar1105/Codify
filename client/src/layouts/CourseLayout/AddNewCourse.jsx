import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../store/auth";
import { toast } from "react-toastify";
import { useLoading } from "../../components/loadingContext";
import { useTheme } from "../../context/ThemeContext";
import { FaArrowLeft, FaEye, FaEyeSlash, FaPlus } from "react-icons/fa";
import { MdVideoLibrary } from "react-icons/md";
import CourseForm from "./CourseForm";
import CardBody from "../../components/CardBody";

const AddNewCourse = () => {
    const { API, authorizationToken } = useAuth();
    const { setIsLoading } = useLoading();
    const { theme } = useTheme();
    const isDark = theme === 'dark';
    const navigate = useNavigate();
    const [preview, setPreview] = useState(false);

    const [newCourse, setNewCourse] = useState({
        course_category: "",
        course_type: "",       
        course_youtube_id: "", // manual entry till here 
        creator_name: "",
        course_title: "",
        creator_image: "",
        course_image: "",
        creator_youtube_link: "",
        description: "",
    });

    const handleChange = (e) => {
        setNewCourse({ ...newCourse, [e.target.name]: e.target.value });
    }

    //Population of courses though Youtube API
    const handleFetchFromYoutube = async () => {
        if (!newCourse.course_youtube_id || !newCourse.course_category || !newCourse.course_type) {
            toast.error("Please enter YouTube ID, Course Category, and Course Type");
            return;
        }

        try {
            setIsLoading(true);
            const response = await fetch(`${API}/admin/courses/fetch-youtube`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: authorizationToken,
                },
                body: JSON.stringify({
                    course_youtube_id: newCourse.course_youtube_id,
                    course_category: newCourse.course_category,
                    course_type: newCourse.course_type
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(
                    errorData.message ||
                    "Failed to fetch YouTube data. You can fill the fields manually."
                );
            }

            const data = await response.json();
            const course = data.course || data; // Use correct object
            // Prefill form fields + store youtubeId in state
            setNewCourse((prev) => ({
                ...prev,
                course_title: course.course_title || "",
                description: course.description || "",
                course_image: course.course_image || "",
                creator_name: course.creator_name || "",
                creator_image: course.creator_image || "",
                creator_youtube_link: course.creator_youtube_link || "",
            }));

            toast.success("YouTube data fetched successfully!");
        } catch (error) {
            console.error("YouTube API fetch failed:", error);
            toast.error(
                error.message || "Failed to fetch YouTube data. Please enter manually."
            );
        } finally {
            setIsLoading(false);
        }
    };


    //Manual Update Fallback 
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setIsLoading(true);
            const response = await fetch(`${API}/admin/courses/add`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: authorizationToken
                },
                body: JSON.stringify(newCourse)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to add course');
            }
            
            const data = await response.json();

            // Reset form
            setNewCourse({
                course_category: "",
                course_type: "",
                course_youtube_id: "",  //enter all manually
                creator_name: "",
                course_title: "",
                creator_image: "",
                course_image: "",
                creator_youtube_link: "",
                description: "",
            });

            toast.success('Course added successfully!');
            navigate('/admin/courses');

        } catch (error) {
            console.error('Error adding course:', error);
            toast.error(error.message || 'Failed to add course. Please try again.');
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="p-6">
            {/* Header with breadcrumb */}
            <div className="mb-8">
                <div className="flex items-center gap-2 text-sm mb-2">
                    <span
                        className={`cursor-pointer hover:text-primary ${
                            isDark ? 'text-dark-text-secondary' : 'text-light-text-secondary'
                        }`}
                        onClick={() => navigate("/admin/courses")}
                    >
                        Courses
                    </span>
                    <span className={isDark ? 'text-dark-text-secondary' : 'text-light-text-secondary'}>
                        /
                    </span>
                    <span className="text-primary">Add New Course</span>
                </div>

                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <h2 className="text-2xl font-righteous flex items-center gap-2">
                        <MdVideoLibrary className="text-primary" />
                        <span className={isDark ? 'text-dark-text-primary' : 'text-light-text-primary'}>
                            Add New
                        </span>
                        <span className="text-primary">Course</span>
                    </h2>

                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => navigate("/admin/courses")}
                            className={`
                                flex items-center gap-2 px-4 py-2 rounded-lg transition-colors
                                ${isDark
                                    ? 'bg-dark-bg-tertiary hover:bg-primary/20 text-dark-text-primary'
                                    : 'bg-light-bg-tertiary hover:bg-primary/20 text-light-text-primary'
                                }
                            `}
                        >
                            <FaArrowLeft />
                            <span>Back to Courses</span>
                        </button>

                        <button
                            onClick={() => setPreview(!preview)}
                            className={`
                                flex items-center gap-2 px-4 py-2 rounded-lg transition-colors
                                ${isDark
                                    ? 'bg-dark-bg-tertiary hover:bg-primary/20 text-dark-text-primary'
                                    : 'bg-light-bg-tertiary hover:bg-primary/20 text-light-text-primary'
                                }
                            `}
                        >
                            {preview ? <FaEyeSlash /> : <FaEye />}
                            <span>{preview ? "Hide Preview" : "Show Preview"}</span>
                        </button>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Form */}
                {/* <div className={`lg:col-span-2 p-6 rounded-xl shadow-lg ${
                    isDark ? 'bg-dark-bg-secondary border border-dark-border' : 'bg-light-bg-secondary border border-light-border'
                }`}>
                    <div className={`mb-4 pb-4 border-b border-dashed flex items-center gap-2 ${
                        isDark ? 'border-dark-border' : 'border-light-border'
                    }`}>
                        <FaPlus className="text-primary" />
                        <h3 className={`text-xl font-medium ${
                            isDark ? 'text-dark-text-primary' : 'text-light-text-primary'
                        }`}>
                            Course Information
                        </h3>
                    </div>

                    <CourseForm
                        handleSubmit={handleSubmit}
                        handleChange={handleChange}
                        newCourse={newCourse}
                        isDark={isDark}
                    />
                </div> */}
                <div
          className={`lg:col-span-2 p-6 rounded-xl shadow-lg ${
            isDark ? "bg-dark-bg-secondary border border-dark-border" : "bg-light-bg-secondary border border-light-border"
          }`}
        >

          <CourseForm
            handleSubmit={handleSubmit}
            handleChange={handleChange}
            handleFetchFromYoutube={handleFetchFromYoutube}
            newCourse={newCourse}
            isDark={isDark}
          />
        </div>

                {/* Preview */}
                <div className={`${preview ? 'block' : 'hidden lg:block'} lg:col-span-1`}>
                    <div className={`sticky top-24 p-6 rounded-xl shadow-lg ${
                        isDark ? 'bg-dark-bg-secondary border border-dark-border' : 'bg-light-bg-secondary border border-light-border'
                    }`}>
                        <div className={`mb-4 pb-4 border-b border-dashed flex items-center gap-2 ${
                            isDark ? 'border-dark-border' : 'border-light-border'
                        }`}>
                            <FaEye className="text-primary" />
                            <h3 className={`text-xl font-medium ${
                                isDark ? 'text-dark-text-primary' : 'text-light-text-primary'
                            }`}>
                                Preview
                            </h3>
                        </div>

                        {Object.values(newCourse).some(value => value.trim() !== '') ? (
                            <div className="overflow-hidden rounded-lg">
                                <CardBody course={newCourse} />
                            </div>
                        ) : (
                            <div className={`p-6 rounded-lg text-center ${
                                isDark ? 'bg-dark-bg-tertiary text-dark-text-secondary' : 'bg-light-bg-tertiary text-light-text-secondary'
                            }`}>
                                <div className="flex flex-col items-center gap-3">
                                    <FaEye className="text-4xl opacity-30" />
                                    <p>Fill in the form to see a preview of your course</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddNewCourse;
