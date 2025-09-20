import CodeSnippet from "../models/codeSnippetSchema.js";
import User from "../models/userSchema.js";

// Code execution service using Judge0 API (or similar)
const JUDGE0_API_URL = process.env.JUDGE0_API_URL || "https://judge0-ce.p.rapidapi.com";
const JUDGE0_API_KEY = process.env.JUDGE0_API_KEY;

// Language ID mapping for Judge0
const LANGUAGE_IDS = {
  javascript: 63, // Node.js
  python: 71,     // Python 3
  cpp: 54,        // C++ (GCC 9.2.0)
  java: 62        // Java (OpenJDK 13.0.1)
};

// Save code snippet
export const saveCodeSnippet = async (req, res) => {
  try {
    const { fileName, language, code, title, description, tags, isPublic } = req.body;
    const userId = req.user.userId;

    // Validate input
    if (!fileName || !language || !code) {
      return res.status(400).json({
        message: "File name, language, and code are required"
      });
    }

    // Check if user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Create new code snippet
    const newSnippet = new CodeSnippet({
      title: title || `${fileName}.${getFileExtension(language)}`,
      fileName,
      language,
      code,
      user: userId,
      description: description || '',
      tags: tags || [],
      isPublic: isPublic || false
    });

    const savedSnippet = await newSnippet.save();
    await savedSnippet.populate('user', 'username email');

    res.status(201).json({
      message: "Code snippet saved successfully",
      snippet: savedSnippet
    });
  } catch (error) {
    console.error("Save snippet error:", error);
    res.status(500).json({
      message: "Failed to save code snippet",
      error: error.message
    });
  }
};

// Get user's code snippets
export const getUserSnippets = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { page = 1, limit = 10, language, search } = req.query;

    const query = { user: userId };
    
    // Add language filter if provided
    if (language && language !== 'all') {
      query.language = language;
    }

    // Add search filter if provided
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { fileName: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    const snippets = await CodeSnippet
      .find(query)
      .populate('user', 'username email')
      .sort({ updatedAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await CodeSnippet.countDocuments(query);

    res.status(200).json({
      snippets,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    console.error("Get snippets error:", error);
    res.status(500).json({
      message: "Failed to fetch code snippets",
      error: error.message
    });
  }
};

// Get single snippet by ID
export const getSnippetById = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.userId;

    const snippet = await CodeSnippet
      .findById(id)
      .populate('user', 'username email');

    if (!snippet) {
      return res.status(404).json({ message: "Code snippet not found" });
    }

    // Check if user has access to this snippet
    if (snippet.user._id.toString() !== userId && !snippet.isPublic) {
      return res.status(403).json({ message: "Access denied" });
    }

    res.status(200).json({ snippet });
  } catch (error) {
    console.error("Get snippet error:", error);
    res.status(500).json({
      message: "Failed to fetch code snippet",
      error: error.message
    });
  }
};

// Update code snippet
export const updateSnippet = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.userId;
    const updates = req.body;

    const snippet = await CodeSnippet.findById(id);
    
    if (!snippet) {
      return res.status(404).json({ message: "Code snippet not found" });
    }

    // Check if user owns this snippet
    if (snippet.user.toString() !== userId) {
      return res.status(403).json({ message: "Access denied" });
    }

    // Update allowed fields
    const allowedUpdates = ['title', 'fileName', 'code', 'description', 'tags', 'isPublic'];
    const actualUpdates = {};
    
    allowedUpdates.forEach(field => {
      if (updates[field] !== undefined) {
        actualUpdates[field] = updates[field];
      }
    });

    const updatedSnippet = await CodeSnippet
      .findByIdAndUpdate(id, actualUpdates, { new: true })
      .populate('user', 'username email');

    res.status(200).json({
      message: "Code snippet updated successfully",
      snippet: updatedSnippet
    });
  } catch (error) {
    console.error("Update snippet error:", error);
    res.status(500).json({
      message: "Failed to update code snippet",
      error: error.message
    });
  }
};

// Delete code snippet
export const deleteSnippet = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.userId;

    const snippet = await CodeSnippet.findById(id);
    
    if (!snippet) {
      return res.status(404).json({ message: "Code snippet not found" });
    }

    // Check if user owns this snippet
    if (snippet.user.toString() !== userId) {
      return res.status(403).json({ message: "Access denied" });
    }

    await CodeSnippet.findByIdAndDelete(id);

    res.status(200).json({
      message: "Code snippet deleted successfully"
    });
  } catch (error) {
    console.error("Delete snippet error:", error);
    res.status(500).json({
      message: "Failed to delete code snippet",
      error: error.message
    });
  }
};

// Execute code using Judge0 API (placeholder implementation)
export const executeCode = async (req, res) => {
  try {
    const { language, code, input = '' } = req.body;
    const userId = req.user?.userId;

    // Validate input
    if (!language || !code) {
      return res.status(400).json({
        message: "Language and code are required"
      });
    }

    // Check if language is supported
    if (!LANGUAGE_IDS[language]) {
      return res.status(400).json({
        message: `Language '${language}' is not supported`
      });
    }

    // For now, return a mock response since Judge0 API requires setup
    // In production, you would implement the actual Judge0 API call here
    const mockOutput = generateMockOutput(language, code);

    // Update execution count if user is logged in and owns a snippet
    if (userId) {
      // This is a simplified version - in reality, you'd need to track which snippet was executed
      // await CodeSnippet.findOneAndUpdate(
      //   { user: userId, code: code },
      //   { 
      //     $inc: { executionCount: 1 },
      //     lastExecuted: new Date()
      //   }
      // );
    }

    res.status(200).json({
      message: "Code executed successfully",
      output: mockOutput,
      language,
      executionTime: Math.random() * 1000, // Mock execution time in ms
      memoryUsed: Math.floor(Math.random() * 1024 * 1024) // Mock memory usage in bytes
    });

  } catch (error) {
    console.error("Code execution error:", error);
    res.status(500).json({
      message: "Code execution failed",
      error: error.message
    });
  }
};

// Get public snippets (for community features)
export const getPublicSnippets = async (req, res) => {
  try {
    const { page = 1, limit = 10, language, search } = req.query;

    const query = { isPublic: true };
    
    if (language && language !== 'all') {
      query.language = language;
    }

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { tags: { $in: [new RegExp(search, 'i')] } }
      ];
    }

    const snippets = await CodeSnippet
      .find(query)
      .populate('user', 'username')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await CodeSnippet.countDocuments(query);

    res.status(200).json({
      snippets,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    console.error("Get public snippets error:", error);
    res.status(500).json({
      message: "Failed to fetch public snippets",
      error: error.message
    });
  }
};

// AI Code completion (placeholder - integrate with actual AI service)
export const getAICompletion = async (req, res) => {
  try {
    const { code, language, position } = req.body;

    // This is a mock implementation
    // In production, you would integrate with OpenAI Codex, GitHub Copilot API, or similar
    const mockSuggestions = generateMockAISuggestions(language, code, position);

    res.status(200).json({
      suggestions: mockSuggestions,
      model: "codify-ai-v1", // Mock model name
      requestId: Date.now().toString()
    });
  } catch (error) {
    console.error("AI completion error:", error);
    res.status(500).json({
      message: "AI completion failed",
      error: error.message
    });
  }
};

// Helper functions
function getFileExtension(language) {
  const extensions = {
    javascript: 'js',
    python: 'py',
    cpp: 'cpp',
    java: 'java'
  };
  return extensions[language] || 'txt';
}

function generateMockOutput(language, code) {
  // Simple mock output generation based on common patterns
  const outputs = {
    javascript: `Node.js Output:\n> Code executed successfully\n> ${code.includes('console.log') ? 'Check console for output' : 'No console output detected'}`,
    python: `Python Output:\n> Code executed successfully\n> ${code.includes('print(') ? 'Check output for print statements' : 'No print statements detected'}`,
    cpp: `C++ Output:\n> Compilation successful\n> Program executed\n> ${code.includes('cout') ? 'Check output stream' : 'No output detected'}`,
    java: `Java Output:\n> Compilation successful\n> Main method executed\n> ${code.includes('System.out') ? 'Check system output' : 'No system output detected'}`
  };

  return outputs[language] || "Code executed successfully";
}

function generateMockAISuggestions(language, code, position) {
  // Basic mock AI suggestions based on language and context
  const commonSuggestions = {
    javascript: [
      { text: 'console.log()', detail: 'Log to console', kind: 'Function' },
      { text: 'function name() {}', detail: 'Function declaration', kind: 'Snippet' },
      { text: 'if (condition) {}', detail: 'If statement', kind: 'Snippet' },
      { text: 'for (let i = 0; i < length; i++) {}', detail: 'For loop', kind: 'Snippet' }
    ],
    python: [
      { text: 'print()', detail: 'Print to console', kind: 'Function' },
      { text: 'def function_name():', detail: 'Function definition', kind: 'Snippet' },
      { text: 'if condition:', detail: 'If statement', kind: 'Snippet' },
      { text: 'for item in items:', detail: 'For loop', kind: 'Snippet' }
    ],
    cpp: [
      { text: 'std::cout << ', detail: 'Console output', kind: 'Function' },
      { text: 'std::cin >> ', detail: 'Console input', kind: 'Function' },
      { text: 'int main() { return 0; }', detail: 'Main function', kind: 'Snippet' },
      { text: 'if (condition) {}', detail: 'If statement', kind: 'Snippet' }
    ],
    java: [
      { text: 'System.out.println()', detail: 'Print line', kind: 'Function' },
      { text: 'public static void main(String[] args) {}', detail: 'Main method', kind: 'Snippet' },
      { text: 'if (condition) {}', detail: 'If statement', kind: 'Snippet' },
      { text: 'for (int i = 0; i < length; i++) {}', detail: 'For loop', kind: 'Snippet' }
    ]
  };

  return commonSuggestions[language] || [];
}
