import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useTheme } from '../context/ThemeContext';
import { fetchPlaylistData, parseDuration, formatViewCount } from '../utils/youtubeUtils';
import { FaPlay, FaClock, FaEye, FaThumbsUp } from 'react-icons/fa';

const YouTubePlaylist = ({ playlistId, apiKey, onVideoSelect }) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [playlistData, setPlaylistData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedVideoId, setSelectedVideoId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [videosPerPage] = useState(5); // Show 5 videos per page
  const dataFetchedRef = useRef(false);
  const previousPlaylistIdRef = useRef(playlistId);
  const playlistRef = useRef(null); // Reference to the playlist container

  // Memoize the handleVideoSelect function to prevent unnecessary re-renders
  const handleVideoSelect = useCallback((video) => {
    if (!video || !video.id) {
      return;
    }

    setSelectedVideoId(video.id);

    if (onVideoSelect) {
      // Ensure the video has a proper videoUrl with a valid YouTube video ID
      const videoWithUrl = {
        ...video,
        videoUrl: `https://www.youtube.com/watch?v=${video.id}`
      };
      onVideoSelect(videoWithUrl);
    }
  }, [onVideoSelect]);

  useEffect(() => {
    // Only fetch data if playlistId changes or on first render
    if (dataFetchedRef.current && playlistId === previousPlaylistIdRef.current) {
      return; // Skip if we've already fetched this playlist
    }

    const loadPlaylistData = async () => {
      try {
        setLoading(true);
        setError(null);

        if (!playlistId) {
          setError('No playlist ID provided');
          setLoading(false);
          return;
        }

        // Use empty string for apiKey to use mock data in development
        const data = await fetchPlaylistData(playlistId, apiKey || '');

        // Only update state if the component is still mounted and playlistId hasn't changed
        if (playlistId === previousPlaylistIdRef.current) {
          console.log("playlist : ",data)
          setPlaylistData(data);

          // Auto-select the first video if available
          if (data.videos && data.videos.length > 0 && data.videos[0].id) {
            setSelectedVideoId(data.videos[0].id);

            if (onVideoSelect) {
              // Ensure the video has a proper videoUrl with a valid YouTube video ID
              const firstVideo = {
                ...data.videos[0],
                videoUrl: `https://www.youtube.com/watch?v=${data.videos[0].id}`
              };
              onVideoSelect(firstVideo);
            }
          }

          dataFetchedRef.current = true;
        }
      } catch (err) {
        console.error('Error loading playlist data:', err);
        setError(err.message || 'Failed to load playlist data');
      } finally {
        setLoading(false);
      }
    };

    if (playlistId) {
      previousPlaylistIdRef.current = playlistId;
      loadPlaylistData();
    } else {
      setLoading(false);
      setError('No playlist ID provided');
    }

    // Cleanup function
    return () => {
      // If the component unmounts or playlistId changes, we'll need to fetch again
      if (playlistId !== previousPlaylistIdRef.current) {
        dataFetchedRef.current = false;
      }
    };
  }, [playlistId, apiKey]); // Remove onVideoSelect from dependencies

  if (loading) {
    return (
      <div className={`p-4 rounded-lg ${isDark ? 'bg-dark-bg-secondary' : 'bg-light-bg-secondary'} shadow-md`}>
        <div className="flex justify-center items-center h-40">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`p-6 rounded-lg ${isDark ? 'bg-dark-bg-secondary' : 'bg-light-bg-secondary'} shadow-md`}>
        <div className="text-center mb-4">
          <p className="font-bold text-red-500 mb-2">Error loading playlist</p>
          <p className={`${isDark ? 'text-dark-text-secondary' : 'text-light-text-secondary'} mb-4`}>
            {error}
          </p>
          {playlistId && (
            <a
              href={`https://www.youtube.com/playlist?list=${playlistId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors"
            >
              <FaPlay className="mr-2" /> View on YouTube
            </a>
          )}
        </div>
      </div>
    );
  }

  if (!playlistData || !playlistData.videos || playlistData.videos.length === 0) {
    return (
      <div className={`p-6 rounded-lg ${isDark ? 'bg-dark-bg-secondary' : 'bg-light-bg-secondary'} shadow-md`}>
        <div className="text-center">
          <p className={`font-bold mb-4 ${isDark ? 'text-dark-text-primary' : 'text-light-text-primary'}`}>
            No videos found in this playlist
          </p>
          {playlistId && (
            <a
              href={`https://www.youtube.com/playlist?list=${playlistId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors"
            >
              <FaPlay className="mr-2" /> View on YouTube
            </a>
          )}
        </div>
      </div>
    );
  }

  // Calculate pagination
  const indexOfLastVideo = currentPage * videosPerPage;
  const indexOfFirstVideo = indexOfLastVideo - videosPerPage;
  const currentVideos = playlistData?.videos ? playlistData.videos.slice(indexOfFirstVideo, indexOfLastVideo) : [];
  const totalPages = playlistData?.videos ? Math.ceil(playlistData.videos.length / videosPerPage) : 0;

  // Change page
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    // Scroll to top of playlist when changing pages
    if (playlistRef.current) {
      playlistRef.current.scrollTop = 0;
    }
  };

  // Go to next page
  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      // Scroll to top of playlist when changing pages
      if (playlistRef.current) {
        playlistRef.current.scrollTop = 0;
      }
    }
  };

  // Go to previous page
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      // Scroll to top of playlist when changing pages
      if (playlistRef.current) {
        playlistRef.current.scrollTop = 0;
      }
    }
  };

  return (
    <div className={`rounded-lg overflow-hidden ${isDark ? 'bg-dark-bg-secondary' : 'bg-light-bg-secondary'} shadow-md flex flex-col h-full`}>
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <h3 className={`text-xl font-bold ${isDark ? 'text-dark-text-primary' : 'text-light-text-primary'}`}>
          Playlist Videos
        </h3>
        <div className="flex justify-between items-center mt-1">
          <p className={`text-sm ${isDark ? 'text-dark-text-secondary' : 'text-light-text-secondary'}`}>
            {playlistData.videos.length} videos
          </p>
          {playlistId && (
            <a
              href={`https://www.youtube.com/playlist?list=${playlistId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-primary hover:underline"
            >
              View on YouTube
            </a>
          )}
        </div>
      </div>

      {/* Scrollable playlist container */}
      <div
        ref={playlistRef}
        className="divide-y divide-gray-200 dark:divide-gray-700 overflow-y-auto flex-grow custom-scrollbar"
        style={{
          maxHeight: 'calc(100vh - 120px)',
          scrollBehavior: 'smooth',
          overflowX: 'hidden'
        }}
      >
        {currentVideos.map((video) => (
          <div
            key={video.id}
            className={`
              flex p-4 cursor-pointer transition-all
              ${selectedVideoId === video.id
                ? isDark
                  ? 'bg-dark-bg-tertiary border-l-4 border-primary'
                  : 'bg-light-bg-tertiary border-l-4 border-primary'
                : isDark
                  ? 'hover:bg-dark-bg-tertiary'
                  : 'hover:bg-light-bg-tertiary'
              }
            `}
            onClick={() => handleVideoSelect(video)}
          >
            {/* Thumbnail */}
            <div className="relative w-40 h-24 flex-shrink-0 rounded overflow-hidden mr-4">
              <img
                src={video.thumbnails.medium?.url || video.thumbnails.default?.url}
                alt={video.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                <FaPlay className="text-white text-2xl" />
              </div>
              <div className="absolute bottom-1 right-1 bg-black/80 text-white text-xs px-1 py-0.5 rounded">
                {parseDuration(video.duration)}
              </div>
            </div>

            {/* Video Info */}
            <div className="flex-1 min-w-0">
              <h4 className={`font-medium line-clamp-2 ${isDark ? 'text-dark-text-primary' : 'text-light-text-primary'}`}>
                {video.title}
              </h4>

              <p className={`text-sm mt-1 ${isDark ? 'text-dark-text-secondary' : 'text-light-text-secondary'}`}>
                {video.channelTitle}
              </p>

              {/* Description Preview */}
              {video.description && (
                <p className={`text-xs mt-1 line-clamp-2 ${isDark ? 'text-dark-text-tertiary' : 'text-light-text-tertiary'}`}>
                  {video.description}
                </p>
              )}

              <div className="flex flex-wrap items-center mt-2 text-xs space-x-2">
                <span className="flex items-center">
                  <FaEye className="mr-1" />
                  {formatViewCount(video.viewCount)}
                </span>
                {video.likeCount && (
                  <span className="flex items-center">
                    <FaThumbsUp className="mr-1" />
                    {parseInt(video.likeCount).toLocaleString()}
                  </span>
                )}
                <span className="flex items-center">
                  <FaClock className="mr-1" />
                  {new Date(video.publishedAt).toLocaleDateString()}
                </span>

                {/* Currently Playing Indicator */}
                {selectedVideoId === video.id && (
                  <span className="ml-auto px-2 py-0.5 bg-primary/20 text-primary rounded-full text-xs">
                    Now Playing
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="p-4 border-t border-gray-200 dark:border-gray-700 flex justify-between items-center">
          <button
            onClick={prevPage}
            disabled={currentPage === 1}
            className={`px-3 py-1.5 rounded-md flex items-center ${
              currentPage === 1
                ? 'opacity-50 cursor-not-allowed'
                : isDark
                  ? 'hover:bg-dark-bg-tertiary text-primary'
                  : 'hover:bg-light-bg-tertiary text-primary'
            }`}
            aria-label="Previous page"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Prev
          </button>

          <div className="flex space-x-1">
            {totalPages <= 5 ? (
              // If 5 or fewer pages, show all page numbers
              [...Array(totalPages).keys()].map((number) => (
                <button
                  key={number + 1}
                  onClick={() => paginate(number + 1)}
                  className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                    currentPage === number + 1
                      ? 'bg-primary text-white'
                      : isDark
                        ? 'text-dark-text-primary hover:bg-dark-bg-tertiary'
                        : 'text-light-text-primary hover:bg-light-bg-tertiary'
                  }`}
                  aria-label={`Page ${number + 1}`}
                  aria-current={currentPage === number + 1 ? 'page' : undefined}
                >
                  {number + 1}
                </button>
              ))
            ) : (
              // If more than 5 pages, show a limited set with ellipsis
              <>
                {/* Always show first page */}
                <button
                  onClick={() => paginate(1)}
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    currentPage === 1
                      ? 'bg-primary text-white'
                      : isDark
                        ? 'text-dark-text-primary hover:bg-dark-bg-tertiary'
                        : 'text-light-text-primary hover:bg-light-bg-tertiary'
                  }`}
                  aria-label="Page 1"
                  aria-current={currentPage === 1 ? 'page' : undefined}
                >
                  1
                </button>

                {/* Show ellipsis if not on pages 1-3 */}
                {currentPage > 3 && (
                  <span className={`w-8 h-8 flex items-center justify-center ${isDark ? 'text-dark-text-secondary' : 'text-light-text-secondary'}`}>
                    ...
                  </span>
                )}

                {/* Show current page and neighbors */}
                {[...Array(totalPages).keys()]
                  .filter(n => {
                    const pageNum = n + 1;
                    return (
                      pageNum !== 1 &&
                      pageNum !== totalPages &&
                      (Math.abs(pageNum - currentPage) <= 1 ||
                       (currentPage <= 3 && pageNum <= 4) ||
                       (currentPage >= totalPages - 2 && pageNum >= totalPages - 3))
                    );
                  })
                  .map(number => (
                    <button
                      key={number + 1}
                      onClick={() => paginate(number + 1)}
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        currentPage === number + 1
                          ? 'bg-primary text-white'
                          : isDark
                            ? 'text-dark-text-primary hover:bg-dark-bg-tertiary'
                            : 'text-light-text-primary hover:bg-light-bg-tertiary'
                      }`}
                      aria-label={`Page ${number + 1}`}
                      aria-current={currentPage === number + 1 ? 'page' : undefined}
                    >
                      {number + 1}
                    </button>
                  ))
                }

                {/* Show ellipsis if not on last 3 pages */}
                {currentPage < totalPages - 2 && (
                  <span className={`w-8 h-8 flex items-center justify-center ${isDark ? 'text-dark-text-secondary' : 'text-light-text-secondary'}`}>
                    ...
                  </span>
                )}

                {/* Always show last page */}
                <button
                  onClick={() => paginate(totalPages)}
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    currentPage === totalPages
                      ? 'bg-primary text-white'
                      : isDark
                        ? 'text-dark-text-primary hover:bg-dark-bg-tertiary'
                        : 'text-light-text-primary hover:bg-light-bg-tertiary'
                  }`}
                  aria-label={`Page ${totalPages}`}
                  aria-current={currentPage === totalPages ? 'page' : undefined}
                >
                  {totalPages}
                </button>
              </>
            )}
          </div>

          <button
            onClick={nextPage}
            disabled={currentPage === totalPages}
            className={`px-3 py-1.5 rounded-md flex items-center ${
              currentPage === totalPages
                ? 'opacity-50 cursor-not-allowed'
                : isDark
                  ? 'hover:bg-dark-bg-tertiary text-primary'
                  : 'hover:bg-light-bg-tertiary text-primary'
            }`}
            aria-label="Next page"
          >
            Next
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
};

export default YouTubePlaylist;
