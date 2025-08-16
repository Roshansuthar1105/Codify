/**
 * Utility functions for interacting with YouTube data
 */

/**
 * Extract the playlist ID from a YouTube playlist URL
 * @param {string} url - YouTube playlist URL
 * @returns {string|null} - Playlist ID or null if not found
 */
export const extractPlaylistId = (url) => {
  if (!url) return null;

  // Match playlist ID from various YouTube playlist URL formats
  const regExp = /^.*(youtu.be\/|list=)([^#\&\?]*).*/;
  const match = url.match(regExp);

  return (match && match[2]) ? match[2] : null;
};

/**
 * Extract the video ID from a YouTube video URL
 * @param {string} url - YouTube video URL
 * @returns {string|null} - Video ID or null if not found
 */
export const extractVideoId = (url) => {
  if (!url) return null;

  // Match video ID from various YouTube URL formats
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);

  return (match && match[2].length === 11) ? match[2] : null;
};

/**
 * Extract the channel ID or handle from a YouTube channel URL
 * @param {string} url - YouTube channel URL
 * @returns {object|null} - Object with type and id, or null if not found
 */
export const extractChannelInfo = (url) => {
  if (!url) return null;

  // Match channel ID
  let regExp = /^.*(youtube.com\/channel\/)([^#\&\?]*).*/;
  let match = url.match(regExp);

  if (match && match[2]) {
    return { type: 'id', id: match[2] };
  }

  // Match channel handle (@username)
  regExp = /^.*(youtube.com\/@)([^#\&\?\/]*).*/;
  match = url.match(regExp);

  if (match && match[2]) {
    return { type: 'handle', id: match[2] };
  }

  // Match custom URL
  regExp = /^.*(youtube.com\/c\/)([^#\&\?\/]*).*/;
  match = url.match(regExp);

  if (match && match[2]) {
    return { type: 'custom', id: match[2] };
  }

  return null;
};

/**
 * Determine the type of YouTube URL
 * @param {string} url - YouTube URL
 * @returns {object} - Object with type and id
 */
export const getYouTubeUrlType = (url) => {
  if (!url) return { type: 'unknown', id: null };

  const playlistId = extractPlaylistId(url);
  if (playlistId) {
    return { type: 'playlist', id: playlistId };
  }

  const videoId = extractVideoId(url);
  if (videoId) {
    return { type: 'video', id: videoId };
  }

  const channelInfo = extractChannelInfo(url);
  if (channelInfo) {
    return { type: 'channel', ...channelInfo };
  }

  return { type: 'unknown', id: null };
};

/**
 * Fetch playlist data from YouTube Data API
 * @param {string} playlistId - YouTube playlist ID
 * @param {string} apiKey - YouTube Data API key
 * @param {number} maxResults - Maximum number of videos to fetch (default: 50)
 * @returns {Promise<Array>} - Array of video data objects
 */
export const fetchPlaylistData = async (playlistId, apiKey, maxResults = 50) => {
  if (!playlistId) {
    throw new Error('Playlist ID is required');
  }

  // If no API key is provided, use a mock response for development
  if (!apiKey) {
    return mockPlaylistData(playlistId);
  }

  try {
    // Initial request to get playlist items
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet,contentDetails&maxResults=${maxResults}&playlistId=${playlistId}&key=${apiKey}`
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error.message || 'Failed to fetch playlist data');
    }

    const data = await response.json();

    // Extract video IDs to get additional details
    const videoIds = data.items.map(item => item.contentDetails.videoId).join(',');

    // Get video details (duration, view count, etc.)
    const videoDetailsResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?part=contentDetails,statistics,snippet&id=${videoIds}&key=${apiKey}`
    );

    if (!videoDetailsResponse.ok) {
      const error = await videoDetailsResponse.json();
      throw new Error(error.error.message || 'Failed to fetch video details');
    }

    const videoDetails = await videoDetailsResponse.json();

    // Map video details to playlist items
    const videos = data.items.map(item => {
      const videoId = item.contentDetails.videoId;
      const details = videoDetails.items.find(video => video.id === videoId);

      return {
        id: videoId,
        title: item.snippet.title,
        description: item.snippet.description,
        thumbnails: item.snippet.thumbnails,
        position: item.snippet.position,
        publishedAt: item.snippet.publishedAt,
        channelTitle: item.snippet.channelTitle,
        channelId: item.snippet.channelId,
        videoUrl: `https://www.youtube.com/watch?v=${videoId}`,
        duration: details ? details.contentDetails.duration : null,
        viewCount: details ? details.statistics.viewCount : null,
        likeCount: details ? details.statistics.likeCount : null
      };
    });

    return {
      playlistId,
      videos,
      pageInfo: data.pageInfo,
      nextPageToken: data.nextPageToken || null
    };
  } catch (error) {
    console.error('Error fetching YouTube playlist data:', error);
    throw error;
  }
};

/**
 * Parse YouTube video duration from ISO 8601 format to human-readable format
 * @param {string} duration - ISO 8601 duration (e.g., "PT1H30M15S")
 * @returns {string} - Human-readable duration (e.g., "1:30:15")
 */
export const parseDuration = (duration) => {
  if (!duration) return '0:00';

  const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);

  const hours = match[1] ? parseInt(match[1].replace('H', '')) : 0;
  const minutes = match[2] ? parseInt(match[2].replace('M', '')) : 0;
  const seconds = match[3] ? parseInt(match[3].replace('S', '')) : 0;

  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }

  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
};

/**
 * Format view count to human-readable format
 * @param {number|string} count - View count
 * @returns {string} - Formatted view count (e.g., "1.5M")
 */
export const formatViewCount = (count) => {
  if (!count) return '0 views';

  const num = typeof count === 'string' ? parseInt(count) : count;

  if (num >= 1000000) {
    return `${(num / 1000000).toFixed(1)}M views`;
  }

  if (num >= 1000) {
    return `${(num / 1000).toFixed(1)}K views`;
  }

  return `${num} views`;
};

/**
 * Generate mock playlist data for development without API key
 * @param {string} playlistId - YouTube playlist ID
 * @returns {object} - Mock playlist data
 */
const mockPlaylistData = (playlistId) => {
  // Sample video titles for programming courses
  const videoTitles = [
    'Introduction to Web Development',
    'HTML Fundamentals',
    'CSS Styling Basics',
    'JavaScript Essentials',
    'DOM Manipulation',
    'Responsive Design Principles',
    'Working with APIs',
    'Introduction to React',
    'State Management in React',
    'Building a Full Stack Application'
  ];

  // Sample thumbnail images that actually exist
  const thumbnailUrls = [
    'https://i.ytimg.com/vi/PkZNo7MFNFg/hqdefault.jpg',
    'https://i.ytimg.com/vi/W6NZfCO5SIk/hqdefault.jpg',
    'https://i.ytimg.com/vi/1Rs2ND1ryYc/hqdefault.jpg',
    'https://i.ytimg.com/vi/hdI2bqOjy3c/hqdefault.jpg',
    'https://i.ytimg.com/vi/DLX62G4lc44/hqdefault.jpg',
    'https://i.ytimg.com/vi/8zKuNo4ay8E/hqdefault.jpg',
    'https://i.ytimg.com/vi/7A5X_iwWdvw/hqdefault.jpg',
    'https://i.ytimg.com/vi/w7ejDZ8SWv8/hqdefault.jpg',
    'https://i.ytimg.com/vi/4UZrsTqkcW4/hqdefault.jpg',
    'https://i.ytimg.com/vi/a_7Z7C_JCyo/hqdefault.jpg'
  ];

  // Real YouTube video IDs for programming tutorials
  const realVideoIds = [
    'PkZNo7MFNFg', // JavaScript tutorial
    'W6NZfCO5SIk', // JavaScript for beginners
    '1Rs2ND1ryYc', // CSS tutorial
    'hdI2bqOjy3c', // JavaScript crash course
    'DLX62G4lc44', // Node.js tutorial
    '8zKuNo4ay8E', // React tutorial
    '7A5X_iwWdvw', // MongoDB tutorial
    'w7ejDZ8SWv8', // React crash course
    '4UZrsTqkcW4', // React tutorial for beginners
    'a_7Z7C_JCyo'  // MERN stack tutorial
  ];

  // Generate 10 mock videos with real thumbnails and real video IDs
  const videos = Array.from({ length: 10 }, (_, i) => ({
    id: realVideoIds[i],
    title: videoTitles[i],
    description: `Learn about ${videoTitles[i]} in this comprehensive tutorial for beginners and intermediate developers.`,
    thumbnails: {
      default: { url: thumbnailUrls[i], width: 120, height: 90 },
      medium: { url: thumbnailUrls[i], width: 320, height: 180 },
      high: { url: thumbnailUrls[i], width: 480, height: 360 }
    },
    position: i,
    publishedAt: new Date(Date.now() - i * 86400000).toISOString(), // Each video 1 day apart
    channelTitle: 'Codify Learning',
    channelId: 'sample-channel-id',
    videoUrl: `https://www.youtube.com/watch?v=${realVideoIds[i]}`,
    duration: `PT${Math.floor(15 + Math.random() * 45)}M${Math.floor(Math.random() * 60)}S`, // 15-60 minutes
    viewCount: `${Math.floor(10000 + Math.random() * 990000)}`,
    likeCount: `${Math.floor(1000 + Math.random() * 9000)}`
  }));

  return {
    playlistId,
    videos,
    pageInfo: {
      totalResults: 10,
      resultsPerPage: 10
    },
    nextPageToken: null
  };
};

/**
 * Get YouTube API key from environment variables
 * @returns {string|null} - YouTube API key or null if not available
 */
export const getYouTubeApiKey = () => {
  // In a real production app, this would come from environment variables
  // For now, we'll return null to use mock data
  return process.env.REACT_APP_YOUTUBE_API_KEY || null;
};

/**
 * Fetch channel information including profile image from YouTube Data API
 * @param {string} channelId - YouTube channel ID
 * @param {string} apiKey - YouTube Data API key (optional)
 * @returns {Promise<object>} - Channel data including profile image
 */
export const fetchChannelData = async (channelId, apiKey = null) => {
  if (!channelId) {
    throw new Error('Channel ID is required');
  }

  // Use provided API key or get from environment
  const key = apiKey || getYouTubeApiKey();

  // If no API key is provided, return mock data for development
  if (!key) {
    return mockChannelData(channelId);
  }

  try {
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics&id=${channelId}&key=${key}`
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error.message || 'Failed to fetch channel data');
    }

    const data = await response.json();
    
    if (data.items && data.items.length > 0) {
      const channel = data.items[0];
      return {
        id: channel.id,
        title: channel.snippet.title,
        description: channel.snippet.description,
        profileImage: channel.snippet.thumbnails?.default?.url || 
                     channel.snippet.thumbnails?.medium?.url || 
                     channel.snippet.thumbnails?.high?.url,
        subscriberCount: channel.statistics?.subscriberCount,
        videoCount: channel.statistics?.videoCount,
        viewCount: channel.statistics?.viewCount,
        publishedAt: channel.snippet.publishedAt
      };
    }

    throw new Error('Channel not found');
  } catch (error) {
    console.error('Error fetching YouTube channel data:', error);
    throw error;
  }
};

/**
 * Generate mock channel data for development without API key
 * @param {string} channelId - YouTube channel ID
 * @returns {object} - Mock channel data
 */
const mockChannelData = (channelId) => {
  // Map known channel IDs to their EXACT profile images from courses.json
  const knownChannels = {
    'UCeVMnSShP_Iviwkknt83cww': { // CodeWithHarry - EXACT image from courses.json
      title: 'CodeWithHarry',
      profileImage: 'https://yt3.ggpht.com/ytc/AIdro_kotL-OQVXsay2vKRujBvNWcY47UZUwC-axNozc8Mzdutk=s88-c-k-c0x00ffffff-no-rj'
    },
    'UCBwmMxybNva6P_5VmxjzwqA': { // Apna College - EXACT image from courses.json
      title: 'Apna College',
      profileImage: 'https://yt3.ggpht.com/ytc/AMLnZu8dZQJYCt6Ffcd-pl113huuo_HJ3PpvgkyFk5FkrQ=s176-c-k-c0x00ffffff-no-rj'
    },
    'UCbWZFD-vbGYHkyz4cdyfldQ': { // CodeHelp - EXACT image from courses.json
      title: 'CodeHelp - by Babbar',
      profileImage: 'https://yt3.ggpht.com/ytc/AMLnZu_PjRc81p0qP-ZPWxv8aY4k-4gFRzGEYs3HWbIQ=s176-c-k-c0x00ffffff-no-rj'
    }
  };

  const channel = knownChannels[channelId];
  
  if (channel) {
    return {
      id: channelId,
      title: channel.title,
      profileImage: channel.profileImage,
      subscriberCount: '100K+',
      videoCount: '50+',
      viewCount: '1M+',
      publishedAt: '2020-01-01T00:00:00Z'
    };
  }

  // Return generic mock data for unknown channels
  return {
    id: channelId,
    title: 'Unknown Channel',
    profileImage: `https://ui-avatars.com/api/?name=Channel&background=random&size=88`,
    subscriberCount: '10K+',
    videoCount: '20+',
    viewCount: '100K+',
    publishedAt: '2020-01-01T00:00:00Z'
  };
};
