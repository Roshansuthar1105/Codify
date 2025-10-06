import InterviewSession from "../models/interviewSession.js";
import { getIO, startSessionTimer, stopSessionTimer } from "../utils/socket.js";

// DEV MODE: In-memory storage for testing when DB is read-only
const inMemorySessions = new Map();
let sessionIdCounter = 1;

// Fallback bank when no AI keys are configured
const fallbackBank = [
  // Easy - DSA
  {
    title: "Two Sum",
    prompt: "Given an array of integers 'nums' and an integer 'target', return indices of the two numbers that add up to target.\n\nExample:\nInput: nums = [2,7,11,15], target = 9\nOutput: [0,1]\nExplanation: nums[0] + nums[1] = 2 + 7 = 9\n\nConstraints:\n- 2 <= nums.length <= 10^4\n- Each input has exactly one solution\n- You may not use the same element twice",
    difficulty: "Easy",
    topic: "DSA",
    type: "function",
    functionName: "twoSum",
    starterCode: "function twoSum(nums, target) {\n  // Your code here\n  // Time: O(?), Space: O(?)\n}\n",
    tests: [
      { description: "Example 1", input: { nums: [2,7,11,15], target: 9 }, expected: [0,1] },
      { description: "Example 2", input: { nums: [3,2,4], target: 6 }, expected: [1,2] },
      { description: "Example 3", input: { nums: [3,3], target: 6 }, expected: [0,1] },
      { description: "Single pair", input: { nums: [1,2], target: 3 }, expected: [0,1] },
      { description: "Larger array", input: { nums: [5,2,8,1,9], target: 10 }, expected: [0,4] }
    ]
  },
  {
    title: "Valid Parentheses",
    prompt: "Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.\n\nAn input string is valid if:\n1. Open brackets must be closed by the same type of brackets\n2. Open brackets must be closed in the correct order\n3. Every close bracket has a corresponding open bracket of the same type\n\nExample 1:\nInput: s = \"()[]{}\"\nOutput: true\n\nExample 2:\nInput: s = \"([)]\"\nOutput: false",
    difficulty: "Easy",
    topic: "DSA",
    type: "function",
    functionName: "isValid",
    starterCode: "function isValid(s) {\n  // Hint: Use a stack data structure\n  // Time: O(?), Space: O(?)\n}\n",
    tests: [
      { description: "Simple valid", input: { s: "()" }, expected: true },
      { description: "Multiple types", input: { s: "()[]{}" }, expected: true },
      { description: "Nested valid", input: { s: "{[]}" }, expected: true },
      { description: "Wrong order", input: { s: "(]" }, expected: false },
      { description: "Interleaved", input: { s: "([)]" }, expected: false },
      { description: "Unbalanced", input: { s: "((" }, expected: false }
    ]
  },
  {
    title: "Palindrome Number",
    prompt: "Given an integer x, return true if x is a palindrome, and false otherwise.\n\nExample:\nInput: x = 121\nOutput: true\nExplanation: 121 reads as 121 from left to right and from right to left.\n\nInput: x = -121\nOutput: false\nExplanation: From left to right, it reads -121. From right to left, it becomes 121-.\n\nFollow up: Could you solve it without converting the integer to a string?",
    difficulty: "Easy",
    topic: "DSA",
    type: "function",
    functionName: "isPalindrome",
    starterCode: "function isPalindrome(x) {\n  // Try to solve without converting to string!\n}\n",
    tests: [
      { description: "Positive palindrome", input: { x: 121 }, expected: true },
      { description: "Negative number", input: { x: -121 }, expected: false },
      { description: "Single digit", input: { x: 7 }, expected: true },
      { description: "Not palindrome", input: { x: 123 }, expected: false },
      { description: "Zero", input: { x: 0 }, expected: true }
    ]
  },
  // Medium - DSA
  {
    title: "Longest Substring Without Repeating Characters",
    prompt: "Given a string s, find the length of the longest substring without repeating characters.\n\nExample:\nInput: s = 'abcabcbb'\nOutput: 3\nExplanation: The answer is 'abc', with length 3.\n\nInput: s = 'bbbbb'\nOutput: 1\nExplanation: The answer is 'b', with length 1.\n\nConstraints:\n- 0 <= s.length <= 5 * 10^4\n- s consists of English letters, digits, symbols and spaces",
    difficulty: "Medium",
    topic: "DSA",
    type: "function",
    functionName: "lengthOfLongestSubstring",
    starterCode: "function lengthOfLongestSubstring(s) {\n  // Hint: Sliding window + hash map\n  // Time: O(?), Space: O(?)\n}\n",
    tests: [
      { description: "Example 1", input: { s: "abcabcbb" }, expected: 3 },
      { description: "Example 2", input: { s: "bbbbb" }, expected: 1 },
      { description: "Example 3", input: { s: "pwwkew" }, expected: 3 },
      { description: "Empty string", input: { s: "" }, expected: 0 },
      { description: "All unique", input: { s: "abcdef" }, expected: 6 }
    ]
  },
  {
    title: "Container With Most Water",
    prompt: "You are given an integer array height of length n. There are n vertical lines where the two endpoints of the ith line are (i, 0) and (i, height[i]).\n\nFind two lines that together with the x-axis form a container that holds the most water.\n\nReturn the maximum amount of water a container can store.\n\nExample:\nInput: height = [1,8,6,2,5,4,8,3,7]\nOutput: 49\nExplanation: Max area is between index 1 (height 8) and index 8 (height 7), area = 7 * (8-1) = 49",
    difficulty: "Medium",
    topic: "DSA",
    type: "function",
    functionName: "maxArea",
    starterCode: "function maxArea(height) {\n  // Hint: Two pointers approach\n  // Time: O(?), Space: O(?)\n}\n",
    tests: [
      { description: "Example 1", input: { height: [1,8,6,2,5,4,8,3,7] }, expected: 49 },
      { description: "Example 2", input: { height: [1,1] }, expected: 1 },
      { description: "Increasing", input: { height: [1,2,3,4,5] }, expected: 6 },
      { description: "Large array", input: { height: [2,3,10,5,7,8,9] }, expected: 36 }
    ]
  },
  // Easy - OOPs
  {
    title: "Design Stack",
    prompt: "Implement a stack that supports push, pop, top, and retrieving the minimum element in constant time.\n\nImplement the MinStack class:\n- MinStack() initializes the stack object\n- push(val) pushes element val onto the stack\n- pop() removes the element on the top of the stack\n- top() gets the top element of the stack\n- getMin() retrieves the minimum element in the stack\n\nFor this sandbox, return an object with these methods. Tests will call them.",
    difficulty: "Easy",
    topic: "OOPs",
    type: "class",
    functionName: "createMinStack",
    starterCode: "function createMinStack() {\n  // Return an object with: push, pop, top, getMin\n  return {\n    push: function(val) { },\n    pop: function() { },\n    top: function() { },\n    getMin: function() { }\n  };\n}\n",
    tests: [
      { 
        description: "Basic operations",
        input: { operations: [["push", 1], ["push", 2], ["top"], ["getMin"], ["pop"], ["top"]] },
        expected: [null, null, 2, 1, null, 1]
      }
    ]
  },
  // Easy - DBMS
  {
    title: "SQL Query Simulation",
    prompt: "Write a function that simulates a basic SQL SELECT query on an array of objects.\n\nGiven an array of user objects and a condition, return filtered results.\n\nExample:\nInput: users = [{id:1,name:'Alice',age:25},{id:2,name:'Bob',age:30}], field = 'age', op = '>', value = 26\nOutput: [{id:2,name:'Bob',age:30}]\n\nSupported operators: '>', '<', '=', '!='",
    difficulty: "Easy",
    topic: "DBMS",
    type: "sql",
    functionName: "sqlSelect",
    starterCode: "function sqlSelect(users, field, op, value) {\n  // Simulate: SELECT * FROM users WHERE field op value\n}\n",
    tests: [
      { 
        description: "Greater than",
        input: { users: [{id:1,age:25},{id:2,age:30},{id:3,age:28}], field: 'age', op: '>', value: 26 },
        expected: [{id:2,age:30},{id:3,age:28}]
      },
      { 
        description: "Equals",
        input: { users: [{id:1,age:25},{id:2,age:30}], field: 'age', op: '=', value: 25 },
        expected: [{id:1,age:25}]
      }
    ]
  },
  // Medium - System Design
  {
    title: "LRU Cache Implementation",
    prompt: "Design a data structure that follows the constraints of a Least Recently Used (LRU) cache.\n\nImplement the LRUCache class:\n- LRUCache(capacity) Initialize with positive capacity\n- get(key) Return value if exists, else -1\n- put(key, value) Update or insert. If full, evict LRU key\n\nBoth operations should run in O(1) average time.\n\nFor this sandbox, return an object with get and put methods.",
    difficulty: "Medium",
    topic: "System Design",
    type: "design",
    functionName: "createLRUCache",
    starterCode: "function createLRUCache(capacity) {\n  // Hint: Use Map to maintain insertion order\n  return {\n    get: function(key) { },\n    put: function(key, value) { }\n  };\n}\n",
    tests: [
      {
        description: "Basic LRU",
        input: { capacity: 2, operations: [["put",1,1],["put",2,2],["get",1],["put",3,3],["get",2]] },
        expected: [null, null, 1, null, -1]
      }
    ]
  }
];

function randomFrom(arr) { return arr[Math.floor(Math.random()*arr.length)]; }

// In this initial implementation we use the fallback bank.
// In future, plug in Gemini/OpenAI here (env-driven) to generate question/hints/feedback.

export const startSession = async (req, res) => {
  try {
    const userId = req.userId || req.user?._id;
    const { difficulty = "Easy", topic = "DSA", durationMin = 30 } = req.body || {};

    // Pick a fallback question respecting difficulty/topic if possible
    const candidates = fallbackBank.filter(q => (
      (!difficulty || q.difficulty === difficulty) && (!topic || q.topic === topic)
    ));
    const chosen = candidates.length ? randomFrom(candidates) : randomFrom(fallbackBank);

    // Try to save to DB, fallback to in-memory if fails
    let session;
    try {
      session = await InterviewSession.create({
        userId,
        question: chosen
      });
    } catch (dbError) {
      // DEV MODE: Use in-memory storage if DB write fails
      console.log("⚠️ DEV MODE: DB write failed, using in-memory storage");
      const sessionId = `temp_${sessionIdCounter++}`;
      session = {
        _id: sessionId,
        userId,
        status: "active",
        question: chosen,
        codeSubmitted: "",
        hintsUsed: 0,
        startedAt: new Date(),
        endedAt: null,
        durationSec: 0,
        result: null,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      inMemorySessions.set(sessionId, session);
    }

    try { getIO()?.to(`session:${session._id}`).emit("session:update", { session }); } catch {}
    // start server-driven timer if available
    try { startSessionTimer(session._id, (Number(durationMin) || 30) * 60); } catch {}
    try { getIO()?.to(`session:${session._id}`).emit("session:update", { session }); } catch {}
    return res.status(201).json({ session });
  } catch (e) {
    console.error("startSession error", e);
    return res.status(500).json({ error: "Failed to start session" });
  }
};

export const requestHint = async (req, res) => {
  try {
    const userId = req.userId || req.user?._id;
    const { sessionId } = req.body;
    
    // Check in-memory first
    let session = inMemorySessions.get(sessionId);
    if (!session) {
      session = await InterviewSession.findOne({ _id: sessionId, userId });
    }
    if (!session) return res.status(404).json({ error: "Session not found" });

    // Simple heuristic hint
    const hint = `Focus on the core logic for ${session.question.functionName}. Consider using a hashmap or stack depending on the prompt.`;
    session.hintsUsed += 1;
    
    // Try to save, fallback to in-memory
    if (inMemorySessions.has(sessionId)) {
      inMemorySessions.set(sessionId, session);
    } else {
      try {
        await session.save();
      } catch (e) {
        console.log("⚠️ DEV MODE: Could not save hint to DB");
      }
    }

    try { getIO()?.to(`session:${sessionId}`).emit("session:hint", { hint, hintsUsed: session.hintsUsed }); } catch {}
    return res.status(200).json({ hint, hintsUsed: session.hintsUsed });
  } catch (e) {
    console.error("requestHint error", e);
    return res.status(500).json({ error: "Failed to generate hint" });
  }
};

export const submitSolution = async (req, res) => {
  try {
    const userId = req.userId || req.user?._id;
    const { sessionId, code, testResults = [] } = req.body || {};
    
    // Check in-memory first
    let session = inMemorySessions.get(sessionId);
    if (!session) {
      session = await InterviewSession.findOne({ _id: sessionId, userId });
    }
    if (!session) return res.status(404).json({ error: "Session not found" });

    // Summarize results from client-side runner
    const total = Array.isArray(testResults) ? testResults.length : 0;
    const passedCount = testResults.filter(tr => tr && tr.passed === true).length;
    const passed = passedCount === total && total > 0;

    // Naive feedback placeholder
    const feedback = passed
      ? "Great job! Your solution passed all tests. Consider discussing time and space trade-offs."
      : "Some tests failed. Review edge cases and ensure your function returns exactly the expected output.";

    // Heuristic complexity guess
    const timeComplexity = "O(n) ~ O(n log n) depending on approach";
    const spaceComplexity = "O(n) or O(1) depending on data structures used";

    session.status = "submitted";
    session.codeSubmitted = code || "";
    session.endedAt = new Date();
    session.durationSec = Math.max(0, Math.floor((session.endedAt - session.startedAt) / 1000));
    session.result = {
      passed,
      passedCount,
      totalTests: total,
      feedback,
      timeComplexity,
      spaceComplexity,
      testResults
    };

    // Try to save, fallback to in-memory
    if (inMemorySessions.has(sessionId)) {
      inMemorySessions.set(sessionId, session);
    } else {
      try {
        await session.save();
      } catch (e) {
        console.log("⚠️ DEV MODE: Could not save submission to DB");
      }
    }
    try { getIO()?.to(`session:${sessionId}`).emit("session:submitted", { session }); } catch {}
    
    return res.status(200).json({ session });
  } catch (e) {
    console.error("submitSolution error", e);
    return res.status(500).json({ error: "Failed to submit solution" });
  }
};

export const getHistory = async (req, res) => {
  try {
    const userId = req.userId || req.user?._id;
    
    // Get in-memory sessions
    const inMemoryArray = Array.from(inMemorySessions.values())
      .filter(s => s.userId === userId)
      .sort((a, b) => b.createdAt - a.createdAt);
    
    // Try to get DB sessions
    let dbSessions = [];
    try {
      dbSessions = await InterviewSession.find({ userId }).sort({ createdAt: -1 }).limit(50);
    } catch (e) {
      console.log("⚠️ DEV MODE: Could not fetch from DB");
    }
    
    // Combine and return
    const sessions = [...inMemoryArray, ...dbSessions].slice(0, 50);
    return res.status(200).json({ sessions });
  } catch (e) {
    console.error("getHistory error", e);
    return res.status(500).json({ error: "Failed to fetch history" });
  }
};

export const getSession = async (req, res) => {
  try {
    const userId = req.userId || req.user?._id;
    const { id } = req.params;
    const session = await InterviewSession.findOne({ _id: id, userId });
    if (!session) return res.status(404).json({ error: "Session not found" });
    return res.status(200).json({ session });
  } catch (e) {
    console.error("getSession error", e);
    return res.status(500).json({ error: "Failed to fetch session" });
  }
};