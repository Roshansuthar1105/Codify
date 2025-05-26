import mongoose from "mongoose";

const courseSchema = mongoose.Schema({
  course_category: {
    type: String,
    required: true,
  },
  course_title: {
    type: String,
    required: true,
  },
  creator_name: {
    type: String,
    required: true,
  },
  // Store YouTube content ID directly instead of full URL
  youtube_id: {
    type: String,
    required: true,
  },
  // Store the type of YouTube content
  youtube_content_type: {
    type: String,
    enum: ['video', 'playlist', 'channel'],
    default: 'playlist',
    required: true,
  },
  // Keep the original field for backward compatibility
  creator_youtube_link: {
    type: String,
  },
  creator_image: {
    type: String,
    required: true,
  },
  course_image: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

// Pre-save middleware to extract YouTube ID from link if not provided directly
courseSchema.pre('save', function(next) {
  // If youtube_id is already set, no need to extract
  if (this.youtube_id) {
    return next();
  }

  // If creator_youtube_link is provided, extract the ID
  if (this.creator_youtube_link) {
    const url = this.creator_youtube_link;

    // Extract playlist ID
    const playlistMatch = url.match(/^.*(youtu.be\/|list=)([^#\&\?]*).*/);
    if (playlistMatch && playlistMatch[2]) {
      this.youtube_id = playlistMatch[2];
      this.youtube_content_type = 'playlist';
      return next();
    }

    // Extract video ID
    const videoMatch = url.match(/^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#\&\?]*).*/);
    if (videoMatch && videoMatch[2].length === 11) {
      this.youtube_id = videoMatch[2];
      this.youtube_content_type = 'video';
      return next();
    }

    // Extract channel ID or handle
    const channelMatch = url.match(/^.*(youtube.com\/channel\/)([^#\&\?]*).*/);
    if (channelMatch && channelMatch[2]) {
      this.youtube_id = channelMatch[2];
      this.youtube_content_type = 'channel';
      return next();
    }

    const handleMatch = url.match(/^.*(youtube.com\/@)([^#\&\?\/]*).*/);
    if (handleMatch && handleMatch[2]) {
      this.youtube_id = handleMatch[2];
      this.youtube_content_type = 'channel';
      return next();
    }
  }

  next();
});

const Course = mongoose.model("Course", courseSchema);
export default Course;
