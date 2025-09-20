import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useAuth } from '../store/auth'; 
import AuthModal from './AuthModal/AuthModal';

// Internal feature-rich player logic
const AuthenticatedPlayer = ({ videoUrl, videoId, courseId, externalVideoId }) => {
  const { API, userdata } = useAuth();
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  const [player, setPlayer] = useState(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [courseProgress, setCourseProgress] = useState(null);
  const [error, setError] = useState(null);
  const [playerLoaded, setPlayerLoaded] = useState(false);
  const [videoLoading, setVideoLoading] = useState(true);
  const [maxWatchedTime, setMaxWatchedTime] = useState(0);
  const [videoProgressMap, setVideoProgressMap] = useState({}); // For playlists

  const progressInterval = useRef(null);
  // ✅ FIX: Use useRef to create a stable ID that persists across re-renders
  const playerContainerId = useRef(`Youtubeer-${videoId || externalVideoId}-${Math.random()}`).current;

  // Extract ID from YouTube URL if needed
  const getYouTubeVideoId = url => {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };
  const actualVideoId = videoId || getYouTubeVideoId(videoUrl);

  // Clean-up & player initialization
  useEffect(() => {
    if (!actualVideoId) {
      setError('Invalid YouTube Video ID');
      setVideoLoading(false);
      return;
    }
    setError(null);
    setVideoLoading(true);

    const initializePlayer = () => {
      const playerContainer = document.getElementById(playerContainerId);
      if (!playerContainer) {
        setError("Player container element not found.");
        setVideoLoading(false);
        return;
      }
      playerContainer.innerHTML = '';
      try {
        const newPlayer = new window.YT.Player(playerContainerId, {
          height: '100%',
          width: '100%',
          videoId: actualVideoId,
          playerVars: { 'playsinline': 1, 'rel': 0, 'modestbranding': 1, 'autoplay': 1 },
          events: {
            onReady: onPlayerReady,
            onStateChange: onPlayerStateChange,
            onError: e => {
              setError(`Error loading video (code: ${e.data})`);
              setVideoLoading(false);
            }
          }
        });
        setPlayer(newPlayer);
      } catch (err) {
        console.error("Error creating YouTube player:", err);
        setError("Failed to create video player.");
      }
    };

    if (window.YT && window.YT.Player) {
      initializePlayer();
    } else {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      window.onYouTubeIframeAPIReady = initializePlayer;
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    }

    return () => {
      clearInterval(progressInterval.current);
      if (player && typeof player.destroy === 'function') {
        player.destroy();
      }
    };
  }, [actualVideoId, playerContainerId]);

  // Fetch and restore course/video progress (retains playlist and fallback logic)
  const fetchCourseProgress = useCallback(async () => {
    if (!token || !userdata?._id || !courseId) return;
    const currentVideoId = externalVideoId || actualVideoId;
    if (!currentVideoId) return;

    try {
      const response = await fetch(`${API}/progress/${courseId}`, {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) {
        const data = await response.json();
        setCourseProgress(data.progress);

        // Playlist/Map progress support
        let progressMap = data.progress?.videoProgress;
        if (typeof progressMap !== 'object' || progressMap === null) progressMap = {};
        setVideoProgressMap(progressMap);

        // Smart fallback
        let savedTime = 0;
        const videoSpecificProgress = progressMap[currentVideoId];
        if (videoSpecificProgress && videoSpecificProgress.currentTime > 0) {
          savedTime = videoSpecificProgress.currentTime;
        } else if (data.progress?.currentVideoTime && data.progress.currentVideoTime > 0) {
          savedTime = data.progress.currentVideoTime;
        }
        if (savedTime > 0) {
          setMaxWatchedTime(savedTime);
          if (player && typeof player.seekTo === 'function') player.seekTo(savedTime, true);
        }
      }
    } catch (error) {
      console.error('Error fetching course progress:', error);
    }
  }, [API, courseId, player, token, userdata, actualVideoId, externalVideoId]);

  useEffect(() => {
    if (playerLoaded) fetchCourseProgress();
  }, [playerLoaded, fetchCourseProgress]);

  // Progress + seeking after courseProgress changes (advanced restoration)
  useEffect(() => {
    const currentVideoId = externalVideoId || actualVideoId;
    if (!currentVideoId || !player || !playerLoaded) return;
    const videoProgress = courseProgress?.videoProgress || {};
    const videoSpecificProgress = currentVideoId && videoProgress ?
      videoProgress[currentVideoId] : null;

    let savedTime = 0;
    if (videoSpecificProgress && videoSpecificProgress.currentTime > 0) {
      savedTime = videoSpecificProgress.currentTime;
    } else if (courseProgress?.currentVideoTime && courseProgress.currentVideoTime > 0) {
      savedTime = courseProgress.currentVideoTime;
    } else return;

    const currentPlayerTime = player.getCurrentTime();
    if (Math.abs(currentPlayerTime - savedTime) > 3 && currentPlayerTime < 3) {
      setTimeout(() => {
        try {
          player.seekTo(savedTime, true);
          setCurrentTime(savedTime);
        } catch (err) { console.error('Error seeking to saved position:', err); }
      }, 500);
    }
  }, [courseProgress, player, playerLoaded, actualVideoId, externalVideoId]);

  // Player ready event
  const onPlayerReady = event => {
    setPlayerLoaded(true);
    setVideoLoading(false);
    setDuration(event.target.getDuration());
    event.target.playVideo();
    // Delayed seeking after ready event (playlist/restore logic)
    setTimeout(() => {
      const currentVideoId = externalVideoId || actualVideoId;
      const videoProgress = courseProgress?.videoProgress || {};
      const videoSpecificProgress = currentVideoId && videoProgress ?
        videoProgress[currentVideoId] : null;

      let savedTime = 0;
      if (videoSpecificProgress && videoSpecificProgress.currentTime > 0) savedTime = videoSpecificProgress.currentTime;
      else if (courseProgress?.currentVideoTime && courseProgress.currentVideoTime > 0) savedTime = courseProgress.currentVideoTime;

      if (savedTime > 0) {
        setMaxWatchedTime(prevMax => Math.max(prevMax, savedTime));
        try { event.target.seekTo(savedTime, true); setCurrentTime(savedTime); } catch (err) {}
      }
      event.target.playVideo();
    }, 500);
  };

  // Player state change event (retains advanced interval/cleanup)
  const onPlayerStateChange = event => {
    const playerState = event.data;
    setVideoLoading(playerState === 3);

    if (playerState === 1) { // Playing
      setIsPlaying(true);
      if (progressInterval.current) clearInterval(progressInterval.current);
      progressInterval.current = setInterval(() => {
        if (player && typeof player.getCurrentTime === 'function') {
          const newCurrentTime = player.getCurrentTime();
          const newDuration = player.getDuration();
          setCurrentTime(newCurrentTime);
          setDuration(newDuration);
          setMaxWatchedTime(prev => Math.max(prev, newCurrentTime));
          if (newDuration > 0) {
            setProgress(Math.round((newCurrentTime / newDuration) * 100));
          }
        }
      }, 1000);
    } else { // Paused, Ended...
      setIsPlaying(false);
      clearInterval(progressInterval.current);
      progressInterval.current = null;
    }
  };

  const formatTime = seconds => {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  };

  if (error) {
    return (
      <div className="aspect-video flex items-center justify-center bg-black text-white p-4">
        <p className="text-red-500 text-center">{error}</p>
        <p className="text-gray-400 text-sm">There was a problem loading the video. Please try again later or check the URL.</p>
      </div>
    );
  }

  return (
    <div className="w-full h-full relative">
      <div id={playerContainerId} className="w-full h-full"></div>
      {videoLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/70 z-10">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      )}
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent pointer-events-none">
        <div className="flex justify-between items-center mb-2 text-white">
          <div className="text-xs font-mono">
            <span>{formatTime(currentTime)} / {formatTime(duration)}</span>
            <span className="ml-2 text-gray-400">(Max: {formatTime(maxWatchedTime)})</span>
          </div>
          <span className="text-sm font-medium">{progress}% completed</span>
        </div>
        <div className="w-full bg-white/20 rounded-full h-2">
          <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${progress}%` }}></div>
        </div>
      </div>
    </div>
  );
};

// Main authentication gate wrapper
const YouTubePlayer = ({ videoUrl, videoId, thumbnailUrl, courseId, externalVideoId }) => {
  const { isLoggedIn } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [playVideo, setPlayVideo] = useState(false);

  const handlePlayClick = () => {
    if (isLoggedIn) setPlayVideo(true);
    else setShowModal(true);
  };

  useEffect(() => { setPlayVideo(false); }, [videoId]);

  return (
    <>
      <div className="aspect-video w-full relative bg-black rounded-lg overflow-hidden">
        {isLoggedIn && playVideo ? (
          <AuthenticatedPlayer 
            videoUrl={videoUrl}
            videoId={videoId}
            courseId={courseId}
            externalVideoId={externalVideoId}
          />
        ) : (
          <div 
            className="group w-full h-full cursor-pointer relative flex justify-center items-center overflow-hidden" 
            onClick={handlePlayClick}
          >
            <img 
              src={thumbnailUrl || `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`} 
              alt="Video Thumbnail" 
              className="w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105" 
              onError={e => { e.target.onerror = null; e.target.src=`https://i.ytimg.com/vi/${videoId}/sddefault.jpg`}}
            />
            <div className="absolute inset-0 bg-black/40 flex justify-center items-center transition-colors duration-300 ease-in-out group-hover:bg-black/60">
              <div className="text-6xl text-white drop-shadow-lg scale-100 transition-transform duration-200 ease-in-out group-hover:scale-110">
                ▶
              </div>
            </div>
            {!isLoggedIn && (
              <p className="absolute bottom-5 text-white font-bold bg-black/70 py-1.5 px-4 rounded-full text-sm backdrop-blur-sm border border-white/20">
                Log In to Watch
              </p>
            )}
          </div>
        )}
      </div>
      <AuthModal isOpen={showModal} onClose={() => setShowModal(false)} />
    </>
  );
};

export default YouTubePlayer;