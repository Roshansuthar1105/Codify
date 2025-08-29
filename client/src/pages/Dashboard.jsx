import React, { useState, useEffect, lazy, Suspense, useMemo, useCallback } from 'react';
import { useAuth } from '../store/auth';
import { useTheme } from '../context/ThemeContext';
import { FaBookmark, FaGraduationCap, FaChartLine, FaClock, FaPlay, FaStar } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { motion } from "framer-motion";

// Lazy loaded components
const CardBody = lazy(() => import('../components/CardBody'));
const CourseModules = lazy(() => import('../components/CourseModules'));
const UserActivity = lazy(() => import('../components/UserActivity'));
const ContinueWatching = lazy(() => import('../components/ContinueWatching'));

function Dashboard() {
  const { userdata, API } = useAuth();
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [bookmarks, setBookmarks] = useState([]);
  const [watchlist, setWatchlist] = useState([]);
  // Stats for user dashboard with proper tracking
  const [stats, setStats] = useState({
    coursesInProgress: 0,
    coursesCompleted: 0,
    totalHoursLearned: 0,
    lastActive: new Date().toISOString(),
    savedCourses: 0
  });
  const [activities, setActivities] = useState([]);
  const [courseProgress, setCourseProgress] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [selectedCourseProgress, setSelectedCourseProgress] = useState(null);
  const [continueWatchingCourses, setContinueWatchingCourses] = useState([]);
  const token = localStorage.getItem('token');

  const fetchBookmarks = useCallback(async () => {
    try {
      const response = await fetch(`${API}/api/v1/bookmarks`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      });

      if (response.ok) {
        const data = await response.json();
        setBookmarks(data.data || []);
      } else {
        console.error('Failed to fetch bookmarks:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('Error fetching bookmarks:', error);
    }
  }, [API, token]);


  // Fetch user's watchlist (Saved Courses) - memoized to prevent unnecessary re-renders
  const fetchWatchlist = useCallback(async () => {
    try {
      //console.log('Fetching user watchlist...');
      const response = await fetch(`${API}/user/watchlist`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      });

      if (response.ok) {
        const data = await response.json();
        //console.log('Watchlist data:', data);
        setWatchlist(data.watchlist || []);

        // Update saved courses count in stats
        setStats(prevStats => ({
          ...prevStats,
          savedCourses: data.watchlist ? data.watchlist.length : 0
        }));
      } else {
        console.error('Failed to fetch watchlist:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('Error fetching watchlist:', error);
    }
  }, [API, token]);

  // Fetch user's progress data for Continue Watching and stats - memoized to prevent unnecessary re-renders
  const fetchUserProgress = useCallback(async () => {
    try {
      //console.log('Fetching user progress data...');
      const response = await fetch(`${API}/progress`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      });

      if (response.ok) {
        const data = await response.json();
        //console.log('Progress data:', data);

        // Filter out any invalid progress entries
        const validProgress = data.progress ? data.progress.filter(
          course => course.courseId && typeof course.courseId === 'object'
        ) : [];

        setCourseProgress(validProgress);

        // Calculate stats based on progress
        let inProgress = 0;
        let completed = 0;
        let totalHours = 0;

        // Filter courses in progress for "Continue Watching" section
        const inProgressCourses = [];

        validProgress.forEach(course => {
          // Ensure we have valid data
          if (!course.courseId || typeof course.courseId !== 'object') {
            console.warn('Invalid course progress entry:', course);
            return;
          }

          if (course.status === 'in-progress') {
            inProgress++;
            // Add to continue watching
            inProgressCourses.push({
              ...course,
              lastWatched: course.lastAccessedAt || course.updatedAt,
              progress: course.progress || 0
            });
          } else if (course.status === 'completed') {
            completed++;
          }

          // Add up total learning hours
          totalHours += course.totalHoursSpent || 0;
        });

        // Sort by last accessed (most recent first)
        inProgressCourses.sort((a, b) => {
          const dateA = new Date(a.lastWatched || 0);
          const dateB = new Date(b.lastWatched || 0);
          return dateB - dateA;
        });

        //console.log('Continue watching courses:', inProgressCourses);
        setContinueWatchingCourses(inProgressCourses);

        // Update stats with real data
        setStats(prev => ({
          ...prev,
          coursesInProgress: inProgress,
          coursesCompleted: completed,
          totalHoursLearned: Math.round(totalHours)
        }));

        // If there's at least one course in progress, select it for the dashboard
        if (inProgressCourses.length > 0) {
          setSelectedCourse(inProgressCourses[0].courseId);
          setSelectedCourseProgress(inProgressCourses[0]);
        } else if (validProgress.length > 0) {
          // Otherwise, select the first course with progress
          const firstCourse = validProgress[0].courseId;
          setSelectedCourse(firstCourse);
          setSelectedCourseProgress(validProgress[0]);
        }
      } else {
        console.error('Failed to fetch progress:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('Error fetching user progress:', error);
    }
  }, [API, token]);

  // Fetch user's activity for the activity feed - memoized to prevent unnecessary re-renders
  const fetchUserActivity = useCallback(async () => {
    try {
      //console.log('Fetching user activity data...');
      const response = await fetch(`${API}/activity`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      });

      if (response.ok) {
        const data = await response.json();
        //console.log('Activity data:', data);

        // Ensure we have valid activity data
        const validActivities = data.activities ? data.activities.filter(
          activity => activity && activity.timestamp
        ) : [];

        setActivities(validActivities);

        // Update last active date from the most recent activity
        if (validActivities.length > 0) {
          // Sort activities by timestamp (newest first)
          validActivities.sort((a, b) => {
            const dateA = new Date(a.timestamp || 0);
            const dateB = new Date(b.timestamp || 0);
            return dateB - dateA;
          });

          setStats(prev => ({
            ...prev,
            lastActive: validActivities[0].timestamp
          }));
        }
      } else {
        console.error('Failed to fetch activity:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('Error fetching user activity:', error);
    }
  }, [API, token]);

  // Handle course selection and track the activity - memoized to prevent unnecessary re-renders
  const handleCourseSelect = useCallback(async (course) => {
    //console.log('Course selected:', course);
    setSelectedCourse(course);

    // Find progress for this course
    const progress = courseProgress.find(p => p.courseId._id === course._id);
    setSelectedCourseProgress(progress || null);

    // Track this course selection in user activity
    if (userdata?._id && token) {
      try {
        //console.log('Tracking course selection activity');
        const response = await fetch(`${API}/activity/add`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({
            courseId: course._id,
            activityType: 'course_select',
            details: {
              courseTitle: course.course_title,
              action: 'Selected from dashboard'
            }
          })
        });

        if (response.ok) {
          //console.log('Activity tracked successfully');
          // Refresh activity data
          fetchUserActivity();
        }
      } catch (error) {
        console.error('Error tracking course selection:', error);
      }
    }
  }, [courseProgress, userdata, token, API, fetchUserActivity]);

  // Handle progress update and store in database - memoized to prevent unnecessary re-renders
  const handleProgressUpdate = useCallback(async (updatedProgress) => {
    //console.log('Progress update received:', updatedProgress);

    // First, update the local state
    setCourseProgress(prev => {
      // Find the course to update or add it if it doesn't exist
      const exists = prev.some(p => p._id === updatedProgress._id);
      const newProgress = exists
        ? prev.map(p => p._id === updatedProgress._id ? updatedProgress : p)
        : [...prev, updatedProgress];

      // Update continue watching courses
      const updatedContinueWatching = newProgress
        .filter(course => course.status === 'in-progress' && course.courseId)
        .map(course => ({
          ...course,
          lastWatched: course.lastAccessedAt || course.updatedAt,
          progress: course.progress || 0
        }))
        .sort((a, b) => {
          const dateA = new Date(a.lastWatched || 0);
          const dateB = new Date(b.lastWatched || 0);
          return dateB - dateA;
        });

      setContinueWatchingCourses(updatedContinueWatching);

      // Update stats based on new progress data
      let inProgress = 0;
      let completed = 0;
      let totalHours = 0;

      newProgress.forEach(course => {
        if (course.status === 'in-progress') {
          inProgress++;
        } else if (course.status === 'completed') {
          completed++;
        }
        totalHours += course.totalHoursSpent || 0;
      });

      setStats(prev => ({
        ...prev,
        coursesInProgress: inProgress,
        coursesCompleted: completed,
        totalHoursLearned: Math.round(totalHours)
      }));

      return newProgress;
    });

    // Update selected course progress if it's the current course
    if (selectedCourseProgress && selectedCourseProgress._id === updatedProgress._id) {
      setSelectedCourseProgress(updatedProgress);
    }

    // Save the progress to the database
    if (updatedProgress.courseId && token) {
      try {
        //console.log('Saving progress to database...');
        const courseId = typeof updatedProgress.courseId === 'object'
          ? updatedProgress.courseId._id
          : updatedProgress.courseId;

        const response = await fetch(`${API}/progress/${courseId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({
            progress: updatedProgress.progress || 0,
            currentVideoTime: updatedProgress.currentVideoTime || 0,
            totalHoursSpent: updatedProgress.totalHoursSpent || 0,
            status: updatedProgress.status || 'in-progress'
          })
        });

        if (response.ok) {
          //console.log('Progress saved successfully');
          // Refresh activity data
          fetchUserActivity();
        } else {
          console.error('Failed to save progress:', response.status, response.statusText);
        }
      } catch (error) {
        console.error('Error saving progress:', error);
      }
    }
  }, [selectedCourseProgress, token, API, fetchUserActivity]);

  useEffect(() => {
    fetchBookmarks();
    fetchWatchlist();
    fetchUserProgress();
    fetchUserActivity();
  }, [fetchBookmarks,fetchWatchlist, fetchUserProgress, fetchUserActivity]);

  // Handle watchlist update in CardBody and track the activity - memoized to prevent unnecessary re-renders
  const updateWatchlist = useCallback(async (course, action) => {
    //console.log(`Watchlist update: ${action} course ${course?._id}`);

    // Refresh watchlist data
    await fetchWatchlist();

    // Track this watchlist action in user activity
    if (userdata?._id && token && course) {
      try {
        //console.log('Tracking watchlist activity');
        const response = await fetch(`${API}/activity/add`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({
            courseId: course._id,
            activityType: 'watchlist_update',
            details: {
              courseTitle: course.course_title,
              action: action || 'updated'
            }
          })
        });

        if (response.ok) {
          //console.log('Watchlist activity tracked successfully');
          // Refresh activity data
          fetchUserActivity();
        }
      } catch (error) {
        console.error('Error tracking watchlist activity:', error);
      }
    } else {
      // Just refresh activity data
      fetchUserActivity();
    }
  }, [userdata, token, API, fetchWatchlist, fetchUserActivity]);

  // Animation variants - matching Roadmaps
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.3
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
      y: -8,
      scale: 1.02,
      transition: {
        duration: 0.2,
        ease: "easeInOut"
      }
    }
  };

  const buttonVariants = {
    initial: { scale: 1 },
    hover: { 
      scale: 1.05,
      transition: {
        duration: 0.2,
        ease: "easeInOut"
      }
    },
    tap: { 
      scale: 0.98,
      transition: {
        duration: 0.1
      }
    }
  };

return (
    <div className={`relative min-h-screen-minus-nav overflow-hidden z-10 ${isDark ? 'bg-dark-bg-primary text-dark-text-primary' : 'bg-light-bg-primary text-light-text-primary'}`}>
      {/* Enhanced Background with gradient overlay - matching Roadmaps */}
      <motion.div 
        variants={backgroundVariants}
        initial="hidden"
        animate="visible"
        className={`absolute top-0 left-0 w-full h-full -z-10 bg-[size:30px_30px] ${isDark ? 'bg-grid-pattern-dark' : 'bg-grid-pattern-light'}`}
      >
        <div className={`absolute inset-0 ${isDark ? 'bg-gradient-to-br from-dark-bg-primary/90 via-transparent to-dark-bg-primary/50' : 'bg-gradient-to-br from-light-bg-primary/90 via-transparent to-light-bg-primary/50'}`}></div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 py-12 md:py-16 lg:py-20">
        {/* Enhanced Header Section - matching Roadmaps */}
        <motion.div 
          variants={headerVariants}
          initial="hidden"
          animate="visible"
          className="text-center mb-12"
        >
          <div className="inline-block">
            <h1 className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-righteous tracking-wider mb-4 ${isDark ? 'text-dark-text-primary' : 'text-light-text-primary'}`}>
              Learning Dashboard
            </h1>
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
              className={`h-1 rounded-full bg-gradient-to-r ${isDark ? 'from-primary via-primary-dark to-primary' : 'from-primary via-primary-dark to-primary'}`}
            ></motion.div>
          </div>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className={`mt-6 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed ${isDark ? 'text-dark-text-secondary' : 'text-light-text-secondary'}`}
          >
            Welcome back, <span className="text-primary font-semibold">{userdata ? userdata.username : "Learner"}</span>! Track your progress and continue your learning journey.
          </motion.p>
        </motion.div>

        {/* Enhanced Stats Cards - matching Roadmaps card style */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
        >
          {[
            {
              icon: FaBookmark,
              label: "Saved Courses",
              value: stats.savedCourses,
              color: "text-blue-500",
              bgColor: "bg-blue-500/10"
            },
            {
              icon: FaGraduationCap,
              label: "Completed",
              value: stats.coursesCompleted,
              color: "text-green-500",
              bgColor: "bg-green-500/10"
            },
            {
              icon: FaChartLine,
              label: "In Progress",
              value: stats.coursesInProgress,
              color: "text-orange-500",
              bgColor: "bg-orange-500/10"
            },
            {
              icon: FaClock,
              label: "Hours Learned",
              value: stats.totalHoursLearned,
              color: "text-purple-500",
              bgColor: "bg-purple-500/10"
            }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              variants={cardVariants}
              whileHover="hover"
              className={`group relative p-6 lg:p-8 rounded-2xl shadow-lg flex items-center bg-gradient-to-br transition-all duration-300 overflow-hidden ${
                isDark 
                  ? 'from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-secondary-1000 backdrop-blur-xl' 
                  : 'from-blue-50 to-indigo-50 border border-light-border hover:border-primary/50'
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

              <motion.div 
                className={`w-12 h-12 sm:w-16 sm:h-16 rounded-xl ${stat.bgColor} flex items-center justify-center mr-4`}
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                <stat.icon className={`${stat.color} text-xl sm:text-2xl`} />
              </motion.div>
              
              <div>
                <p className={`text-sm ${isDark ? 'text-dark-text-secondary' : 'text-light-text-secondary'}`}>
                  {stat.label}
                </p>
                <h3 className={`text-2xl sm:text-3xl font-bold ${isDark ? 'text-dark-text-primary' : 'text-light-text-primary'} group-hover:text-primary transition-colors duration-300`}>
                  {stat.value}
                </h3>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Main Dashboard Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Current Course & Modules */}
          <div className="lg:col-span-2 space-y-8">
            {/* Current Course Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <div className="mb-6 flex justify-between items-center">
                <h2 className={`text-2xl sm:text-3xl font-righteous tracking-wide ${isDark ? 'text-dark-text-primary' : 'text-light-text-primary'}`}>
                  Continue Learning
                </h2>
              </div>

              {selectedCourse ? (
                <div className="space-y-6">
                  <motion.div 
                    whileHover={{ y: -4 }}
                    transition={{ duration: 0.3 }}
                    className={`relative p-6 lg:p-8 rounded-2xl shadow-lg bg-gradient-to-br backdrop-blur-xl transition-all duration-300 hover:shadow-2xl overflow-hidden ${
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

                    <div className="flex items-center justify-between mb-6">
                      <h3 className={`text-xl lg:text-2xl font-semibold ${isDark ? 'text-dark-text-primary' : 'text-light-text-primary'} group-hover:text-primary transition-colors duration-300`}>
                        {selectedCourse.course_title}
                      </h3>
                      <motion.div
                        variants={buttonVariants}
                        initial="initial"
                        whileHover="hover"
                        whileTap="tap"
                      >
                        <Link
                          to={`/courses/${selectedCourse._id}`}
                          className="py-3 px-6 bg-primary hover:bg-primary-dark text-white rounded-xl transition-colors text-sm flex items-center font-semibold"
                        >
                          <FaPlay className="mr-2" /> Continue Watching
                        </Link>
                      </motion.div>
                    </div>

                    <div className="flex items-center mb-4">
                      <img
                        src={selectedCourse.course_image || 'https://via.placeholder.com/150'}
                        alt={selectedCourse.course_title}
                        className="w-20 h-20 object-cover rounded-xl mr-4 shadow-md"
                      />
                      <div className="flex-1">
                        <p className={`text-sm ${isDark ? 'text-dark-text-secondary' : 'text-light-text-secondary'} mb-1`}>
                          By {selectedCourse.creator_name}
                        </p>
                        {selectedCourseProgress && (
                          <div className="mt-2">
                            <div className="flex justify-between items-center text-xs mb-2">
                              <span className={`${isDark ? 'text-dark-text-secondary' : 'text-light-text-secondary'}`}>
                                {selectedCourseProgress.progress || 0}% complete
                              </span>
                              <span className="flex items-center text-primary">
                                <FaClock className="mr-1" />
                                {Math.round(selectedCourseProgress.totalHoursSpent || 0)}h
                              </span>
                            </div>
                            <div className={`w-full rounded-full h-2 ${isDark ? 'bg-gray-700' : 'bg-gray-200'}`}>
                              <div
                                className="bg-primary h-2 rounded-full transition-all duration-300"
                                style={{ width: `${selectedCourseProgress.progress || 0}%` }}
                              ></div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>

                  <Suspense fallback={
                    <div className="flex items-center justify-center h-40">
                      <motion.div
                        animate={{ rotate: 360 }} 
                        transition={{ repeat: Infinity, duration: 1, ease: "linear" }} 
                        className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full"
                      />
                    </div>
                  }>
                    <CourseModules
                      courseId={selectedCourse._id}
                      progress={selectedCourseProgress}
                      onModuleComplete={handleProgressUpdate}
                    />
                  </Suspense>
                </div>
              ) : (
                <motion.div 
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.3 }}
                  className={`relative p-12 rounded-2xl shadow-lg bg-gradient-to-br backdrop-blur-xl text-center transition-all duration-300 hover:shadow-2xl overflow-hidden ${
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

                  <motion.div 
                    className={`w-20 h-20 mx-auto mb-6 rounded-xl flex items-center justify-center ${isDark ? 'bg-dark-bg-primary' : 'bg-light-bg-primary'}`}
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    <FaGraduationCap className="text-primary text-3xl" />
                  </motion.div>
                  <h3 className={`text-xl font-semibold mb-3 ${isDark ? 'text-dark-text-primary' : 'text-light-text-primary'}`}>
                    No courses in progress
                  </h3>
                  <p className={`mb-6 ${isDark ? 'text-dark-text-secondary' : 'text-light-text-secondary'}`}>
                    Start learning by adding courses to your watchlist.
                  </p>
                  <motion.div
                    variants={buttonVariants}
                    initial="initial"
                    whileHover="hover"
                    whileTap="tap"
                  >
                    <Link
                      to="/courses"
                      className="py-3 px-6 bg-primary hover:bg-primary-dark text-white rounded-xl transition-colors font-semibold"
                    >
                      Explore Courses
                    </Link>
                  </motion.div>
                </motion.div>
              )}
            </motion.div>

            {/* Watchlist Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0 }}
            >
              <div className="mb-6 flex justify-between items-center">
                <h2 className={`text-2xl sm:text-3xl font-righteous tracking-wide ${isDark ? 'text-dark-text-primary' : 'text-light-text-primary'}`}>
                  Your Watchlist
                </h2>
                <Link
                  to="/courses"
                  className="text-primary hover:text-primary-dark transition-colors font-medium"
                >
                  Browse more courses
                </Link>
              </div>

              {watchlist.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {watchlist.map(course => (
                    <div key={course._id}>
                      <Suspense fallback={
                        <div className="flex items-center justify-center h-40">
                          <motion.div
                            animate={{ rotate: 360 }} 
                            transition={{ repeat: Infinity, duration: 1, ease: "linear" }} 
                            className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full"
                          />
                        </div>
                      }>
                        <CardBody
                          course={course}
                          watchlist={watchlist}
                          updateWatchlist={updateWatchlist}
                          onClick={handleCourseSelect}
                        />
                      </Suspense>
                    </div>
                  ))}
                </div>
              ) : (
                <motion.div 
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.3 }}
                  className={`relative p-8 lg:p-12 rounded-2xl shadow-lg bg-gradient-to-br backdrop-blur-xl text-center transition-all duration-300 hover:shadow-2xl overflow-hidden ${
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

                  <motion.div 
                    className={`w-16 h-16 mx-auto mb-4 rounded-xl flex items-center justify-center ${isDark ? 'bg-dark-bg-primary' : 'bg-light-bg-primary'}`}
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    <FaBookmark className="text-primary text-xl" />
                  </motion.div>
                  <h3 className={`text-lg font-semibold mb-2 ${isDark ? 'text-dark-text-primary' : 'text-light-text-primary'}`}>
                    Your watchlist is empty
                  </h3>
                  <p className={`mb-4 ${isDark ? 'text-dark-text-secondary' : 'text-light-text-secondary'}`}>
                    Save courses to watch later and track your learning progress.
                  </p>
                  <motion.div
                    variants={buttonVariants}
                    initial="initial"
                    whileHover="hover"
                    whileTap="tap"
                  >
                    <Link
                      to="/courses"
                      className="py-2 px-4 bg-primary hover:bg-primary-dark text-white rounded-xl transition-colors text-sm font-semibold"
                    >
                      Explore Courses
                    </Link>
                  </motion.div>
                </motion.div>
              )}
            </motion.div>

            {/* Bookmarks Section */}
<motion.section 
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 1.2 }}
  className="mt-16"
>
  <div className="mb-8 flex justify-between items-center">
    <h2 className={`text-2xl sm:text-3xl font-righteous tracking-wide ${isDark ? 'text-dark-text-primary' : 'text-light-text-primary'}`}>
      Your Bookmarks
    </h2>
    {bookmarks.length > 0 && (
      <Link
        to="/bookmarks"
        className="text-primary hover:text-primary-dark transition-colors font-medium"
      >
        View All
      </Link>
    )}
  </div>

  {bookmarks.length > 0 ? (
    <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide">
      {bookmarks.map((item, idx) => (
        <motion.div
          key={idx}
          whileHover={{ y: -6, scale: 1.02 }}
          transition={{ duration: 0.3 }}
          className={`relative p-6 w-[280px] rounded-2xl shadow-lg bg-gradient-to-br backdrop-blur-xl transition-all duration-300 hover:shadow-2xl overflow-hidden flex-shrink-0 ${
            isDark 
              ? 'from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-secondary-1000' 
              : 'from-blue-50 to-indigo-50 border border-light-border'
          }`}
        >
          <div className="flex items-center justify-between mb-4">
            <span className="text-3xl">{item.icon || "📌"}</span>
            <FaBookmark className="text-primary" />
          </div>
          <h3 className={`text-xl font-semibold mb-2 ${isDark ? 'text-dark-text-primary' : 'text-light-text-primary'} group-hover:text-primary transition-colors duration-300`}>
            {item.name}
          </h3>
          <p className={`text-sm mb-6 capitalize ${isDark ? 'text-dark-text-secondary' : 'text-light-text-secondary'}`}>
            {item.type} roadmap
          </p>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <a
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block py-2 px-4 bg-primary hover:bg-primary-dark text-white rounded-xl transition-colors text-sm font-semibold"
            >
              Explore
            </a>
          </motion.div>
        </motion.div>
      ))}
    </div>
  ) : (
    <motion.div 
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3 }}
      className={`relative p-8 lg:p-12 rounded-2xl shadow-lg bg-gradient-to-br backdrop-blur-xl text-center transition-all duration-300 hover:shadow-2xl overflow-hidden ${
        isDark 
          ? 'from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-secondary-1000' 
          : 'from-blue-50 to-indigo-50 border border-light-border'
      }`}
    >
      <motion.div 
        className={`w-16 h-16 mx-auto mb-4 rounded-xl flex items-center justify-center ${isDark ? 'bg-dark-bg-primary' : 'bg-light-bg-primary'}`}
        whileHover={{ rotate: 360 }}
        transition={{ duration: 0.5 }}
      >
        <FaBookmark className="text-primary text-xl" />
      </motion.div>
      <h3 className={`text-lg font-semibold mb-2 ${isDark ? 'text-dark-text-primary' : 'text-light-text-primary'}`}>
        No bookmarks yet
      </h3>
      <p className={`mb-4 ${isDark ? 'text-dark-text-secondary' : 'text-light-text-secondary'}`}>
        Save your favorite roadmaps here for quick access.
      </p>
      <motion.div
        variants={buttonVariants}
        initial="initial"
        whileHover="hover"
        whileTap="tap"
      >
        <Link
          to="/roadmap"
          className="py-2 px-4 bg-primary hover:bg-primary-dark text-white rounded-xl transition-colors text-sm font-semibold"
        >
          Explore Roadmaps
        </Link>
      </motion.div>
    </motion.div>
  )}
</motion.section>


          </div>

          {/* Right Column - Stats & Activity with Updated Card Styling */}
          <div className="space-y-8">
            {/* Continue Watching Section - Updated with Roadmaps card style */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              whileHover={{ y: -4 }}
              className={`relative p-6 lg:p-8 rounded-2xl shadow-lg bg-gradient-to-br backdrop-blur-xl transition-all duration-300 hover:shadow-2xl overflow-hidden ${
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

              <h3 className={`text-xl font-righteous tracking-wide mb-6 ${isDark ? 'text-dark-text-primary' : 'text-light-text-primary'}`}>
                Continue Watching
              </h3>

              <Suspense fallback={
                <div className="flex items-center justify-center h-40">
                  <motion.div
                    animate={{ rotate: 360 }} 
                    transition={{ repeat: Infinity, duration: 1, ease: "linear" }} 
                    className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full"
                  />
                </div>
              }>
                {continueWatchingCourses.length > 0 ? (
                  <div className="space-y-4">
                    {continueWatchingCourses.map((course, index) => (
                      <motion.div
                        key={course._id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 + index * 0.1 }}
                        whileHover={{ scale: 1.02, x: 4 }}
                        className={`p-4 rounded-xl cursor-pointer transition-all duration-300 ${
                          isDark 
                            ? 'bg-dark-bg-tertiary border border-dark-border hover:border-primary/50' 
                            : 'bg-white border border-light-border hover:border-primary/50'
                        } hover:shadow-md`}
                        onClick={() => onCourseSelect && onCourseSelect(course)}
                      >
                        <div className="flex items-center space-x-3">
                          <img
                            src={course.course_image || 'https://via.placeholder.com/60'}
                            alt={course.course_title}
                            className="w-12 h-12 object-cover rounded-lg"
                          />
                          <div className="flex-1">
                            <h4 className={`font-semibold text-sm mb-1 ${isDark ? 'text-dark-text-primary' : 'text-light-text-primary'} group-hover:text-primary transition-colors duration-300`}>
                              {course.course_title}
                            </h4>
                            <p className={`text-xs ${isDark ? 'text-dark-text-secondary' : 'text-light-text-secondary'}`}>
                              {course.creator_name}
                            </p>
                          </div>
                          <FaPlay className="text-primary text-sm opacity-60" />
                        </div>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <motion.div 
                      className={`w-16 h-16 mx-auto mb-4 rounded-xl flex items-center justify-center ${isDark ? 'bg-dark-bg-primary' : 'bg-light-bg-primary'}`}
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.5 }}
                    >
                      <FaPlay className="text-primary text-xl" />
                    </motion.div>
                    <p className={`text-sm ${isDark ? 'text-dark-text-secondary' : 'text-light-text-secondary'}`}>
                      No courses in progress
                    </p>
                    <p className={`text-xs mt-1 ${isDark ? 'text-dark-text-tertiary' : 'text-light-text-tertiary'}`}>
                      Start watching courses to see them here
                    </p>
                  </div>
                )}
              </Suspense>
            </motion.div>

            {/* User Activity Section - Updated with Roadmaps card style */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 }}
              whileHover={{ y: -4 }}
              className={`relative p-6 lg:p-8 rounded-2xl shadow-lg bg-gradient-to-br backdrop-blur-xl transition-all duration-300 hover:shadow-2xl overflow-hidden ${
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

              <h3 className={`text-xl font-righteous tracking-wide mb-6 ${isDark ? 'text-dark-text-primary' : 'text-light-text-primary'}`}>
                Recent Activity
              </h3>

              <Suspense fallback={
                <div className="flex items-center justify-center h-40">
                  <motion.div
                    animate={{ rotate: 360 }} 
                    transition={{ repeat: Infinity, duration: 1, ease: "linear" }} 
                    className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full"
                  />
                </div>
              }>
                {activities && activities.length > 0 ? (
                  <div className="space-y-4">
                    {activities.map((activity, index) => (
                      <motion.div
                        key={activity.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8 + index * 0.1 }}
                        className={`p-4 rounded-xl ${
                          isDark 
                            ? 'bg-dark-bg-tertiary border border-dark-border' 
                            : 'bg-white border border-light-border'
                        }`}
                      >
                        <div className="flex items-start space-x-3">
                          <motion.div 
                            className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                              activity.type === 'completed' ? 'bg-green-500/10' :
                              activity.type === 'started' ? 'bg-blue-500/10' :
                              'bg-orange-500/10'
                            }`}
                            whileHover={{ rotate: 360 }}
                            transition={{ duration: 0.5 }}
                          >
                            {activity.type === 'completed' ? (
                              <FaGraduationCap className="text-green-500 text-sm" />
                            ) : activity.type === 'started' ? (
                              <FaPlay className="text-blue-500 text-sm" />
                            ) : (
                              <FaBookmark className="text-orange-500 text-sm" />
                            )}
                          </motion.div>
                          <div className="flex-1">
                            <p className={`text-sm font-medium ${isDark ? 'text-dark-text-primary' : 'text-light-text-primary'}`}>
                              {activity.description}
                            </p>
                            <p className={`text-xs ${isDark ? 'text-dark-text-secondary' : 'text-light-text-secondary'}`}>
                              {activity.timestamp}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <motion.div 
                      className={`w-16 h-16 mx-auto mb-4 rounded-xl flex items-center justify-center ${isDark ? 'bg-dark-bg-primary' : 'bg-light-bg-primary'}`}
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.5 }}
                    >
                      <FaChartLine className="text-primary text-xl" />
                    </motion.div>
                    <p className={`text-sm ${isDark ? 'text-dark-text-secondary' : 'text-light-text-secondary'}`}>
                      No recent activity
                    </p>
                    <p className={`text-xs mt-1 ${isDark ? 'text-dark-text-tertiary' : 'text-light-text-tertiary'}`}>
                      Your learning activities will appear here
                    </p>
                  </div>
                )}
              </Suspense>
            </motion.div>

            {/* Enhanced Learning Recommendations - matching Roadmaps card style */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.0 }}
              whileHover={{ y: -4 }}
              className={`relative p-6 lg:p-8 rounded-2xl shadow-lg bg-gradient-to-br backdrop-blur-xl transition-all duration-300 hover:shadow-2xl overflow-hidden ${
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

              <h3 className={`text-xl font-righteous tracking-wide mb-6 ${isDark ? 'text-dark-text-primary' : 'text-light-text-primary'}`}>
                Recommended For You
              </h3>

              <div className="space-y-4">
                {[
                  {
                    title: "Advanced JavaScript Concepts",
                    description: "Take your JS skills to the next level",
                    level: "Intermediate",
                    rating: "4.8",
                    url: "https://www.youtube.com/watch?v=8zKuNo4ay8E"
                  },
                  {
                    title: "React Performance Optimization",
                    description: "Learn techniques to optimize React apps",
                    level: "Advanced",
                    rating: "4.9",
                    url: "https://www.youtube.com/watch?v=7A5X_iwWdvw"
                  },
                  {
                    title: "Full Stack Development with MERN",
                    description: "Build complete web applications",
                    level: "Intermediate",
                    rating: "4.7",
                    url: "https://www.youtube.com/watch?v=ktjafK4SgWM"
                  }
                ].map((course, index) => (
                  <motion.div
                    key={course.title}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.2 + index * 0.1 }}
                    whileHover={{ scale: 1.02, x: 4 }}
                    className={`p-4 rounded-xl cursor-pointer transition-all duration-300 ${
                      isDark 
                        ? 'bg-dark-bg-tertiary border border-dark-border hover:border-primary/50' 
                        : 'bg-white border border-light-border hover:border-primary/50'
                    } hover:shadow-md`}
                    onClick={() => window.open(course.url, "_blank")}
                  >
                    <h4 className={`font-semibold mb-2 ${isDark ? 'text-dark-text-primary' : 'text-light-text-primary'} group-hover:text-primary transition-colors duration-300`}>
                      {course.title}
                    </h4>
                    <p className={`text-sm mb-3 ${isDark ? 'text-dark-text-secondary' : 'text-light-text-secondary'}`}>
                      {course.description}
                    </p>
                    <div className="flex items-center justify-between text-xs">
                      <span className={`px-3 py-1 rounded-full font-medium ${
                        course.level === 'Advanced' 
                          ? 'bg-red-500/10 text-red-500' 
                          : 'bg-primary/10 text-primary'
                      }`}>
                        {course.level}
                      </span>
                      <div className="flex items-center text-yellow-500">
                        <FaStar className="mr-1" />
                        <span>{course.rating}</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
                className="mt-6"
              >
                <Link
                  to="/courses"
                  className="text-primary hover:text-primary-dark transition-colors text-sm flex justify-end items-center font-medium"
                >
                  View all recommendations
                  <motion.svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-4 w-4 ml-1" 
                    viewBox="0 0 20 20" 
                    fill="currentColor"
                    whileHover={{ x: 2 }}
                    transition={{ duration: 0.2 }}
                  >
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </motion.svg>
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Call to Action Section - matching Roadmaps */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8, duration: 0.6, ease: "easeOut" }}
          className={`mt-24 text-center p-8 sm:p-12 rounded-3xl ${
            isDark ? 'bg-gradient-to-r from-dark-bg-secondary to-dark-bg-secondary border border-dark-border' : 'bg-gradient-to-r from-light-bg-secondary to-light-bg-secondary border border-light-border'
          }`}
        >
          <h3 className={`text-xl sm:text-2xl md:text-3xl font-righteous mb-4 ${
            isDark ? 'text-dark-text-primary' : 'text-light-text-primary'
          }`}>
            Keep Learning, Keep Growing
          </h3>
          <p className={`text-base sm:text-lg ${
            isDark ? 'text-dark-text-secondary' : 'text-light-text-secondary'
          } max-w-2xl mx-auto`}>
            Your learning journey is unique. Track your progress, set new goals, and unlock your potential with our comprehensive learning platform.
          </p>
        </motion.section>
      </div>
    </div>
  );
}

export default Dashboard;