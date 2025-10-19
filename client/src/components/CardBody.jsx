
import { motion } from "framer-motion";
import { useAuth } from '../store/auth';
import { useTheme } from '../context/ThemeContext';
import { toast } from 'react-toastify';
import { MdBookmarkBorder, MdBookmarkAdded, MdEdit, MdPlayCircleOutline } from "react-icons/md";
import { Link, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useState } from 'react';


const CardBody = ({ course, watchlist = [], updateWatchlist, onClick, size = 'default' }) => {
  const { course_title, creator_youtube_link, creator_name, creator_image, course_image } = course;
  const { API, userdata } = useAuth();
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  const [isSaving, setIsSaving] = useState(false);



  // Handle card click
  const handleCardClick = (e) => {
    // Don't navigate if clicking on buttons or links
    if (e.target.closest('button') || e.target.closest('a')) {
      return;
    }

    // If onClick prop is provided, use it
    if (onClick) {
      onClick(course);
      return;
    }

    // Otherwise navigate to course player page
    navigate(`/courses/${course._id}`);
  };

  const isInWatchlist = watchlist.some(item => item._id === course._id);

  const handleWatchlist = async () => {
    if (!userdata?._id) {
      toast.info("Please log in to save courses!");
      return;
    }

    try {
      setIsSaving(true);
      //console.log(`${isInWatchlist ? 'Removing from' : 'Adding to'} watchlist:`, course._id);

      const response = await fetch(`${API}/user/addToWatchlist`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ courseId: course._id }),
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorMessage}`);
      }

      await response.json();

      // Show appropriate toast message
      if (isInWatchlist) {
        toast.success("Course removed from saved courses");
      } else {
        toast.success("Course added to saved courses");
      }

      // Call the updateWatchlist function with the course and action
      if (typeof updateWatchlist === 'function') {
        updateWatchlist(course, isInWatchlist ? 'removed' : 'added');
      }
    } catch (error) {
      console.error("Error updating watchlist:", error);
      toast.error("Failed to update saved courses");
    } finally {
      setIsSaving(false);
    }
  };

  const cardWidthClass = size === 'wide' ? 'w-full max-w-[560px]' : 'w-[330px]';

  return (
    <div
      className={`
        group relative ${cardWidthClass} rounded-xl shadow-lg flex flex-col
        hover:border-b-2 hover:border-r-2 transition-all duration-300 overflow-hidden
        ${isDark
          ? 'bg-gradient-to-br from-gray-800 to-secondary-1000 backdrop-blur-xl'
          : 'bg-gradient-to-br from-blue-50 to-indigo-50 backdrop-blur-xl'}
        hover:shadow-xl cursor-pointer
      `}
      onClick={handleCardClick}
    >
      {/* Animated borders */}
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

      <div className="relative">
        <img
          src={course_image}
          alt={course_title}
          className="w-full h-[180px] object-cover rounded-lg"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center rounded-xl">
          <motion.div
            whileHover={{ scale: 1.1 }}
            className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300"
          >
            <MdPlayCircleOutline className="text-white text-6xl" />
          </motion.div>
        </div>
      </div>

      <div className="px-4 sm:px-6 pb-3 pt-4 flex flex-col gap-5 relative">
        <h3 className={`text-lg font-medium leading-normal ${isDark ? 'text-dark-text-primary' : 'text-light-text-primary'} group-hover:text-primary transition-colors duration-300 line-clamp-3 min-h-[4.5rem]`}>
          {course_title}
        </h3>

        <div className="flex items-center gap-2">
          <img
            src={creator_image}
            alt={creator_name}
            className="w-8 h-8 rounded-full object-cover"
          />
          <a
            className={`${isDark ? 'text-primary' : 'text-primary'} hover:underline`}
            href={creator_youtube_link}
            target="_blank"
            rel="noopener noreferrer"
          >
            {creator_name}
          </a>
        </div>

        <div className="flex justify-between items-center">
          <button
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/courses/${course._id}`);
            }}
            className="py-2.5 px-6 rounded-full flex items-center justify-center text-white font-medium
              bg-primary hover:bg-primary-dark transition-all duration-300 transform hover:scale-[1.02]
              shadow-md hover:shadow-lg shadow-primary/20"
          >
            Watch Now
          </button>

          <div className="flex gap-2">
            <button
              onClick={handleWatchlist}
              className={`
                h-11 w-11 rounded-full flex items-center justify-center transition-all duration-300
                ${isInWatchlist
                  ? 'bg-primary text-white shadow-md shadow-primary/20'
                  : `${isDark 
                      ? 'bg-dark-bg-tertiary/80 text-dark-text-primary hover:bg-dark-bg-tertiary' 
                      : 'bg-light-bg-tertiary/80 text-light-text-primary hover:bg-light-bg-tertiary'} 
                     backdrop-blur-sm border border-current/10`
                }
                hover:scale-[1.05] ${isSaving ? 'opacity-60 cursor-not-allowed hover:scale-100' : ''}
              `}
              aria-label={isInWatchlist ? "Remove from watchlist" : "Add to watchlist"}
              aria-busy={isSaving}
              disabled={isSaving}
            >
              {isSaving ? (
                <svg className="animate-spin h-5 w-5 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                </svg>
              ) : isInWatchlist ? (
                <MdBookmarkAdded className="text-xl" />
              ) : (
                <MdBookmarkBorder className="text-xl" />
              )}
            </button>

            {userdata.isAdmin && (
              <Link
                className={`
                  h-11 w-11 rounded-full flex items-center justify-center transition-all duration-300
                  ${isDark 
                    ? 'bg-dark-bg-tertiary/80 text-primary hover:bg-dark-bg-tertiary' 
                    : 'bg-light-bg-tertiary/80 text-primary hover:bg-light-bg-tertiary'}
                  backdrop-blur-sm border border-current/10 hover:scale-[1.05]
                `}
                to={`/admin/courses/update/${course._id}`}
                aria-label="Edit course"
              >
                <MdEdit className="text-xl" />
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

CardBody.propTypes = {
  course: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    course_title: PropTypes.string.isRequired,
    creator_youtube_link: PropTypes.string.isRequired,
    creator_name: PropTypes.string.isRequired,
    creator_image: PropTypes.string.isRequired,
    course_image: PropTypes.string.isRequired
  }).isRequired,
  watchlist: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string.isRequired
  })),
  updateWatchlist: PropTypes.func,
  onClick: PropTypes.func,
  size: PropTypes.oneOf(['default', 'wide'])
};

export default CardBody;
