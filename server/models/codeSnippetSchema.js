import mongoose from "mongoose";

const codeSnippetSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
    default: 'Untitled Snippet'
  },
  fileName: {
    type: String,
    required: true
  },
  language: {
    type: String,
    required: true,
    enum: ['javascript', 'python', 'cpp', 'java'],
    default: 'javascript'
  },
  code: {
    type: String,
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  isPublic: {
    type: Boolean,
    default: false
  },
  tags: [{
    type: String,
    maxlength: 20
  }],
  description: {
    type: String,
    maxlength: 500
  },
  forkCount: {
    type: Number,
    default: 0
  },
  parentSnippet: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'CodeSnippet',
    default: null
  },
  executionCount: {
    type: Number,
    default: 0
  },
  lastExecuted: {
    type: Date,
    default: null
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Indexes for better query performance
codeSnippetSchema.index({ user: 1, createdAt: -1 });
codeSnippetSchema.index({ language: 1, isPublic: 1 });
codeSnippetSchema.index({ tags: 1, isPublic: 1 });

// Pre-save middleware to update the updatedAt field
codeSnippetSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

const CodeSnippet = mongoose.model("CodeSnippet", codeSnippetSchema);
export default CodeSnippet;
