import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../store/auth';
import { useTheme } from '../context/ThemeContext';
import YouTubePlayer from '../components/YouTubePlayer';
import CodePlayground from '../components/CodePlayground';
import YouTubePlaylist from '../components/YouTubePlaylist';
import CourseModules from '../components/CourseModules';
import { getYouTubeUrlType, extractPlaylistId, extractVideoId } from '../utils/youtubeUtils';
import { FaArrowLeft, FaBookmark, FaPlay, FaShare, FaEye, FaThumbsUp } from 'react-icons/fa';

const CoursePlayer = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const { userdata, API } = useAuth();
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const token = localStorage.getItem('token');

  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [courseProgress, setCourseProgress] = useState(null);
  const [progress, setProgress] = useState(0);
  const [inWatchlist, setInWatchlist] = useState(false);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const apiKey=import.meta.env.VITE_YOUTUBE_API;
  // YouTube link analysis
  const [youtubeData, setYoutubeData] = useState({
    type: 'unknown',
    id: null,
    playlistId: null,
    videoId: null
  });

  // Memoized fetch course function
  const fetchCourse = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch all courses and filter for the specific one
      const response = await fetch(`${API}/api/v1/courses`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch courses');
      }

      const coursesData = await response.json();
      const courseData = coursesData.data.find(course => course._id === courseId);

      if (!courseData) {
        throw new Error('Course not found');
      }

      setCourse(courseData);
    } catch (err) {
      console.error('Error fetching course:', err);
      setError(err.message || 'Failed to load course');
    } finally {
      setLoading(false);
    }
  }, [API, courseId]);

  // 1. First useEffect: Fetch the course data only
  useEffect(() => {
    if (courseId) {
      fetchCourse();
    }
  }, [fetchCourse]);

  // Memoized check watchlist function
  const checkWatchlist = useCallback(async () => {
    if (!course || !userdata?._id || !token) return;

    try {
      const watchlistResponse = await fetch(`${API}/user/watchlist`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      if (watchlistResponse.ok) {
        const watchlistData = await watchlistResponse.json();
        const isInWatchlist = watchlistData.watchlist.some(item => item._id === courseId);
        setInWatchlist(isInWatchlist);
      }
    } catch (error) {
      console.error('Error checking watchlist:', error);
    }
  }, [course, userdata, token, API, courseId]);

  // 2. Second useEffect: Check if course is in watchlist (depends on course and userdata)
  useEffect(() => {
    checkWatchlist();
    if (userdata && userdata.enrolledCourses && userdata.enrolledCourses.includes(courseId)) {
      setIsEnrolled(true);
    }
  }, [checkWatchlist, userdata, courseId]);

  // Memoized YouTube link analysis function
  const analyzeYouTubeLink = useCallback(() => {
    if (!course || !course.creator_youtube_link) {
      return;
    }

    try {
      // Ensure the URL is properly formatted
      let url = course.creator_youtube_link;
      if (!url.startsWith('http')) {
        url = 'https://' + url;
      }

      const linkType = getYouTubeUrlType(url);

      let playlistId = null;
      let videoId = null;

      if (linkType.type === 'playlist') {
        playlistId = linkType.id;
      } else if (linkType.type === 'video') {
        videoId = linkType.id;

        // Check if the video URL also contains a playlist ID
        playlistId = extractPlaylistId(url);
      } else if (linkType.type === 'channel') {
        // For channels, we don't have a specific video to show
      } else {
        // Try to extract a video ID directly as a fallback
        videoId = extractVideoId(url);
      }

      setYoutubeData({
        type: linkType.type,
        id: linkType.id,
        playlistId,
        videoId
      });
    } catch (error) {
      console.error('Error analyzing YouTube URL:', error);
    }
  }, [course]);

  // 3. Third useEffect: Analyze YouTube link (depends on course)
  useEffect(() => {
    analyzeYouTubeLink();
  }, [analyzeYouTubeLink]);

  // Memoized fetch progress function
  const fetchProgress = useCallback(async () => {
    if (!course || !userdata?._id || !token || !courseId) return;

    try {
      const response = await fetch(`${API}/progress/${courseId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setCourseProgress(data.progress);
        // Update the progress display in the UI
        if (data.progress && typeof data.progress.progress === 'number') {
          setProgress(data.progress.progress);
        }
      } else if (response.status === 404) {
        // If progress not found, it's okay - the user hasn't started this course yet
        //console.log('No progress found for this course yet');
        // We'll create progress when the user starts watching
      } else {
        console.error('Error fetching course progress:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching course progress:', error);
    }
  }, [course, userdata, token, API, courseId]);

  // 4. Fourth useEffect: Fetch course progress (depends on course and userdata)
  useEffect(() => {
    fetchProgress();
  }, [fetchProgress]);

  // Handle video selection from playlist - memoized to prevent unnecessary re-renders
  const handleVideoSelect = useCallback((video) => {
    if (!video || !video.id) {
      return;
    }

    // Scroll to the video player to show the user the video is changing
    const videoPlayerElement = document.getElementById('video-player-section');
    if (videoPlayerElement) {
      videoPlayerElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    // Ensure the video has a proper videoUrl with a valid YouTube video ID
    const videoWithUrl = {
      ...video,
      videoUrl: video.videoUrl || `https://www.youtube.com/watch?v=${video.id}`
    };

    // Force a re-render by setting to null first, then to the new video
    setSelectedVideo(null);

    // Use setTimeout to ensure the state update and re-render happens
    setTimeout(() => {
      setSelectedVideo(videoWithUrl);
    }, 50);

    // Track this video selection in user activity
    if (userdata?._id && token) {
      try {
        fetch(`${API}/activity/add`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({
            courseId,
            activityType: 'video_change',
            details: {
              videoId: video.id,
              videoTitle: video.title || 'Unknown'
            }
          })
        });
      } catch (error) {
        console.error('Error tracking video selection:', error);
      }
    }
  }, [userdata, token, API, courseId]);

  // Progress updating is commented out
  /*
  // Handle progress update
  const handleProgressUpdate = (updatedProgress) => {
    // Validate the progress data
    if (!updatedProgress || typeof updatedProgress !== 'object') {
      return;
    }

    // Update the UI with the new progress
    setCourseProgress(prev => {
      // Merge with previous progress data to ensure we don't lose any fields
      const mergedProgress = {
        ...prev,
        ...updatedProgress,
        // Ensure these fields are always present
        progress: updatedProgress.progress || (prev?.progress || 0),
        currentTime: updatedProgress.currentTime || (prev?.currentTime || 0),
        totalHoursSpent: updatedProgress.totalHoursSpent || (prev?.totalHoursSpent || 0),
        status: updatedProgress.status || (prev?.status || 'in-progress'),
        // Merge video progress data if available
        videoProgress: {
          ...(prev?.videoProgress || {}),
          ...(updatedProgress.videoProgress || {})
        }
      };

      return mergedProgress;
    });

    // Save progress to database
    saveProgressToDatabase(updatedProgress);

    // Update the progress display in the UI
    setProgress(updatedProgress.progress || 0);
  };
  */

  // Progress saving is commented out
  /*
  // Function to save progress to database
  const saveProgressToDatabase = async (progressData) => {
    if (!userdata?._id || !token || !courseId) {
      return;
    }

    try {
      // Create the request body with all possible fields
      const requestBody = {
        progress: progressData.progress || 0,
        currentVideoTime: progressData.currentTime || 0,
        totalHoursSpent: progressData.totalHoursSpent || 0,
        status: progressData.status || 'in-progress',
        videoProgress: progressData.videoProgress || {},
        currentVideoId: progressData.currentVideoId || ''
      };

      const response = await fetch(`${API}/progress/${courseId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(requestBody)
      });

      const responseData = await response.json();

      if (response.ok) {
        // Update UI with the saved progress
        setCourseProgress(responseData.progress);

        // Track progress update activity
        try {
          const activityResponse = await fetch(`${API}/activity/add`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
              courseId,
              activityType: 'progress_update',
              details: {
                progress: progressData.progress || 0,
                videoTime: progressData.currentTime || 0,
                hoursSpent: progressData.totalHoursSpent || 0
              }
            })
          });
        } catch (activityError) {
          console.error('Error tracking activity:', activityError);
        }
      }
    } catch (error) {
      console.error('Error saving progress:', error);
    }
  };
  */

  // Toggle watchlist - memoized to prevent unnecessary re-renders
  const toggleWatchlist = useCallback(async () => {
    if (!userdata?._id) {
      navigate('/login');
      return;
    }

    try {
      const response = await fetch(`${API}/user/addToWatchlist`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ courseId })
      });

      if (response.ok) {
        setInWatchlist(!inWatchlist);
      }
    } catch (error) {
      console.error('Error updating watchlist:', error);
    }
  }, [userdata, navigate, API, token, courseId, inWatchlist]);

  // Share course - memoized to prevent unnecessary re-renders
  const shareCourse = useCallback(() => {
    if (navigator.share) {
      navigator.share({
        title: course?.course_title,
        text: `Check out this course: ${course?.course_title}`,
        url: window.location.href
      });
    } else {
      // Fallback - copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  }, [course]);

  const enrollCourse = useCallback(async () => {
    if (!userdata?._id) {
      navigate('/login');
      return;
    }

    try {
      const response = await fetch(`${API}/api/courses/enroll`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ courseId })
      });

      if (response.ok) {
        setIsEnrolled(true);
        alert('Successfully enrolled in the course!');
      } else {
        alert('Failed to enroll in the course.');
      }
    } catch (error) {
      console.error('Error enrolling in course:', error);
      alert('An error occurred while enrolling in the course.');
    }
  }, [userdata, navigate, API, token, courseId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen-minus-nav">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error || !course) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h2 className={`text-2xl font-bold mb-4 ${isDark ? 'text-dark-text-primary' : 'text-light-text-primary'}`}>
            Error Loading Course
          </h2>
          <p className="text-red-500">{error || 'Course not found'}</p>
          <button
            onClick={() => navigate(-1)}
            className="mt-4 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen-minus-nav ${isDark ? 'bg-dark-bg-primary text-dark-text-primary' : 'bg-light-bg-primary text-light-text-primary'}`}>
      <div className="container mx-auto px-4 py-8">
        {/* Course Header */}
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <button
              onClick={() => navigate(-1)}
              className={`mr-4 p-2 rounded-full ${isDark ? 'hover:bg-dark-bg-tertiary' : 'hover:bg-light-bg-tertiary'} transition-colors`}
            >
              <FaArrowLeft />
            </button>
            <h1 className="text-3xl font-bold">{course.course_title}</h1>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <img
                src={course.creator_image}
                alt={course.creator_name}
                className="w-10 h-10 rounded-full mr-3"
              />
              <div className="flex flex-col">
                <span className={`${isDark ? 'text-dark-text-secondary' : 'text-light-text-secondary'}`}>
                  {course.creator_name}
                </span>

                {/* Progress indicator */}
                <div className="flex items-center mt-1">
                  <div className="w-32 bg-gray-200 rounded-full h-1.5 dark:bg-gray-700 mr-2">
                    <div
                      className="bg-primary h-1.5 rounded-full transition-all duration-300"
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {progress}% completed
                  </span>
                </div>
              </div>
            </div>

            <div className="flex space-x-3">
              <button
                onClick={toggleWatchlist}
                className={`
                  p-2 rounded-full transition-colors
                  ${inWatchlist
                    ? 'bg-primary/20 text-primary'
                    : isDark ? 'hover:bg-dark-bg-tertiary' : 'hover:bg-light-bg-tertiary'
                  }
                `}
                title={inWatchlist ? 'Remove from watchlist' : 'Add to watchlist'}
              >
                <FaBookmark />
              </button>

              <button
                onClick={shareCourse}
                className={`
                  p-2 rounded-full transition-colors
                  ${isDark ? 'hover:bg-dark-bg-tertiary' : 'hover:bg-light-bg-tertiary'}
                `}
                title="Share course"
              >
                <FaShare />
              </button>

              <button
                onClick={enrollCourse}
                disabled={isEnrolled}
                className={`
                  p-2 rounded-full transition-colors
                  ${isEnrolled ? 'bg-green-500/20 text-green-500' : isDark ? 'hover:bg-dark-bg-tertiary' : 'hover:bg-light-bg-tertiary'}
                `}
                title={isEnrolled ? 'Already Enrolled' : 'Enroll in course'}
              >
                <FaPlay />
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Video Player and Description */}
          <div className="lg:col-span-2 space-y-6">
            {/* Video Player Section */}
            <div id="video-player-section" className={`rounded-lg overflow-hidden ${isDark ? 'bg-dark-bg-secondary' : 'bg-light-bg-secondary'}`}>
              {/* Video Title */}
              {selectedVideo && (
                <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                  <h3 className={`text-xl font-bold ${isDark ? 'text-dark-text-primary' : 'text-light-text-primary'}`}>
                    {selectedVideo.title}
                  </h3>
                  <div className="flex items-center mt-1 text-sm">
                    <span className={`${isDark ? 'text-dark-text-secondary' : 'text-light-text-secondary'}`}>
                      {selectedVideo.channelTitle}
                    </span>
                    <span className="mx-2">•</span>
                    <span className={`${isDark ? 'text-dark-text-secondary' : 'text-light-text-secondary'}`}>
                      {new Date(selectedVideo.publishedAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              )}

              {/* Video Player */}
              {selectedVideo ? (
                <YouTubePlayer
                  key={selectedVideo.id} // Add key to force re-render when video changes
                  videoUrl={selectedVideo.videoUrl}
                  courseId={courseId}
                  videoId={selectedVideo.id}
                />
              ) : youtubeData.videoId ? (
                <div>
                  <YouTubePlayer
                    key={youtubeData.videoId} // Add key to force re-render when video changes
                    videoUrl={`https://www.youtube.com/watch?v=${youtubeData.videoId}`}
                    courseId={courseId}
                    videoId={youtubeData.videoId}
                  />
                </div>
              ) : (
                <div className={`aspect-video flex flex-col items-center justify-center p-6`}>
                  <p className="text-lg mb-4">No video available for direct playback</p>
                  {course.creator_youtube_link && (
                    <a
                      href={course.creator_youtube_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-2 px-4 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors flex items-center"
                    >
                      <FaPlay className="mr-2" /> Watch on YouTube
                    </a>
                  )}
                </div>
              )}

              {/* Video Actions */}
              {selectedVideo && (
                <div className="p-4 flex justify-between items-center border-t border-gray-200 dark:border-gray-700">
                  <div className="flex space-x-2">
                    <a
                      href={selectedVideo.videoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-primary hover:underline flex items-center"
                    >
                      <FaPlay className="mr-1 text-xs" /> Watch on YouTube
                    </a>
                  </div>

                  <div className="flex items-center text-sm">
                    <span className="flex items-center mr-3">
                      <FaEye className="mr-1" /> {parseInt(selectedVideo.viewCount).toLocaleString()} views
                    </span>
                    {selectedVideo.likeCount && (
                      <span className="flex items-center">
                        <FaThumbsUp className="mr-1" /> {parseInt(selectedVideo.likeCount).toLocaleString()}
                      </span>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Course Description */}
            <div className={`p-6 rounded-lg ${isDark ? 'bg-dark-bg-secondary' : 'bg-light-bg-secondary'}`}>
              <h3 className="text-xl font-bold mb-4">About this course</h3>
              <p className={`whitespace-pre-line ${isDark ? 'text-dark-text-secondary' : 'text-light-text-secondary'}`}>
                {course.description}
              </p>
            </div>

            {/* Interactive Code Playground */}
            <div className={`p-6 rounded-lg ${isDark ? 'bg-dark-bg-secondary' : 'bg-light-bg-secondary'}`}>
              <h3 className="text-xl font-bold mb-4">Try it yourself</h3>
              <p className={`mb-3 ${isDark ? 'text-dark-text-secondary' : 'text-light-text-secondary'}`}>
                Experiment with JavaScript directly below. Write code and click Run to see output instantly.
              </p>
              <CodePlayground isDark={isDark} />
            </div>

            {/* Course Modules */}
            {/* <CourseModules
              courseId={courseId}
              progress={courseProgress}
              onModuleComplete={handleProgressUpdate}
            /> */}
          </div>

          {/* Right Column - Playlist */}
          <div className="h-full sticky top-24">
            {youtubeData.playlistId && (
              <YouTubePlaylist
                playlistId={youtubeData.playlistId}
                apiKey={apiKey}
                onVideoSelect={handleVideoSelect}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoursePlayer;
