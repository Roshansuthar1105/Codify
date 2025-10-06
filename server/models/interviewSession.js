import mongoose from "mongoose";

const testCaseSchema = new mongoose.Schema({
  description: { type: String, default: "" },
  input: { type: mongoose.Schema.Types.Mixed, required: true },
  expected: { type: mongoose.Schema.Types.Mixed, required: true }
}, { _id: false });

const questionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  prompt: { type: String, required: true },
  difficulty: { type: String, enum: ["Easy", "Medium", "Hard"], required: true },
  topic: { type: String, required: true },
  type: { type: String, enum: ["function", "class", "sql", "design", "regex", "implementation"], default: "function" },
  functionName: { type: String, default: "solution" },
  starterCode: { type: String, default: "" },
  tests: { type: [testCaseSchema], default: [] }
}, { _id: false });

const resultSchema = new mongoose.Schema({
  passed: { type: Boolean, default: false },
  passedCount: { type: Number, default: 0 },
  totalTests: { type: Number, default: 0 },
  feedback: { type: String, default: "" },
  timeComplexity: { type: String, default: "" },
  spaceComplexity: { type: String, default: "" },
  testResults: { type: [mongoose.Schema.Types.Mixed], default: [] }
}, { _id: false });

const interviewSessionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  status: { type: String, enum: ["active", "submitted", "expired"], default: "active" },
  question: { type: questionSchema, required: true },
  codeSubmitted: { type: String, default: "" },
  hintsUsed: { type: Number, default: 0 },
  startedAt: { type: Date, default: Date.now },
  endedAt: { type: Date, default: null },
  durationSec: { type: Number, default: 0 },
  result: { type: resultSchema, default: () => ({}) }
}, { timestamps: true });

interviewSessionSchema.index({ userId: 1, createdAt: -1 });

const InterviewSession = mongoose.model("InterviewSession", interviewSessionSchema);
export default InterviewSession;