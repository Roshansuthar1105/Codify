import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../store/auth";
import { toast } from "react-toastify";
import { useLoading } from "../../components/loadingContext";
import { useTheme } from "../../context/ThemeContext";
import { FaArrowLeft, FaEye, FaEyeSlash, FaPlus, FaYoutube } from "react-icons/fa";
import { MdVideoLibrary } from "react-icons/md";
import { motion } from "framer-motion";
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

    // Animation variants matching Dashboard
    const backgroundVariants = {
        hidden: { opacity: 0, scale: 1.05 },
        visible: { 
            opacity: 1, 
            scale: 1,
            transition: {
                duration: 1,
                ease: "easeOut"
            }
        }
    };

    const headerVariants = {
        hidden: { opacity: 0, y: -20 },
        visible: { 
            opacity: 1, 
            y: 0,
            transition: {
                duration: 0.6,
                ease: "easeOut"
            }
        }
    };

    const cardVariants = {
        hidden: { 
            opacity: 0, 
            y: 30,
            scale: 0.95
        },
        visible: { 
            opacity: 1, 
            y: 0,
            scale: 1,
            transition: {
                duration: 0.5,
                ease: "easeOut"
            }
        },
        hover: {
            y: -4,
            scale: 1.02,
            transition: {
                duration: 0.2,
                ease: "easeInOut"
            }
        }
    };

    return (
        <div className={`relative min-h-screen-minus-nav overflow-hidden z-10 ${isDark ? 'bg-dark-bg-primary text-dark-text-primary' : 'bg-light-bg-primary text-light-text-primary'}`}>
            {/* Enhanced Background with gradient overlay - matching Dashboard */}
            <motion.div 
                variants={backgroundVariants}
                initial="hidden"
                animate="visible"
                className={`absolute top-0 left-0 w-full h-full -z-10 bg-[size:30px_30px] ${isDark ? 'bg-grid-pattern-dark' : 'bg-grid-pattern-light'}`}
            >
                <div className={`absolute inset-0 ${isDark ? 'bg-gradient-to-br from-dark-bg-primary/90 via-transparent to-dark-bg-primary/50' : 'bg-gradient-to-br from-light-bg-primary/90 via-transparent to-light-bg-primary/50'}`}></div>
            </motion.div>

            <div className="max-w-7xl mx-auto px-4 py-8">
                {/* Enhanced Header Section - matching Dashboard */}
                <motion.div 
                    variants={headerVariants}
                    initial="hidden"
                    animate="visible"
                    className="mb-12"
                >
                    {/* Breadcrumb */}
                    <div className="flex items-center gap-2 text-sm mb-6">
                        <motion.span
                            whileHover={{ scale: 1.05 }}
                            className={`cursor-pointer hover:text-primary transition-all duration-300 ${
                                isDark ? 'text-dark-text-secondary' : 'text-light-text-secondary'
                            }`}
                            onClick={() => navigate("/admin/courses")}
                        >
                            Courses
                        </motion.span>
                        <span className={isDark ? 'text-dark-text-secondary' : 'text-light-text-secondary'}>
                            /
                        </span>
                        <span className="text-primary font-medium">Add New Course</span>
                    </div>

                    {/* Main Header */}
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                        <div className="text-center md:text-left">
                            <h1 className={`text-3xl sm:text-4xl md:text-5xl font-righteous tracking-wider flex items-center gap-3 ${isDark ? 'text-dark-text-primary' : 'text-light-text-primary'}`}>
                                <motion.div
                                    whileHover={{ rotate: 360, scale: 1.1 }}
                                    transition={{ duration: 0.5 }}
                                >
                                    <MdVideoLibrary className="text-primary" />
                                </motion.div>
                                <span>Add New</span>
                                <span className="text-primary">Course</span>
                            </h1>
                            <motion.div 
                                initial={{ width: 0 }}
                                animate={{ width: "100%" }}
                                transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                                className={`h-1 rounded-full bg-gradient-to-r mt-3 ${isDark ? 'from-primary via-primary-dark to-primary' : 'from-primary via-primary-dark to-primary'}`}
                            ></motion.div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex items-center gap-3">
                            <motion.button
                                whileHover="hover"
                                whileTap={{ scale: 0.95 }}
                                variants={cardVariants}
                                onClick={() => navigate("/admin/courses")}
                                className={`group relative overflow-hidden flex items-center gap-2 px-4 py-3 rounded-xl transition-all duration-300 backdrop-blur-xl ${
                                    isDark
                                        ? 'bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-secondary-1000 text-dark-text-primary hover:shadow-lg'
                                        : 'bg-gradient-to-br from-blue-50 to-indigo-50 border border-light-border text-light-text-primary hover:shadow-lg hover:border-primary/50'
                                }`}
                            >
                                <FaArrowLeft className="transition-transform duration-300 group-hover:-translate-x-1" />
                                <span className="font-medium">Back to Courses</span>
                            </motion.button>

                            <motion.button
                                whileHover="hover"
                                whileTap={{ scale: 0.95 }}
                                variants={cardVariants}
                                onClick={() => setPreview(!preview)}
                                className={`group relative overflow-hidden flex items-center gap-2 px-4 py-3 rounded-xl transition-all duration-300 backdrop-blur-xl ${
                                    preview 
                                        ? 'bg-primary text-white shadow-lg' 
                                        : isDark
                                            ? 'bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-secondary-1000 text-dark-text-primary hover:shadow-lg'
                                            : 'bg-gradient-to-br from-blue-50 to-indigo-50 border border-light-border text-light-text-primary hover:shadow-lg hover:border-primary/50'
                                }`}
                            >
                                <motion.div
                                    animate={{ rotate: preview ? 180 : 0 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    {preview ? <FaEyeSlash /> : <FaEye />}
                                </motion.div>
                                <span className="font-medium">{preview ? "Hide Preview" : "Show Preview"}</span>
                            </motion.button>
                        </div>
                    </div>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Enhanced Form Section */}
                    <motion.div
                        variants={cardVariants}
                        initial="hidden"
                        animate="visible"
                        whileHover="hover"
                        className={`lg:col-span-2 relative overflow-hidden rounded-2xl shadow-lg bg-gradient-to-br backdrop-blur-xl transition-all duration-300 hover:shadow-2xl ${
                            isDark 
                                ? 'from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-secondary-1000' 
                                : 'from-blue-50 to-indigo-50 border border-light-border'
                        }`}
                    >
                        {/* Animated border on hover */}
                        <motion.div 
                            className="absolute top-0 right-0 w-0 h-full bg-primary rounded-r-2xl"
                            whileHover={{ 
                                width: "3px",
                                transition: { duration: 0.3, ease: "easeOut" }
                            }}
                        />
                        <motion.div 
                            className="absolute bottom-0 left-0 w-full h-0 bg-primary rounded-b-2xl"
                            whileHover={{ 
                                height: "3px",
                                transition: { duration: 0.3, ease: "easeOut", delay: 0.05 }
                            }}
                        />

                        <div className="p-6 lg:p-8">
                            {/* Form Header */}
                            <div className={`mb-6 pb-4 border-b border-dashed flex items-center gap-3 ${
                                isDark ? 'border-dark-border' : 'border-light-border'
                            }`}>
                                <motion.div
                                    whileHover={{ rotate: 180, scale: 1.1 }}
                                    transition={{ duration: 0.3 }}
                                    className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center"
                                >
                                    <FaPlus className="text-primary" />
                                </motion.div>
                                <h2 className={`text-xl lg:text-2xl font-righteous ${
                                    isDark ? 'text-dark-text-primary' : 'text-light-text-primary'
                                }`}>
                                    Course Information
                                </h2>
                            </div>

                            {/* YouTube Fetch Section */}
                            <motion.div 
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className={`mb-6 p-4 rounded-xl border-2 border-dashed ${
                                    isDark ? 'border-primary/30 bg-primary/5' : 'border-primary/30 bg-primary/5'
                                }`}
                            >
                                <div className="flex items-center gap-2 mb-3">
                                    <FaYoutube className="text-red-500 text-xl" />
                                    <h3 className={`font-medium ${isDark ? 'text-dark-text-primary' : 'text-light-text-primary'}`}>
                                        Auto-fill from YouTube
                                    </h3>
                                </div>
                                <p className={`text-sm mb-4 ${isDark ? 'text-dark-text-secondary' : 'text-light-text-secondary'}`}>
                                    Enter YouTube ID, Category, and Type, then click fetch to auto-populate course details.
                                </p>
                                <motion.button
                                    whileHover={{ scale: 1.05, y: -2 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={handleFetchFromYoutube}
                                    className="w-full sm:w-auto px-6 py-2.5 bg-primary hover:bg-primary-dark text-white rounded-xl transition-all duration-300 font-medium flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
                                >
                                    <FaYoutube />
                                    <span>Fetch from YouTube</span>
                                </motion.button>
                            </motion.div>

                            <CourseForm
                                handleSubmit={handleSubmit}
                                handleChange={handleChange}
                                handleFetchFromYoutube={handleFetchFromYoutube}
                                newCourse={newCourse}
                                isDark={isDark}
                            />
                        </div>
                    </motion.div>

                    {/* Enhanced Preview Section */}
                    <motion.div 
                        variants={cardVariants}
                        initial="hidden"
                        animate="visible"
                        className={`${preview ? 'block' : 'hidden lg:block'} lg:col-span-1`}
                    >
                        <motion.div 
                            whileHover="hover"
                            className={`sticky top-24 relative overflow-hidden rounded-2xl shadow-lg bg-gradient-to-br backdrop-blur-xl transition-all duration-300 hover:shadow-2xl ${
                                isDark 
                                    ? 'from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-secondary-1000' 
                                    : 'from-blue-50 to-indigo-50 border border-light-border'
                            }`}
                        >
                            {/* Animated border on hover */}
                            <motion.div 
                                className="absolute top-0 right-0 w-0 h-full bg-primary rounded-r-2xl"
                                whileHover={{ 
                                    width: "3px",
                                    transition: { duration: 0.3, ease: "easeOut" }
                                }}
                            />

                            <div className="p-6">
                                <div className={`mb-4 pb-4 border-b border-dashed flex items-center gap-3 ${
                                    isDark ? 'border-dark-border' : 'border-light-border'
                                }`}>
                                    <motion.div
                                        whileHover={{ rotate: 360, scale: 1.1 }}
                                        transition={{ duration: 0.5 }}
                                        className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center"
                                    >
                                        <FaEye className="text-primary" />
                                    </motion.div>
                                    <h3 className={`text-xl font-righteous ${
                                        isDark ? 'text-dark-text-primary' : 'text-light-text-primary'
                                    }`}>
                                        Live Preview
                                    </h3>
                                </div>

                                {Object.values(newCourse).some(value => value.trim() !== '') ? (
                                    <motion.div 
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ duration: 0.3 }}
                                        className="overflow-hidden rounded-xl"
                                    >
                                        <CardBody course={newCourse} />
                                    </motion.div>
                                ) : (
                                    <motion.div 
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className={`p-8 rounded-xl text-center ${
                                            isDark ? 'bg-dark-bg-primary/30 text-dark-text-secondary' : 'bg-light-bg-primary/30 text-light-text-secondary'
                                        }`}
                                    >
                                        <div className="flex flex-col items-center gap-4">
                                            <motion.div
                                                animate={{ 
                                                    scale: [1, 1.1, 1],
                                                    opacity: [0.3, 0.6, 0.3]
                                                }}
                                                transition={{ 
                                                    duration: 2,
                                                    repeat: Infinity,
                                                    ease: "easeInOut"
                                                }}
                                                className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center"
                                            >
                                                <FaEye className="text-4xl text-primary/50" />
                                            </motion.div>
                                            <div>
                                                <p className="font-medium mb-2">Preview will appear here</p>
                                                <p className="text-sm">Fill in the form to see a live preview of your course card</p>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}

export default AddNewCourse;
