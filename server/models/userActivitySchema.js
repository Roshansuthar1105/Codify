import mongoose from "mongoose";

const userActivitySchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  activityType: {
    type: String,
    enum: [
      'started_course',
      'completed_module',
      'completed_course',
      'added_to_watchlist',
      'removed_from_watchlist',
      'watchlist_update',
      'video_change',
      'course_select',
      'progress_update',
      'course_enrolled'
    ],
    required: true
  },
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true
  },
  moduleId: {
    type: String,
    default: null
  },
  moduleName: {
    type: String,
    default: null
  },
  // Additional details for the activity (flexible schema)
  details: {
    type: Object,
    default: {}
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

const UserActivity = mongoose.model("UserActivity", userActivitySchema);
export default UserActivity;
