import React, { useEffect, useState } from "react";
import { useAuth } from "../../store/auth";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { useLoading } from "../../components/loadingContext";
import { useTheme } from "../../context/ThemeContext";
import { FaSort, FaSortUp, FaSortDown, FaEdit, FaTrashAlt, FaEye, FaPlus } from "react-icons/fa";
import { MdSearch, MdCategory, MdVideoLibrary } from "react-icons/md";

function AdminCourses() {
  const { authorizationToken, API } = useAuth();
  const [courses, setCourses] = useState([]);
  const { setIsLoading } = useLoading();
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [viewMode, setViewMode] = useState("table"); // table or grid

  const fetchCourses = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`${API}/admin/courses`, {
        method: "GET",
        headers: {
          Authorization: authorizationToken,
        },
      });
      const data = await response.json();
      if (response.ok) {
        setCourses(data);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch courses");
    } finally {
      setIsLoading(false);
    }
  };

  const deleteCourse = async (id) => {
    if (window.confirm("Are you sure you want to delete this course?")) {
      try {
        setIsLoading(true);
        const response = await fetch(`${API}/admin/courses/delete/${id}`, {
          method: "DELETE",
          headers: {
            Authorization: authorizationToken,
          },
        });
        if (response.ok) {
          const data = await response.json();
          toast.success(data.message);
          fetchCourses();
        } else {
          toast.error("Course not deleted!");
        }
      } catch (error) {
        console.log(error);
        toast.error("An error occurred while deleting the course");
      } finally {
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  // Get unique categories
  const categories = ["all", ...new Set(courses.map(course => course.course_category))];

  // Sorting function
  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    } else if (sortConfig.key === key && sortConfig.direction === 'descending') {
      direction = null;
    }
    setSortConfig({ key, direction });
  };

  // Get sorted and filtered courses
  const getSortedCourses = () => {
    let filteredCourses = [...courses];

    // Apply category filter
    if (selectedCategory !== "all") {
      filteredCourses = filteredCourses.filter(course =>
        course.course_category === selectedCategory
      );
    }

    // Apply search filter
    if (searchTerm) {
      filteredCourses = filteredCourses.filter(course =>
        course.course_title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.creator_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.course_category?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.description?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply sorting
    if (sortConfig.key && sortConfig.direction) {
      filteredCourses.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }

    return filteredCourses;
  };

  const sortedCourses = getSortedCourses();

  // Get sort icon
  const getSortIcon = (key) => {
    if (sortConfig.key !== key) return <FaSort className="text-gray-400" />;
    if (sortConfig.direction === 'ascending') return <FaSortUp className="text-primary" />;
    if (sortConfig.direction === 'descending') return <FaSortDown className="text-primary" />;
    return <FaSort className="text-gray-400" />;
  };

  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h2 className="text-2xl font-righteous flex items-center gap-2">
          <MdVideoLibrary className="text-primary" />
          Course Management
        </h2>

        <Link
          to="/admin/courses/add"
          className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary-dark text-white font-medium rounded-lg transition-all duration-300 cursor-pointer"
        >
          <FaPlus />
          <span>Add New Course</span>
        </Link>
      </div>

      {/* Filters and search */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className={`relative flex-grow max-w-md`}>
          <input
            type="text"
            placeholder="Search courses..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`w-full pl-10 pr-4 py-2 rounded-lg ${
              isDark
                ? 'bg-dark-bg-tertiary text-dark-text-primary border-dark-border'
                : 'bg-light-bg-tertiary text-light-text-primary border-light-border'
            } border focus:outline-none focus:ring-2 focus:ring-primary`}
          />
          <MdSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-primary text-xl" />
        </div>

        <div className="flex items-center gap-2">
          <MdCategory className="text-primary text-xl" />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className={`px-4 py-2 rounded-lg ${
              isDark
                ? 'bg-dark-bg-tertiary text-dark-text-primary border-dark-border'
                : 'bg-light-bg-tertiary text-light-text-primary border-light-border'
            } border focus:outline-none focus:ring-2 focus:ring-primary`}
          >
            {categories.map(category => (
              <option key={category} value={category}>
                {category === "all" ? "All Categories" : category}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setViewMode("table")}
            className={`p-2 rounded-lg transition-colors ${
              viewMode === "table"
                ? "bg-primary text-white"
                : isDark
                  ? 'bg-dark-bg-tertiary text-dark-text-primary'
                  : 'bg-light-bg-tertiary text-light-text-primary'
            }`}
            title="Table view"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5 4a3 3 0 00-3 3v6a3 3 0 003 3h10a3 3 0 003-3V7a3 3 0 00-3-3H5zm-1 9v-1h5v2H5a1 1 0 01-1-1zm7 1h4a1 1 0 001-1v-1h-5v2zm0-4h5V8h-5v2zM9 8H4v2h5V8z" clipRule="evenodd" />
            </svg>
          </button>
          <button
            onClick={() => setViewMode("grid")}
            className={`p-2 rounded-lg transition-colors ${
              viewMode === "grid"
                ? "bg-primary text-white"
                : isDark
                  ? 'bg-dark-bg-tertiary text-dark-text-primary'
                  : 'bg-light-bg-tertiary text-light-text-primary'
            }`}
            title="Grid view"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm1 13a1 1 0 011-1h10a1 1 0 011 1v-2a1 1 0 011 1h2a1 1 0 01-1 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1v-2a1 1 0 011-1zm1-6a1 1 0 011-1h10a1 1 0 011 1v-2a1 1 0 011 1h2a1 1 0 01-1 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1v-2a1 1 0 011-1zm1-6a1 1 0 011-1h10a1 1 0 011 1v-2a1 1 0 011 1h2a1 1 0 01-1 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1v-2a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className={`p-4 rounded-lg ${isDark ? 'bg-dark-bg-tertiary' : 'bg-light-bg-tertiary'} border ${isDark ? 'border-dark-border' : 'border-light-border'}`}>
          <p className={`text-sm ${isDark ? 'text-dark-text-secondary' : 'text-light-text-secondary'}`}>Total Courses</p>
          <p className="text-2xl font-bold">{courses.length}</p>
        </div>
        <div className={`p-4 rounded-lg ${isDark ? 'bg-dark-bg-tertiary' : 'bg-light-bg-tertiary'} border ${isDark ? 'border-dark-border' : 'border-light-border'}`}>
          <p className={`text-sm ${isDark ? 'text-dark-text-secondary' : 'text-light-text-secondary'}`}>Categories</p>
          <p className="text-2xl font-bold">{categories.length - 1}</p>
        </div>
        <div className={`p-4 rounded-lg ${isDark ? 'bg-dark-bg-tertiary' : 'bg-light-bg-tertiary'} border ${isDark ? 'border-dark-border' : 'border-light-border'}`}>
          <p className={`text-sm ${isDark ? 'text-dark-text-secondary' : 'text-light-text-secondary'}`}>Filtered Results</p>
          <p className="text-2xl font-bold">{sortedCourses.length}</p>
        </div>
      </div>

      {/* Table View */}
      {viewMode === "table" && (
        <div className={`overflow-x-auto rounded-lg border ${isDark ? 'border-dark-border' : 'border-light-border'}`}>
          <table className="w-full">
            <thead className={`${isDark ? 'bg-dark-bg-tertiary' : 'bg-light-bg-tertiary'}`}>
              <tr>
                <th className="px-4 py-3 text-left">
                  <button
                    className="flex items-center gap-2 font-medium"
                    onClick={() => requestSort('course_title')}
                  >
                    Title {getSortIcon('course_title')}
                  </button>
                </th>
                <th className="px-4 py-3 text-left">
                  <button
                    className="flex items-center gap-2 font-medium"
                    onClick={() => requestSort('course_category')}
                  >
                    Category {getSortIcon('course_category')}
                  </button>
                </th>
                <th className="px-4 py-3 text-left">
                  <button
                    className="flex items-center gap-2 font-medium"
                    onClick={() => requestSort('creator_name')}
                  >
                    Creator {getSortIcon('creator_name')}
                  </button>
                </th>
                <th className="px-4 py-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {sortedCourses.length === 0 ? (
                <tr>
                  <td colSpan="4" className="px-4 py-8 text-center">
                    <p className={`${isDark ? 'text-dark-text-secondary' : 'text-light-text-secondary'}`}>
                      No courses found. {searchTerm && "Try a different search term."}
                    </p>
                  </td>
                </tr>
              ) : (
                sortedCourses.map((course, index) => (
                  <tr
                    key={course._id}
                    className={`
                      border-t ${isDark ? 'border-dark-border' : 'border-light-border'}
                      ${index % 2 === 0
                        ? isDark ? 'bg-dark-bg-secondary' : 'bg-light-bg-secondary'
                        : isDark ? 'bg-dark-bg-primary' : 'bg-light-bg-primary'
                      }
                      hover:${isDark ? 'bg-dark-bg-tertiary' : 'bg-light-bg-tertiary'} transition-colors
                    `}
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-md overflow-hidden flex-shrink-0">
                          <img
                            src={course.course_image || 'default-course.jpg'}
                            alt={course.course_title}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.target.src = 'https://via.placeholder.com/40x40?text=Course';
                            }}
                          />
                        </div>
                        <span className="font-medium">{course.course_title}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="px-2 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
                        {course.course_category}
                      </span>
                    </td>
                    <td className="px-4 py-3">{course.creator_name}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-center gap-2">
                        <Link
                          to={`/admin/courses/update/${course._id}`}
                          className={`
                            p-2 rounded-lg transition-colors
                            ${isDark
                              ? 'bg-dark-bg-tertiary hover:bg-primary/20 text-dark-text-primary'
                              : 'bg-light-bg-tertiary hover:bg-primary/20 text-light-text-primary'
                            }
                          `}
                          title="Edit course"
                        >
                          <FaEdit className="text-primary" />
                        </Link>
                        <button
                          onClick={() => deleteCourse(course._id)}
                          className={`
                            p-2 rounded-lg transition-colors
                            ${isDark
                              ? 'bg-dark-bg-tertiary hover:bg-red-500/20 text-dark-text-primary'
                              : 'bg-light-bg-tertiary hover:bg-red-500/20 text-light-text-primary'
                            }
                          `}
                          title="Delete course"
                        >
                          <FaTrashAlt className="text-red-500" />
                        </button>
                        <Link
                          to={`/courses/${course._id}`}
                          target="_blank"
                          className={`
                            p-2 rounded-lg transition-colors
                            ${isDark
                              ? 'bg-dark-bg-tertiary hover:bg-blue-500/20 text-dark-text-primary'
                              : 'bg-light-bg-tertiary hover:bg-blue-500/20 text-light-text-primary'
                            }
                          `}
                          title="View course"
                        >
                          <FaEye className="text-blue-500" />
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Grid View */}
      {viewMode === "grid" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {sortedCourses.length === 0 ? (
            <div className={`col-span-full p-8 text-center rounded-lg ${
              isDark ? 'bg-dark-bg-secondary' : 'bg-light-bg-secondary'
            }`}>
              <p className={`${isDark ? 'text-dark-text-secondary' : 'text-light-text-secondary'}`}>
                No courses found. {searchTerm && "Try a different search term."}
              </p>
            </div>
          ) : (
            sortedCourses.map(course => (
              <div
                key={course._id}
                className={`rounded-xl overflow-hidden shadow-lg ${
                  isDark ? 'bg-dark-bg-secondary border border-dark-border' : 'bg-light-bg-secondary border border-light-border'
                }`}
              >
                <div className="relative">
                  <img
                    src={course.course_image || 'default-course.jpg'}
                    alt={course.course_title}
                    className="w-full h-40 object-cover"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/300x150?text=Course';
                    }}
                  />
                  <div className="absolute top-2 right-2">
                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-primary/80 text-white">
                      {course.course_category}
                    </span>
                  </div>
                </div>

                <div className="p-4">
                  <h3 className="text-lg font-medium mb-2">{course.course_title}</h3>
                  <p className={`text-sm mb-4 ${
                    isDark ? 'text-dark-text-secondary' : 'text-light-text-secondary'
                  }`}>
                    By {course.creator_name}
                  </p>

                  <div className="flex justify-between items-center">
                    <div className="flex gap-2">
                      <Link
                        to={`/admin/courses/update/${course._id}`}
                        className={`
                          p-2 rounded-lg transition-colors
                          ${isDark
                            ? 'bg-dark-bg-tertiary hover:bg-primary/20 text-dark-text-primary'
                            : 'bg-light-bg-tertiary hover:bg-primary/20 text-light-text-primary'
                          }
                        `}
                        title="Edit course"
                      >
                        <FaEdit className="text-primary" />
                      </Link>
                      <button
                        onClick={() => deleteCourse(course._id)}
                        className={`
                          p-2 rounded-lg transition-colors
                          ${isDark
                            ? 'bg-dark-bg-tertiary hover:bg-red-500/20 text-dark-text-primary'
                            : 'bg-light-bg-tertiary hover:bg-red-500/20 text-light-text-primary'
                          }
                        `}
                        title="Delete course"
                      >
                        <FaTrashAlt className="text-red-500" />
                      </button>
                    </div>

                    <Link
                      to={`/courses/${course._id}`}
                      target="_blank"
                      className={`
                        px-3 py-1 rounded-lg transition-colors flex items-center gap-1
                        ${isDark
                          ? 'bg-primary text-white hover:bg-primary-dark'
                          : 'bg-primary text-white hover:bg-primary-dark'
                        }
                      `}
                      title="View course"
                    >
                      <FaEye />
                      <span>View</span>
                    </Link>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default AdminCourses;


