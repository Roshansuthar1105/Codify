/**
 * Migration script to update existing courses with youtube_id and youtube_content_type
 * 
 * Run this script with: node scripts/migrateYoutubeIds.js
 */

import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Course from '../models/courseSchema.js';

dotenv.config();

// Function to extract YouTube IDs from URLs
const extractYouTubeInfo = (url) => {
  if (!url) return { id: null, type: null };
  
  // Extract playlist ID
  const playlistMatch = url.match(/^.*(youtu.be\/|list=)([^#\&\?]*).*/);
  if (playlistMatch && playlistMatch[2]) {
    return { id: playlistMatch[2], type: 'playlist' };
  }
  
  // Extract video ID
  const videoMatch = url.match(/^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#\&\?]*).*/);
  if (videoMatch && videoMatch[2].length === 11) {
    return { id: videoMatch[2], type: 'video' };
  }
  
  // Extract channel ID or handle
  const channelMatch = url.match(/^.*(youtube.com\/channel\/)([^#\&\?]*).*/);
  if (channelMatch && channelMatch[2]) {
    return { id: channelMatch[2], type: 'channel' };
  }
  
  const handleMatch = url.match(/^.*(youtube.com\/@)([^#\&\?\/]*).*/);
  if (handleMatch && handleMatch[2]) {
    return { id: handleMatch[2], type: 'channel' };
  }
  
  return { id: null, type: null };
};

// Connect to MongoDB
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

// Main migration function
const migrateCourses = async () => {
  try {
    // Connect to the database
    const conn = await connectDB();
    
    // Get all courses
    const courses = await Course.find({});
    console.log(`Found ${courses.length} courses to migrate`);
    
    let updated = 0;
    let skipped = 0;
    let failed = 0;
    
    // Process each course
    for (const course of courses) {
      // Skip if already has youtube_id
      if (course.youtube_id) {
        console.log(`Skipping course ${course._id}: already has youtube_id`);
        skipped++;
        continue;
      }
      
      // Extract YouTube info from creator_youtube_link
      if (course.creator_youtube_link) {
        const { id, type } = extractYouTubeInfo(course.creator_youtube_link);
        
        if (id && type) {
          // Update the course
          course.youtube_id = id;
          course.youtube_content_type = type;
          
          try {
            await course.save();
            console.log(`Updated course ${course._id}: ${type} ID ${id}`);
            updated++;
          } catch (error) {
            console.error(`Failed to update course ${course._id}: ${error.message}`);
            failed++;
          }
        } else {
          console.error(`Could not extract YouTube info from URL: ${course.creator_youtube_link}`);
          failed++;
        }
      } else {
        console.error(`Course ${course._id} has no creator_youtube_link`);
        failed++;
      }
    }
    
    console.log(`
Migration complete:
- Updated: ${updated}
- Skipped: ${skipped}
- Failed: ${failed}
- Total: ${courses.length}
    `);
    
    // Close the connection
    await mongoose.connection.close();
    console.log('Database connection closed');
    
  } catch (error) {
    console.error(`Migration failed: ${error.message}`);
    process.exit(1);
  }
};

// Run the migration
migrateCourses();
