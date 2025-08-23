import React from 'react';
import { useAuth } from '../store/auth';
import { useTheme } from '../context/ThemeContext';
import { toast } from 'react-toastify';
import { MdBookmarkBorder, MdBookmarkAdded, MdEdit, MdPlayCircleOutline } from "react-icons/md";
import { Link, useNavigate } from 'react-router-dom';
import { useLoading } from './loadingContext';
import { getYouTubeUrlType } from '../utils/youtubeUtils';

const CardBody = ({ course, watchlist = [], updateWatchlist, onClick }) => {
  const { setIsLoading } = useLoading();
  const { course_title, creator_youtube_link, creator_name, creator_image, course_image } = course;
  const { API, userdata } = useAuth();
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  // Analyze YouTube link type
  const youtubeUrlInfo = getYouTubeUrlType(creator_youtube_link);

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
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
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

      const result = await response.json();
      //console.log("Watchlist update success:", result);

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
      setIsLoading(false);
    }
  };

  return (
    <div
      className={`
        w-[300px] border rounded-md overflow-hidden shadow-md transition-all duration-200
        ${isDark
          ? 'bg-dark-bg-secondary border-dark-border'
          : 'bg-light-bg-secondary border-light-border'}
        hover:scale-[1.02] hover:shadow-lg cursor-pointer
      `}
      onClick={handleCardClick}
    >
      <div className="relative">
        <img
          src={course_image}
          alt={course_title}
          className="w-full h-[180px] object-cover"
        />
        <div className="absolute inset-0 bg-black/30 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
          <MdPlayCircleOutline className="text-white text-5xl" />
        </div>
      </div>

      <div className="p-4 flex flex-col gap-5 relative">
        <h3 className={`text-lg font-medium ${isDark ? 'text-dark-text-primary' : 'text-light-text-primary'}`}>
          {course_title.length > 20 ? `${course_title.slice(0, 20)}...` : course_title}
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
            className={`
              py-2 px-5 rounded-full flex items-center justify-center text-white transition-colors
              ${isDark ? 'bg-primary hover:bg-primary-dark' : 'bg-primary hover:bg-primary-dark'}
            `}
          >
            Watch Now
          </button>

          <div className="flex gap-2">
            <button
              onClick={handleWatchlist}
              className={`
                h-10 w-10 rounded-full flex items-center justify-center transition-colors
                ${isInWatchlist
                  ? 'bg-primary text-white'
                  : `${isDark ? 'bg-dark-bg-tertiary text-dark-text-primary border border-dark-border' : 'bg-light-bg-tertiary text-light-text-primary border border-light-border'}`}
              `}
              aria-label={isInWatchlist ? "Remove from watchlist" : "Add to watchlist"}
            >
              {isInWatchlist ? (
                <MdBookmarkAdded className="text-xl" />
              ) : (
                <MdBookmarkBorder className="text-xl" />
              )}
            </button>

            {userdata.isAdmin && (
              <Link
                className={`
                  h-10 w-10 rounded-full flex items-center justify-center transition-colors
                  ${isDark ? 'bg-dark-bg-tertiary text-primary hover:bg-dark-bg-primary' : 'bg-light-bg-tertiary text-primary hover:bg-light-bg-primary'}
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

export default CardBody;
