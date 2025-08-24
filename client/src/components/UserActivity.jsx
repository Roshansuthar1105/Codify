import React from 'react';
import { useTheme } from '../context/ThemeContext';
import {
  FaPlay,
  FaCheckCircle,
  FaBookmark,
  FaTrash,
  FaGraduationCap,
  FaUserGraduate
} from 'react-icons/fa';

const UserActivity = ({ activities }) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  // Format timestamp to relative time (e.g., "2 days ago")
  const getRelativeTime = (timestamp) => {
    const now = new Date();
    const activityDate = new Date(timestamp);
    const diffInSeconds = Math.floor((now - activityDate) / 1000);

    if (diffInSeconds < 60) {
      return 'just now';
    }

    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) {
      return `${diffInMinutes} minute${diffInMinutes > 1 ? 's' : ''} ago`;
    }

    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) {
      return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
    }

    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) {
      return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
    }

    const diffInWeeks = Math.floor(diffInDays / 7);
    if (diffInWeeks < 4) {
      return `${diffInWeeks} week${diffInWeeks > 1 ? 's' : ''} ago`;
    }

    const diffInMonths = Math.floor(diffInDays / 30);
    return `${diffInMonths} month${diffInMonths > 1 ? 's' : ''} ago`;
  };

  // Get icon and text for activity type
  const getActivityDetails = (activity) => {
    // Extract course title from different possible structures
    const getCourseTitle = () => {
      if (activity.courseId && typeof activity.courseId === 'object') {
        return activity.courseId.course_title || 'Unknown course';
      } else if (activity.details && activity.details.courseTitle) {
        return activity.details.courseTitle;
      } else if (activity.details && activity.details.videoTitle) {
        return activity.details.videoTitle;
      }
      return 'Unknown course';
    };

    // Get module name if available
    const getModuleName = () => {
      if (activity.details && activity.details.moduleName) {
        return activity.details.moduleName;
      } else if (activity.moduleName) {
        return activity.moduleName;
      }
      return null;
    };

    // Get additional details if available
    const getAdditionalDetails = () => {
      if (activity.details && activity.details.action) {
        return activity.details.action;
      } else if (activity.details && activity.details.progress) {
        return `Progress: ${activity.details.progress}%`;
      }
      return null;
    };

    switch (activity.activityType) {
      case 'started_course':
        return {
          icon: <FaPlay className="text-blue-500" />,
          title: 'Started course',
          description: getCourseTitle(),
          details: getAdditionalDetails()
        };

      case 'completed_module':
        return {
          icon: <FaCheckCircle className="text-green-500" />,
          title: 'Completed module',
          description: getCourseTitle(),
          module: getModuleName(),
          details: getAdditionalDetails()
        };

      case 'completed_course':
        return {
          icon: <FaGraduationCap className="text-purple-500" />,
          title: 'Completed course',
          description: getCourseTitle(),
          details: getAdditionalDetails()
        };

      case 'watchlist_update':
      case 'added_to_watchlist':
        return {
          icon: <FaBookmark className="text-yellow-500" />,
          title: activity.details?.action === 'removed' ? 'Removed from saved courses' : 'Added to saved courses',
          description: getCourseTitle(),
          details: getAdditionalDetails()
        };

      case 'removed_from_watchlist':
        return {
          icon: <FaTrash className="text-red-500" />,
          title: 'Removed from saved courses',
          description: getCourseTitle(),
          details: getAdditionalDetails()
        };

      case 'video_change':
        return {
          icon: <FaPlay className="text-blue-500" />,
          title: 'Watched video',
          description: getCourseTitle(),
          details: getAdditionalDetails()
        };

      case 'course_select':
        return {
          icon: <FaPlay className="text-green-500" />,
          title: 'Selected course',
          description: getCourseTitle(),
          details: getAdditionalDetails()
        };

      case 'progress_update':
        return {
          icon: <FaCheckCircle className="text-blue-500" />,
          title: 'Updated progress',
          description: getCourseTitle(),
          details: getAdditionalDetails()
        };

      case 'course_enrolled':
        return {
          icon: <FaUserGraduate className="text-green-500" />,
          title: 'Enrolled in course',
          description: getCourseTitle(),
          details: activity.details?.enrollmentDate ? `Enrolled on ${new Date(activity.details.enrollmentDate).toLocaleDateString()}` : null
        };

      default:
        return {
          icon: <FaPlay className="text-gray-500" />,
          title: activity.activityType?.replace(/_/g, ' ') || 'Activity',
          description: getCourseTitle(),
          details: getAdditionalDetails()
        };
    }
  };

  // Use empty array if no activities provided (no more sample data)
  const displayActivities = activities && activities.length > 0 ? activities : [];

  return (
    <div className={`rounded-lg overflow-hidden shadow-lg ${isDark ? 'bg-dark-bg-secondary' : 'bg-light-bg-secondary'} p-4`}>
      <h3 className={`text-xl font-bold mb-4 ${isDark ? 'text-dark-text-primary' : 'text-light-text-primary'}`}>
        Recent Activity
      </h3>

      {displayActivities.length > 0 ? (
        <div className="space-y-4">
          {displayActivities.map((activity) => {
            const { icon, title, description, module, details } = getActivityDetails(activity);
            const relativeTime = getRelativeTime(activity.timestamp);

            return (
              <div
                key={activity._id || `activity-${Math.random()}`}
                className={`p-3 rounded-lg ${isDark ? 'bg-dark-bg-tertiary' : 'bg-light-bg-tertiary'} border ${isDark ? 'border-dark-border' : 'border-light-border'}`}
              >
                <div className="flex items-start">
                  <div className="mr-3 mt-1">{icon}</div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-1">
                      <span className="font-medium text-primary">{title}</span>
                      <span className={`text-xs ${isDark ? 'text-dark-text-secondary' : 'text-light-text-secondary'}`}>
                        {relativeTime}
                      </span>
                    </div>
                    <p className={`${isDark ? 'text-dark-text-primary' : 'text-light-text-primary'}`}>
                      {description}
                    </p>
                    {module && (
                      <p className={`text-sm ${isDark ? 'text-dark-text-secondary' : 'text-light-text-secondary'}`}>
                        Module: {module}
                      </p>
                    )}
                    {details && (
                      <p className={`text-xs mt-1 ${isDark ? 'text-dark-text-tertiary' : 'text-light-text-tertiary'}`}>
                        {details}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className={`p-6 rounded-lg ${isDark ? 'bg-dark-bg-tertiary' : 'bg-light-bg-tertiary'} text-center`}>
          <p className={`${isDark ? 'text-dark-text-secondary' : 'text-light-text-secondary'} mb-2`}>
            No recent activity
          </p>
          <p className="text-xs text-primary">
            Your learning activities will appear here
          </p>
        </div>
      )}
    </div>
  );
};

export default UserActivity;
