import {
  useState,
  useEffect,
  lazy,
  Suspense,
  useMemo,
  useCallback,
} from "react";
import { motion } from "framer-motion";
import { useAuth } from "../store/auth";
import { useTheme } from "../context/ThemeContext";
import { useLoading } from "../components/loadingContext";

const SearchBar = lazy(() => import("../components/SearchBar"));
const CardBody = lazy(() => import("../components/CardBody"));

const Courses = () => {
  const { fetchCoursesData, coursesData,setCoursesData, API } = useAuth();
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [watchlist, setWatchlist] = useState([]);
  const token = localStorage.getItem("token");
  const { setIsLoading } = useLoading();

  const [currentPage, setCurrentPage] = useState(1);
  const coursesPerPage = 9;

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      await fetchCoursesData();
      setIsLoading(false);
    };
    loadData();
  }, []);

  useEffect(() => {
    setIsLoading(true);
    const uniqueCategories = [
      ...new Set(coursesData.map((course) => course.course_category)),
    ];
    setCategories(uniqueCategories);
    setIsLoading(false);
  }, [coursesData]);

  // Fetch user's watchlist
  const fetchWatchlist = async () => {
    try {
      const response = await fetch(`${API}/user/watchlist`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setWatchlist(data.watchlist || []);
      } else {
        console.error(
          "Failed to fetch watchlist:",
          response.status,
          response.statusText
        );
      }
    } catch (error) {
      console.error("Error fetching watchlist:", error);
    }
  };

  useEffect(() => {
    fetchWatchlist();
  }, [API, token]);

  const updateWatchlist = useCallback(() => {
    fetchWatchlist();
  }, []);

  // Filtered courses  (Keeping category filter commented out for now for any rollbacks)
  // const filteredCourses = useMemo(() => {
  //   return coursesData.filter(
  //     (course) =>
  //       (selectedCategory
  //         ? course.course_category === selectedCategory
  //         : true) &&
  //       (course.course_title.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //         course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //         course.creator_name.toLowerCase().includes(searchTerm.toLowerCase()))
  //   );
  // }, [coursesData, selectedCategory, searchTerm]);
  const filteredCourses = useMemo(() => {
  return coursesData.filter(
    (course) =>
      course.course_title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.creator_name.toLowerCase().includes(searchTerm.toLowerCase())
  );
}, [coursesData, searchTerm]);

  // Pagination logic
  const totalPages = Math.ceil(filteredCourses.length / coursesPerPage);
  const indexOfLastCourse = currentPage * coursesPerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
  const currentCourses = filteredCourses.slice(
    indexOfFirstCourse,
    indexOfLastCourse
  );
  // Fetch courses by category from backend
  const fetchCoursesByCategory = async (category) => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API}/api/v1/courses/${category}`);
      const data = await response.json();
      setCoursesData(data.data); // update coursesData with backend result
    } catch (error) {
      console.error("Error fetching courses by category:", error);
    }
    setIsLoading(false);
  };

  const handleCategorySelect = useCallback(async (category) => {
    setCurrentPage(1);
    if (category === "All") {
      await fetchCoursesData(); //fetch all courses
      setSelectedCategory(null);
    } else {
      await fetchCoursesByCategory(category); //fetch courses from backend
      setSelectedCategory(category);
    }
  }, []);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const getPageNumbers = () => {
    if (totalPages <= 5) {
      return [...Array(totalPages)].map((_, i) => i + 1);
    }

    const pages = [];

    pages.push(1);

    if (currentPage > 3) {
      pages.push("...");
    }

    const startPage = Math.max(2, currentPage - 1);
    const endPage = Math.min(totalPages - 1, currentPage + 1);

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    if (currentPage < totalPages - 2) {
      pages.push("...");
    }

    pages.push(totalPages);

    return pages;
  };

  // Animation variants matching Roadmaps page
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

  const searchVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: 0.8,
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
    initial: {
      scale: 1
    },
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

  const noResultsVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <div className={`relative min-h-screen-minus-nav overflow-hidden z-10 ${isDark ? 'bg-dark-bg-primary text-dark-text-primary' : 'bg-light-bg-primary text-light-text-primary'}`}>
      {/* Enhanced Background with gradient overlay */}
      <motion.div
        variants={backgroundVariants}
        initial="hidden"
        animate="visible"
        className={`absolute top-0 left-0 w-full h-full -z-10 bg-[size:30px_30px] ${isDark ? 'bg-grid-pattern-dark' : 'bg-grid-pattern-light'}`}
      >
        <div className={`absolute inset-0 ${isDark ? 'bg-gradient-to-br from-dark-bg-primary/90 via-transparent to-dark-bg-primary/50' : 'bg-gradient-to-br from-light-bg-primary/90 via-transparent to-light-bg-primary/50'}`}></div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 py-12 md:py-16 lg:py-20">
        {/* Enhanced Header Section */}
        <motion.div
          variants={headerVariants}
          initial="hidden"
          animate="visible"
          className="text-center mb-12"
        >
          <div className="inline-block">
            <h1 className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-righteous tracking-wider mb-4 ${isDark ? 'text-dark-text-primary' : 'text-light-text-primary'}`}>
              {selectedCategory || "All Courses"}
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
            Discover comprehensive courses designed to accelerate your learning journey and master new skills.
          </motion.p>
        </motion.div>

        {/* Enhanced Search Section */}
        <motion.div
          variants={searchVariants}
          initial="hidden"
          animate="visible"
          className="mb-16"
        >
          <div className="flex flex-col items-center space-y-6">
            {/* Enhanced SearchBar */}
            <div className="w-full max-w-2xl">
              <Suspense
                fallback={
                  <div className={`relative rounded-2xl overflow-hidden ${isDark ? 'bg-dark-bg-secondary border border-dark-border' : 'bg-light-bg-secondary border border-light-border'} backdrop-blur-sm`}>
                    <div className="flex items-center justify-center h-16">
                      <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-primary"></div>
                    </div>
                  </div>
                }
              >
                {/* THIS IS THE CORRECTED LINE */}
             
                  <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
                
              </Suspense>
            </div>

            {/* Enhanced Category Filters */}
            
              <motion.button
                variants={buttonVariants}
                initial="initial"
                whileHover="hover"
                whileTap="tap"
                className={`px-4 py-2 rounded-lg font-semibold text-sm sm:text-base transition-all duration-300 ${selectedCategory === null
                    ? 'bg-primary text-white shadow-lg'
                    : isDark
                      ? 'text-dark-text-secondary hover:text-dark-text-primary hover:bg-dark-bg-primary'
                      : 'text-light-text-secondary hover:text-light-text-primary hover:bg-light-bg-primary'
                  }`}
                onClick={() => handleCategorySelect("All")}
              >
                All Courses
                <span className={`ml-2 text-xs px-2 py-1 rounded-full ${selectedCategory === null
                  ? 'bg-white/20'
                  : isDark
                    ? 'bg-dark-bg-primary text-dark-text-secondary'
                    : 'bg-light-bg-primary text-light-text-secondary'
                  }`}>
                  {coursesData.length}
                </span>
              </motion.button>

              {categories.map((category, index) => {
                const categoryCount = coursesData.filter(course => course.course_category === category).length;
                return (
                  <motion.button
                    key={index}
                    variants={buttonVariants}
                    initial="initial"
                    whileHover="hover"
                    whileTap="tap"
                    className={`px-4 py-2 rounded-lg font-medium text-sm sm:text-base transition-all duration-300
                      ${selectedCategory === category
                        ? "bg-primary text-white shadow-md"
                        : isDark
                          ? "bg-dark-bg-secondary/40 text-dark-text-secondary border border-dark-border hover:bg-dark-bg-secondary/70 hover:text-dark-text-primary"
                          : "bg-light-bg-secondary/40 text-light-text-secondary border border-light-border hover:bg-light-bg-secondary/70 hover:text-light-text-primary"
                      }`}
                    onClick={() => handleCategorySelect(category)}
                  >
                    {category}
                    <span
                      className={`ml-2 text-xs px-2 py-0.5 rounded-full 
                      ${selectedCategory === category
                          ? "bg-white/20 text-white"
                          : isDark
                            ? "bg-dark-bg-primary/60 text-dark-text-secondary"
                            : "bg-light-bg-primary/60 text-light-text-secondary"
                        }`}
                    >
                      {categoryCount}
                    </span>
                  </motion.button>
                );
              })}
           

            {/* Search Results Count */}
            {searchTerm && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className={`text-sm ${isDark ? 'text-dark-text-secondary' : 'text-light-text-secondary'}`}
              >
                Found {filteredCourses.length} course(s) matching &quot;{searchTerm}&quot;
              </motion.p>
            )}
          </div>
        </motion.div>

        {/* Enhanced Courses Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 1.4 }}
          className="mb-16"
        >
          {currentCourses.length > 0 ? (
            <div className="max-w-full flex flex-wrap justify-around gap-6">
              {currentCourses.map((course) => (
                <motion.div
                  key={course._id}
                  variants={cardVariants}
                  whileHover="hover"
                  className="group"
                >
                  <Suspense
                    fallback={
                      <div className={`w-full h-[400px] rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-secondary-1000 backdrop-blur-xl ${isDark ? 'border border-dark-border' : 'border border-light-border'} shadow-lg flex items-center justify-center`}>
                        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
                      </div>
                    }
                  >
                    <CardBody
                      course={course}
                      watchlist={watchlist}
                      updateWatchlist={updateWatchlist}
                    />
                  </Suspense>
                </motion.div>
              ))}
            </div>
          ) : (
            <motion.div
              variants={noResultsVariants}
              initial="hidden"
              animate="visible"
              className={`max-w-lg mx-auto text-center py-16 px-8 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-secondary-1000 backdrop-blur-xl ${isDark ? 'border border-dark-border' : 'border border-light-border'} shadow-lg`}
            >
              <div className="text-6xl mb-6">📚</div>
              <h3 className={`text-2xl font-bold mb-4 ${isDark ? 'text-dark-text-primary' : 'text-light-text-primary'}`}>
                No Courses Found
              </h3>
              <p className={`text-lg mb-6 ${isDark ? 'text-dark-text-secondary' : 'text-light-text-secondary'}`}>
                {selectedCategory
                  ? `We couldn't find any courses in the "${selectedCategory}" category${searchTerm ? ` matching "${searchTerm}"` : ''}.`
                  : `We couldn't find any courses matching "${searchTerm}".`
                }
              </p>
              <motion.button
                variants={buttonVariants}
                initial="initial"
                whileHover="hover"
                whileTap="tap"
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory(null);
                  setCurrentPage(1);
                }}
                className="px-6 py-3 bg-primary hover:bg-primary-dark text-white font-semibold rounded-xl transition-colors duration-300"
              >
                Show All Courses
              </motion.button>
            </motion.div>
          )}
        </motion.div>

        {/* Enhanced Pagination Controls */}
        {totalPages > 1 && (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: 1.8 }}
    className="flex justify-center items-center gap-2 mt-8 flex-wrap"
  >
    {(() => {
      const [isMobile, setIsMobile] = useState(window.innerWidth < 640);

      useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 640);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
      }, []);

      return (
        <>
          {/* Previous Button */}
          <motion.button
            variants={buttonVariants}
            initial="initial"
            whileHover="hover"
            whileTap="tap"
            className={`px-4 py-2 rounded-xl font-semibold text-white transition-all duration-300 ${
              currentPage === 1
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-primary hover:bg-primary-dark shadow-lg"
            }`}
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </motion.button>

          {/* Pagination Numbers (only for large screens) */}
          {!isMobile &&
            getPageNumbers().map((page, index) =>
              page === "..." ? (
                <span
                  key={index}
                  className={`px-3 py-2 font-bold ${
                    isDark
                      ? "text-dark-text-secondary"
                      : "text-light-text-secondary"
                  }`}
                >
                  ...
                </span>
              ) : (
                <motion.button
                  key={index}
                  variants={buttonVariants}
                  initial="initial"
                  whileHover="hover"
                  whileTap="tap"
                  className={`px-4 py-2 rounded-xl font-semibold transition-all duration-300 ${
                    currentPage === page
                      ? "bg-primary-dark text-white shadow-lg scale-110"
                      : "bg-primary hover:bg-primary-dark text-white shadow-md"
                  }`}
                  onClick={() => handlePageChange(page)}
                >
                  {page}
                </motion.button>
              )
            )}

          {/* Next Button */}
          <motion.button
            variants={buttonVariants}
            initial="initial"
            whileHover="hover"
            whileTap="tap"
            className={`px-4 py-2 rounded-xl font-semibold text-white transition-all duration-300 ${
              currentPage === totalPages
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-primary hover:bg-primary-dark shadow-lg"
            }`}
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </motion.button>
        </>
      );
    })()}
  </motion.div>
)}
      </div>
    </div>
  );
};

export default Courses;